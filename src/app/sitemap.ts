import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://www.strainhub.org";

// All learn hub pages - indexed for Google/Bing SEO
const LEARN_PAGES = [
  // Main hub
  { path: "/learn", priority: 0.9, freq: "weekly" },
  // Strains section
  { path: "/learn/strains", priority: 0.8, freq: "weekly" },
  { path: "/learn/strains/indica-vs-sativa", priority: 0.8, freq: "monthly" },
  { path: "/learn/strains/grow-guide", priority: 0.8, freq: "monthly" },
  { path: "/learn/strains/cannabinoid-profiles", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/cultivation-traits", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/effects", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/geographic-origins", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/medical-strains", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/terpene-categories", priority: 0.7, freq: "monthly" },
  // Seeds section
  { path: "/learn/seeds", priority: 0.8, freq: "weekly" },
  { path: "/learn/seeds/types", priority: 0.8, freq: "monthly" },
  { path: "/learn/seeds/germination", priority: 0.8, freq: "monthly" },
  { path: "/learn/seeds/selection", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds/storage", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds/breeding", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds/legal", priority: 0.7, freq: "monthly" },
  // Effects/Pharmacology section
  { path: "/learn/effects", priority: 0.8, freq: "weekly" },
  { path: "/learn/effects/terpenes", priority: 0.9, freq: "monthly" },
  { path: "/learn/effects/cannabinoids", priority: 0.9, freq: "monthly" },
  { path: "/learn/effects/entourage-effect", priority: 0.8, freq: "monthly" },
  { path: "/learn/effects/medical", priority: 0.8, freq: "monthly" },
  { path: "/learn/effects/acute-effects", priority: 0.7, freq: "monthly" },
  { path: "/learn/effects/long-term", priority: 0.7, freq: "monthly" },
  { path: "/learn/effects/interactions", priority: 0.7, freq: "monthly" },
  // Consumption section
  { path: "/learn/consumption", priority: 0.8, freq: "weekly" },
  { path: "/learn/consumption/inhalation", priority: 0.8, freq: "monthly" },
  { path: "/learn/consumption/edibles", priority: 0.8, freq: "monthly" },
  { path: "/learn/consumption/topicals", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption/bioavailability", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption/method-selection", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption/emerging", priority: 0.6, freq: "monthly" },
  // Legal section
  { path: "/learn/legal", priority: 0.8, freq: "weekly" },
  { path: "/learn/legal/states", priority: 0.9, freq: "weekly" },
  { path: "/learn/legal/federal", priority: 0.8, freq: "monthly" },
  { path: "/learn/legal/international", priority: 0.7, freq: "monthly" },
  { path: "/learn/legal/consumer-rights", priority: 0.7, freq: "monthly" },
  { path: "/learn/legal/industry", priority: 0.6, freq: "monthly" },
  // History section
  { path: "/learn/history", priority: 0.7, freq: "monthly" },
  { path: "/learn/history/origins", priority: 0.7, freq: "yearly" },
  { path: "/learn/history/religious", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/colonial-spread", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/prohibition", priority: 0.7, freq: "yearly" },
  { path: "/learn/history/cultural-movements", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/social-justice", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/science-history", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/industry-evolution", priority: 0.6, freq: "yearly" },
  // Standalone learn pages
  { path: "/learn/deficiencies", priority: 0.8, freq: "monthly" },
  { path: "/learn/grow-guide", priority: 0.8, freq: "monthly" },
  { path: "/learn/medical", priority: 0.8, freq: "monthly" },
  { path: "/learn/indica-vs-sativa", priority: 0.8, freq: "monthly" },
  { path: "/learn/how-thc-works", priority: 0.8, freq: "monthly" },
  { path: "/learn/landraces", priority: 0.7, freq: "monthly" },
  { path: "/learn/cannabinoids", priority: 0.8, freq: "monthly" },
  { path: "/learn/terpenes", priority: 0.8, freq: "monthly" },
  { path: "/learn/training", priority: 0.7, freq: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch all strain slugs
  const { data: strains } = await supabase
    .from("strains")
    .select("slug, updated_at")
    .order("rank_popularity", { ascending: true });

  const strainUrls: MetadataRoute.Sitemap = (strains || []).map((s) => ({
    url: `${BASE_URL}/strains/${s.slug}`,
    lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/strains`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/chat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/diagnose`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/pro`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // All learn hub pages
  const learnUrls: MetadataRoute.Sitemap = LEARN_PAGES.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.freq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: p.priority,
  }));

  return [...staticPages, ...learnUrls, ...strainUrls];
}
