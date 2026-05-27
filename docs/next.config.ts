import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  turbopack: {
    resolveAlias: {
      // Redirect Node.js-only modules to empty modules for browser bundles
      crypto: { browser: './src/lib/empty-module.js' },
      module: { browser: './src/lib/empty-module.js' },
      fs: { browser: './src/lib/empty-module.js' },
      path: { browser: './src/lib/empty-module.js' },
    },
  },
};

export default nextConfig;
