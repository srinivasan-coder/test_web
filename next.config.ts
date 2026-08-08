import path from "node:path";
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so file tracing / bundlers don't walk up into
  // protected parent directories (which can panic Turbopack on some systems).
  outputFileTracingRoot: path.resolve(process.cwd()),
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Admin-replaced images are served as /assets/**?v=<timestamp> so the
    // optimizer treats each update as a fresh cache entry — without an
    // explicit pattern here, Next rejects any local image URL with a query
    // string outright ("url" parameter is not allowed).
    localPatterns: [{ pathname: "/assets/**" }],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "embla-carousel-react",
      "yet-another-react-lightbox",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Admin-editable images: always revalidate so a replaced image is
        // visible immediately instead of hidden behind the immutable cache
        // rule above for up to a year. Falls back to a fast 304 when unchanged.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
