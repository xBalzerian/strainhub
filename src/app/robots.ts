// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/strains/", "/news/", "/seedbanks/", "/learn/", "/diagnose", "/advertise", "/contact", "/pricing", "/rss.xml"],
        disallow: ["/api/", "/_next/", "/profile/", "/chat/sessions/"],
      },
      { userAgent: "Googlebot-News", allow: ["/news/", "/news", "/rss.xml", "/sitemap-news.xml"] },
    ],
    sitemap: [
      "https://www.strainhub.org/sitemap.xml",
      "https://www.strainhub.org/sitemap-strains.xml",
      "https://www.strainhub.org/sitemap-news.xml",
      "https://www.strainhub.org/sitemap-seedbanks.xml",
    ],
    host: "https://www.strainhub.org",
  };
}
