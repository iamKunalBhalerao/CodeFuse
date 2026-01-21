import { z } from 'zod';

// Complete environment schema - ALL env variables in one place
export const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Server Configuration
  CORE_PORT: z.coerce.number().default(5000),
  SYNC_PORT: z.coerce.number().default(8080),
//   LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Database
  DATABASE_URL: z.string().url(),
//   REDIS_URL: z.string().url().optional(),
  
  // Authentication & Security
  JWT_SECRET: z.string().min(32),

  INTERNAL_KEY: z.string().min(16),
//   API_KEY: z.string().optional(),
  
  // Third-party Services
//   STRIPE_SECRET_KEY: z.string().optional(),
//   STRIPE_WEBHOOK_SECRET: z.string().optional(),
//   SENDGRID_API_KEY: z.string().optional(),
  
  // Add all your env variables here
  // AWS_ACCESS_KEY_ID: z.string().optional(),
  // AWS_SECRET_ACCESS_KEY: z.string().optional(),
  // SENTRY_DSN: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;