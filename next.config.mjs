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
    // 30-day browser cache for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── HTTP Cache-Control headers ───────────────────
  async headers() {
    return [
      // Static assets — 1 year cache (immutable because Next adds content hashes)
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Images served by Next Image optimizer
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // All pages — stale-while-revalidate for snappy repeat visits
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

  // ─── Experimental optimizations ───────────────────
  experimental: {
    // Optimize CSS output (removes unused Tailwind classes at build time)
    optimizeCss: true,
    // Faster client-side navigation
    optimisticClientCache: true,
  },
};

export default nextConfig;
