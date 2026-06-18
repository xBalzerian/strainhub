// src/app/sitemap.ts — Sitemap INDEX (tells Google about all sub-sitemaps)
import { MetadataRoute } from "next";

const BASE_URL = "https://www.strainhub.org";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core static pages
    { url: `${BASE_URL}`,              lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/strains`,      lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/seedbanks`,    lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/news`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/learn`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/diagnose`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/advertise`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Learn hub
    { url: `${BASE_URL}/learn/strains`,                       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/learn/strains/indica-vs-sativa`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/strains/grow-guide`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/strains/cannabinoid-profiles`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/strains/cultivation-traits`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/strains/effects`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/strains/geographic-origins`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/strains/medical-strains`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/strains/terpene-categories`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/seeds`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/learn/seeds/types`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/seeds/germination`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/seeds/selection`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/seeds/storage`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/seeds/breeding`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/seeds/legal`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/effects`,                       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/learn/effects/terpenes`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn/effects/cannabinoids`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn/effects/entourage-effect`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/effects/medical`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/effects/acute-effects`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/effects/long-term`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/effects/interactions`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/consumption`,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/learn/consumption/inhalation`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/consumption/edibles`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/consumption/topicals`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/consumption/bioavailability`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/consumption/method-selection`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/consumption/emerging`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/learn/legal`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/learn/legal/states`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/learn/legal/federal`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/legal/international`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/legal/consumer-rights`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/legal/industry`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/learn/history`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/history/origins`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE_URL}/learn/history/prohibition`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE_URL}/learn/history/cultural-movements`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE_URL}/learn/history/social-justice`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE_URL}/learn/history/industry-evolution`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE_URL}/learn/deficiencies`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/grow-guide`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/medical`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/how-thc-works`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/learn/landraces`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/training`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
