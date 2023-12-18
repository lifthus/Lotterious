import { articles } from "./placeholder-article.mjs";

export default async function seedArticleDb(client) {
  await client.query(`
CREATE TABLE IF NOT EXISTS articles (
id BIGSERIAL PRIMARY KEY,
board VARCHAR(20) NOT NULL,

code VARCHAR(20) NOT NULL UNIQUE,
title VARCHAR(100) NOT NULL,
content TEXT NOT NULL,

created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP,

author_ip_addr VARCHAR(40) NOT NULL,
author_nickname VARCHAR(40) NOT NULL,
author_password TEXT NOT NULL
);
  `);
  await client.query(`
CREATE TABLE IF NOT EXISTS article_likes (
article BIGINT REFERENCES articles(id) NOT NULL,
ip_addr VARCHAR(40) NOT NULL,
PRIMARY KEY (article, ip_addr)
)
  `)
  await client.query(`
CREATE OR REPLACE VIEW article_likes_count AS
SELECT article, COUNT(*) AS likes_count
FROM article_likes
GROUP BY article
  `)
await client.query(`
CREATE OR REPLACE VIEW article_like_counts AS
SELECT id as article, COUNT(article_likes.article) AS likes_count
FROM articles
LEFT JOIN article_likes ON articles.id = article_likes.article
GROUP BY articles.id
`)
  await client.query(`
CREATE TABLE IF NOT EXISTS article_comments (
id BIGSERIAL PRIMARY KEY,
article BIGINT REFERENCES articles(id) ON DELETE CASCADE,
content TEXT NOT NULL,

created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP,

author_ip_addr VARCHAR(40) NOT NULL,
author_nickname VARCHAR(40) NOT NULL,
author_password TEXT NOT NULL
);
  `)
  await client.query(`
CREATE TABLE IF NOT EXISTS comment_replies (
id BIGSERIAL PRIMARY KEY,
comment BIGINT REFERENCES article_comments(id) ON DELETE CASCADE,
content TEXT NOT NULL,

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP,

author_ip_addr VARCHAR(40) NOT NULL,
author_nickname VARCHAR(40) NOT NULL,
author_password TEXT NOT NULL
);
  `)
}

export async function seedArticles(client) {
  for (let artc of articles) {
    await client.query(`
    INSERT INTO articles (title, board, code, content, author_ip_addr, author_nickname, author_password, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [artc.title, artc.board, artc.code, artc.content, artc.author_ip_addr, artc.author_nickname, artc.author_password, new Date()])
  }
}