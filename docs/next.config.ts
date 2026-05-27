import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  // ❌ Removed turbopack alias (can break production routing)
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      module: false,
    };

    return config;
  },
};

export default nextConfig;