import { query } from "../config/db.js";

export const leadNoteModel = {
  async findByLeadId(leadId) {
    const result = await query(
      `SELECT id, lead_id, body, created_at
       FROM lead_notes
       WHERE lead_id = $1
       ORDER BY created_at DESC`,
      [leadId],
    );
    return result.rows;
  },

  async create(leadId, body) {
    const result = await query(
      `INSERT INTO lead_notes (lead_id, body)
       VALUES ($1, $2)
       RETURNING id, lead_id, body, created_at`,
      [leadId, body],
    );
    return result.rows[0];
  },
};
