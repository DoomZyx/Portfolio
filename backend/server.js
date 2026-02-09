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

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    
    console.log("=== Configuration des variables d'environnement ===");
    console.log(`PORT: ${port}`);
    console.log(`OPENAI_API_URL: ${process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions (défaut)"}`);
    console.log(`OPENAI_MODEL: ${process.env.OPENAI_MODEL || "gpt-4o-mini (défaut)"}`);
    console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...${process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4)} (configurée)` : "NON CONFIGURÉE"}`);
    console.log("==================================================");
    
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

