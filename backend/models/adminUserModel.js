import { query } from "../config/db.js";

export const adminUserModel = {
  async findByEmail(email) {
    const result = await query(
      `SELECT id, email, password_hash, created_at
       FROM admin_users
       WHERE email = $1`,
      [email.toLowerCase().trim()],
    );
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await query(
      `SELECT id, email, created_at FROM admin_users WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  },
};
