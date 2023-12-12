export default async function seedArticleDb(client) {
  try {
  await client.query(`BEGIN TRANSACTION;`)
  await client.query(`
CREATE TABLE IF NOT EXISTS articles (
id BIGSERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,

created_at TIMESTAMP DEFAULT NOW(),
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
CREATE TABLE IF NOT EXISTS article_comments (
id BIGSERIAL PRIMARY KEY,
article BIGINT REFERENCES articles(id) ON DELETE CASCADE,
content TEXT NOT NULL,

created_at TIMESTAMP DEFAULT NOW(),
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
  await client.query(`COMMIT;`)
  } catch (err) {
    console.error(err)
    await client.query(`ROLLBACK;`)
  }
}

export async function dropArticleDb(client) {
  await client.query(`
  DROP TABLE IF EXISTS comment_replies;
  DROP TABLE IF EXISTS article_comments;
  
  DROP VIEW IF EXISTS article_likes_count;
  DROP TABLE IF EXISTS article_likes;
  DROP TABLE IF EXISTS articles;

  `)
}