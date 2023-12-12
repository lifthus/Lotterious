import pg from "pg";
import seedArticleDb from "./db/db_article.mjs";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.PG_CONNECTION_STRING,
});
client.connect();

await seedArticleDb(client);

client.end();