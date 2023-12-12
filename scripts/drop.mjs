import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString: process.env.PG_CONNECTION_STRING,
});
client.connect();

await dropArticleDb(client);

client.end();

async function dropArticleDb(client) {
  await client.query(`
  DROP TABLE IF EXISTS comment_replies;
  DROP TABLE IF EXISTS article_comments;
  
  DROP VIEW IF EXISTS article_likes_count;
  DROP TABLE IF EXISTS article_likes;
  DROP TABLE IF EXISTS articles;

  `)
}