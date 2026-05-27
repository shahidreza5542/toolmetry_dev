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
      stream: { browser: './src/lib/empty-module.js' },
      util: { browser: './src/lib/empty-module.js' },
      buffer: { browser: './src/lib/empty-module.js' },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Externalize Node.js-only modules for client bundles
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        module: false,
        fs: false,
        path: false,
        stream: false,
        util: false,
        buffer: false,
      };
    }
    return config;
  },
};

export default nextConfig;
