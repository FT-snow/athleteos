import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@convex": path.join(__dirname, "../../convex/_generated"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@convex": path.join(__dirname, "../../convex/_generated"),
    },
  },
};
export default nextConfig;
