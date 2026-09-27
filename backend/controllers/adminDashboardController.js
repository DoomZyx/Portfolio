import { dashboardModel } from "../models/dashboardModel.js";

export const adminDashboardController = {
  async getStats(_request, reply) {
    const stats = await dashboardModel.getStats();
    return reply.send({
      totalLeads: stats.total_leads,
      newLeads: stats.new_leads,
      meetings: stats.meetings,
      quotesSent: stats.quotes_sent,
      won: stats.won,
      pipelineValue: stats.pipeline_value,
      wonRevenue: stats.won_revenue,
      leadsBySource: stats.leadsBySource.map((row) => ({
        source: row.source,
        count: row.count,
      })),
    });
  },
};
