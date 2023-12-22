import pg from "pg";

import { createArticleDb, createCommentDb } from "./db/db_article.mjs";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.PG_CONNECTION_STRING,
});
client.connect();

try {
await client.query("BEGIN TRANSACTION");

await createArticleDb(client);
await createCommentDb(client);

await client.query("COMMIT");
} catch (e) {
await client.query("ROLLBACK");
}

client.end();