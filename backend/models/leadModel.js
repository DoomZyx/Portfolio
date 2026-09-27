import { query } from "../config/db.js";

export const leadModel = {
  async create(lead) {
    const result = await query(
      `INSERT INTO leads (
        name, email, phone, company, message, project_type,
        source, utm_source, utm_medium, utm_campaign, landing_page, referrer,
        diagnostic, recommendation_technical, strategic_support_recommended
      ) VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,$11,$12,
        $13::jsonb,$14,$15
      )
      RETURNING *`,
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.message,
        lead.projectType,
        lead.source,
        lead.utmSource,
        lead.utmMedium,
        lead.utmCampaign,
        lead.landingPage,
        lead.referrer,
        JSON.stringify(lead.diagnostic),
        lead.recommendationTechnical,
        lead.strategicSupportRecommended,
      ],
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await query(
      `SELECT id, name, email, company, project_type, source, status,
              recommendation_technical, strategic_support_recommended,
              estimated_value, final_value, diagnostic, created_at, updated_at
       FROM leads
       ORDER BY created_at DESC`,
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(`SELECT * FROM leads WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  async update(id, fields) {
    const sets = [];
    const params = [id];
    let i = 2;

    const map = {
      status: "status",
      name: "name",
      email: "email",
      phone: "phone",
      company: "company",
      message: "message",
      estimatedValue: "estimated_value",
      finalValue: "final_value",
    };

    for (const [key, column] of Object.entries(map)) {
      if (fields[key] !== undefined) {
        sets.push(`${column} = $${i++}`);
        params.push(fields[key]);
      }
    }

    if (sets.length === 0) {
      return this.findById(id);
    }

    sets.push("updated_at = NOW()");
    const result = await query(
      `UPDATE leads SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
      params,
    );
    return result.rows[0] || null;
  },
};
