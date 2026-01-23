import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@repo/env"],
  reactCompiler: true,
};

export default nextConfig;
