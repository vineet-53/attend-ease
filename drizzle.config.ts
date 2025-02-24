import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: String(process.env.DB_DATABASE),
    ssl: false,
  },
  out: "./src/lib/db/migrations/",
});
