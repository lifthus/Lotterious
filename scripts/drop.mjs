import pg from "pg";
import { dropArticleDb } from "./db/db_article.mjs";
const { Client } = pg;

const client = new Client({
  connectionString: process.env.PG_CONNECTION_STRING,
});
client.connect();

await dropArticleDb(client);

client.end();