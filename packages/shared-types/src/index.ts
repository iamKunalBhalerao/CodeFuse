import { env } from "@repo/env/server";
export const httpCookieOptions = {
  httpOnly: true,
  // Disable secure in development if not using HTTPS
  secure: env.NODE_ENV === "production",
  sameSite: "lax", // Use "lax" for better compatibility across local ports
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
} as const;
