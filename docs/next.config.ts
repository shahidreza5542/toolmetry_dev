import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Next.js 16 uses Turbopack by default.
  // Redirect Node.js-only modules to empty modules for browser bundles.
  turbopack: {
    resolveAlias: {
      crypto: { browser: './src/lib/empty-module.js' },
      module: { browser: './src/lib/empty-module.js' },
      fs: { browser: './src/lib/empty-module.js' },
      path: { browser: './src/lib/empty-module.js' },
      stream: { browser: './src/lib/empty-module.js' },
      util: { browser: './src/lib/empty-module.js' },
      buffer: { browser: './src/lib/empty-module.js' },
    },
  },
};

export default nextConfig;
