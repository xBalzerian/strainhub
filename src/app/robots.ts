import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",
        allow: ["/","/strains/","/news/","/seedbanks/","/learn/","/diagnose","/advertise","/contact","/pricing"],
        disallow: ["/api/","/_next/","/profile/","/chat/sessions/"] },
      { userAgent: "Googlebot-News", allow: ["/news/","/news"] },
    ],
    sitemap: "https://www.strainhub.org/sitemap.xml",
    host: "https://www.strainhub.org",
  };
}
