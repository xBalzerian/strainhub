/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/xBalzerian/strainhub/**",
      },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "tempfile.aiquickdraw.com" },
      { protocol: "https", hostname: "base44.app" },
      { protocol: "https", hostname: "**.base44.app" },
      { protocol: "https", hostname: "qtrypzzcjebvfcihiynt.supabase.co" },
      // Seedbank logos from various CDNs
      { protocol: "https", hostname: "**.shopify.com" },
      { protocol: "https", hostname: "**.myshopify.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "**.wp-content" },
      { protocol: "https", hostname: "img.logo.dev" },
      // Allow all https for logos (catch-all for direct domain logos)
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/image(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|svg|ico|webp|avif)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Link", value: "<https://bfzcjunuuxzhqafuljlh.supabase.co>; rel=preconnect" },
        ],
      },
    ];
  },
};

export default nextConfig;
