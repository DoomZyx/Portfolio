import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { pool } from "../config/db.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIGRATIONS = ["001_init.sql", "002_documents.sql"];

async function migrate() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to run migrations");
  }

  for (const file of MIGRATIONS) {
    const sqlPath = path.join(__dirname, "../migrations", file);
    const sql = await fs.readFile(sqlPath, "utf8");
    await pool.query(sql);
    console.log(`Migration ${file} applied`);
  }

  await pool.end();
}

migrate().catch(async (err) => {
  console.error(err);
  await pool.end().catch(() => {});
  process.exit(1);
});
