import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { chatRoutes } from "./routes/chatRoutes.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: true,
  credentials: true,
});

await fastify.register(chatRoutes);

fastify.get("/api/health", async (request, reply) => {
  return { status: "ok", service: "portfolio-backend" };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

