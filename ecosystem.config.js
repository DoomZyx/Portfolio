import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "backend", ".env") });

export default {
  apps: [
    {
      name: "portfolio-backend",
      script: "./backend/server.js",
      cwd: "./backend",
      env: {
        NODE_ENV: "development",
        PORT: process.env.PORT || 3001,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        OPENAI_API_URL: process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions",
        OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4o-mini",
      },
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      max_memory_restart: "500M",
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};

