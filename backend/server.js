import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";
import { chatRoutes } from "./routes/chatRoutes.js";
import { leadRoutes } from "./routes/leadRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: true,
  credentials: true,
});

await fastify.register(cookie);

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: "admin_token",
    signed: false,
  },
});

await fastify.register(chatRoutes);
await fastify.register(leadRoutes);
await fastify.register(adminRoutes);

fastify.get("/api/health", async () => {
  return { status: "ok", service: "portfolio-backend" };
});

fastify.get("/", async () => {
  return {
    status: "ok",
    service: "portfolio-backend",
    message: "API is running",
  };
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
