import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers — allow everything except private routes
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/account",
          "/login",
          "/_next/",
        ],
      },
      // NOTE: Google-Extended powers AI Overviews / SGE — we WANT to be included
      // Removed block on Google-Extended, anthropic-ai so we appear in AI search results
      {
        // Only block pure scraping bots with no SEO value
        userAgent: ["CCBot", "SemrushBot", "AhrefsBot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://www.strainhub.org/sitemap.xml",
    host: "https://www.strainhub.org",
  };
}
