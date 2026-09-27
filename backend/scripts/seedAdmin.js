import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { query, pool } from "../config/db.js";

dotenv.config();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed admin");
  }

  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD must be at least 10 characters");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const result = await query(
    `INSERT INTO admin_users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
     RETURNING id, email`,
    [email.toLowerCase().trim(), passwordHash],
  );

  console.log(`Admin ready: ${result.rows[0].email} (id=${result.rows[0].id})`);
  await pool.end();
}

seedAdmin().catch(async (err) => {
  console.error(err);
  await pool.end().catch(() => {});
  process.exit(1);
});
