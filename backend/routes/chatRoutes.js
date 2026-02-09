import { chatController } from "../controllers/chatController.js";

export const chatRoutes = async (fastify) => {
  fastify.post("/api/chat", chatController.sendMessage);
};

