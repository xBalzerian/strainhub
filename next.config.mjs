/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  // ─── Image optimization ────────────────────────────
  images: {
    remotePatterns: [
      // GitHub raw (local strain images)
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/xBalzerian/strainhub/**",
      },
      // Supabase storage
      { protocol: "https", hostname: "**.supabase.co" },
      // Kie AI / aiquickdraw generated images
      { protocol: "https", hostname: "tempfile.aiquickdraw.com" },
      // Base44 storage (older images)
      { protocol: "https", hostname: "base44.app" },
      { protocol: "https", hostname: "**.base44.app" },
      // CDN variants
      { protocol: "https", hostname: "qtrypzzcjebvfcihiynt.supabase.co" },
    ],
    // AVIF first — 50% smaller than WebP, WebP as fallback
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Only the sizes we actually render — fewer variants = faster
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256, 384],
    // Allow SVG (sponsor logos)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── HTTP Cache-Control headers ───────────────────
  async headers() {
    return [
      // Static assets — cache forever (hashed filenames)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Optimized images — 7-day cache + stale-while-revalidate
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
        ],
      },
      // Public images (logos etc)
      {
        source: "/(.*)\\.(png|jpg|jpeg|svg|ico|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // All pages — security + perf headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Preconnect hints for Supabase
          { key: "Link", value: "<https://bfzcjunuuxzhqafuljlh.supabase.co>; rel=preconnect" },
        ],
      },
    ];
  },

  // experimental.optimizeCss removed — caused Vercel build hangs
};

export default nextConfig;
