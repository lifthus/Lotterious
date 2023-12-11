import { Pool } from "pg";

export const pg = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});
