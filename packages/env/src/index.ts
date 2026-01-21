import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try root .env first, fallback to packages/env/.env
const rootEnv = path.resolve(process.cwd(), ".env");
const pkgEnv = path.resolve(__dirname, "../.env");

import fs from "fs";
config({ path: fs.existsSync(rootEnv) ? rootEnv : pkgEnv });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CORE_PORT: z.string().default("5000"),
  SYNC_PORT: z.string().default("8080"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  INTERNAL_KEY: z.string().min(16),
  SKIP_ENV_VALIDATION: z.string().default("false"),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
