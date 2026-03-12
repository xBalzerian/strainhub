/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress all responses
  compress: true,

  images: {
    // Optimize images from these domains via Next.js Image Optimization
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/xBalzerian/strainhub/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "tempfile.aiquickdraw.com",
      },
    ],
    // Serve modern WebP/AVIF formats automatically
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for fill/fixed layouts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable experimental optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
