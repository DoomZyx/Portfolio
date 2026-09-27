import { query } from "../config/db.js";

export const dashboardModel = {
  async getStats() {
    const totals = await query(`
      SELECT
        COUNT(*)::int AS total_leads,
        COUNT(*) FILTER (WHERE status = 'NEW')::int AS new_leads,
        COUNT(*) FILTER (WHERE status = 'MEETING')::int AS meetings,
        COUNT(*) FILTER (WHERE status = 'QUOTE_SENT')::int AS quotes_sent,
        COUNT(*) FILTER (WHERE status = 'WON')::int AS won,
        COALESCE(SUM(estimated_value) FILTER (
          WHERE status IN ('NEW', 'CONTACTED', 'MEETING', 'QUOTE_SENT')
        ), 0)::float AS pipeline_value,
        COALESCE(SUM(final_value) FILTER (WHERE status = 'WON'), 0)::float AS won_revenue
      FROM leads
    `);

    const bySource = await query(`
      SELECT COALESCE(source, 'unknown') AS source, COUNT(*)::int AS count
      FROM leads
      GROUP BY COALESCE(source, 'unknown')
      ORDER BY count DESC
    `);

    return {
      ...totals.rows[0],
      leadsBySource: bySource.rows,
    };
  },
};
