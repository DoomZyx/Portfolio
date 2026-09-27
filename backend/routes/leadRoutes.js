import { leadController } from "../controllers/leadController.js";

export const leadRoutes = async (fastify) => {
  fastify.post("/api/leads", leadController.create);
};
