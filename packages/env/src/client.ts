// Client-safe environment variables (no fs, no dotenv)
import { z } from "zod";

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_CORE_API_URL: z.string().default("http://localhost:5000/api"),
  NEXT_PUBLIC_SYNC_API_URL: z.string().default("http://localhost:8080"),
});

// Only access NEXT_PUBLIC_ prefixed env vars on client
export const ClientEnv = ClientEnvSchema.parse({
  NEXT_PUBLIC_CORE_API_URL: process.env.NEXT_PUBLIC_CORE_API_URL,
  NEXT_PUBLIC_SYNC_API_URL: process.env.NEXT_PUBLIC_SYNC_API_URL,
});

export type ClientEnv = z.infer<typeof ClientEnvSchema>;