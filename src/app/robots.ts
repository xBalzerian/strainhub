import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/account",
          "/login",
          "/_next/",
        ],
      },
      {
        // Block AI scrapers from training data (optional but common)
        userAgent: ["GPTBot", "CCBot", "Google-Extended", "anthropic-ai"],
        disallow: "/",
      },
    ],
    sitemap: "https://www.strainhub.org/sitemap.xml",
    host: "https://www.strainhub.org",
  };
}
