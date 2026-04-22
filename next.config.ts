import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve the project root without relying on `__dirname`
 * (which can be unreliable in ESM-transpiled Next configs).
 *
 * This also pins Turbopack + output-file-tracing to THIS directory,
 * which prevents Next from inferring a parent directory as the workspace
 * root when stray lockfiles / package.json files exist higher up the tree.
 */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  turbopack: {
    root: projectRoot,
  },

  outputFileTracingRoot: projectRoot,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
