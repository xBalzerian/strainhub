/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  // ─── Image optimization ────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/xBalzerian/strainhub/**",
      },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "tempfile.aiquickdraw.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── HTTP Cache-Control headers ───────────────────
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // ─── Experimental — only flags valid in Next 14.2.x ──
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
