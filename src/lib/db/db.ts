import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: String(process.env.DB_DATABASE),
  ssl: false,
});

export const db = drizzle(pool);
