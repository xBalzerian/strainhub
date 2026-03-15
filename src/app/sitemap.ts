import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // re-generate every hour

const BASE_URL = "https://www.strainhub.org";

const LEARN_PAGES = [
  { path: "/learn", priority: 0.9, freq: "weekly" },
  { path: "/learn/strains", priority: 0.8, freq: "weekly" },
  { path: "/learn/strains/indica-vs-sativa", priority: 0.8, freq: "monthly" },
  { path: "/learn/strains/grow-guide", priority: 0.8, freq: "monthly" },
  { path: "/learn/strains/cannabinoid-profiles", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/cultivation-traits", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/effects", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/geographic-origins", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/medical-strains", priority: 0.7, freq: "monthly" },
  { path: "/learn/strains/terpene-categories", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds", priority: 0.8, freq: "weekly" },
  { path: "/learn/seeds/types", priority: 0.8, freq: "monthly" },
  { path: "/learn/seeds/germination", priority: 0.8, freq: "monthly" },
  { path: "/learn/seeds/selection", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds/storage", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds/breeding", priority: 0.7, freq: "monthly" },
  { path: "/learn/seeds/legal", priority: 0.7, freq: "monthly" },
  { path: "/learn/effects", priority: 0.8, freq: "weekly" },
  { path: "/learn/effects/terpenes", priority: 0.9, freq: "monthly" },
  { path: "/learn/effects/cannabinoids", priority: 0.9, freq: "monthly" },
  { path: "/learn/effects/entourage-effect", priority: 0.8, freq: "monthly" },
  { path: "/learn/effects/medical", priority: 0.8, freq: "monthly" },
  { path: "/learn/effects/acute-effects", priority: 0.7, freq: "monthly" },
  { path: "/learn/effects/long-term", priority: 0.7, freq: "monthly" },
  { path: "/learn/effects/interactions", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption", priority: 0.8, freq: "weekly" },
  { path: "/learn/consumption/inhalation", priority: 0.8, freq: "monthly" },
  { path: "/learn/consumption/edibles", priority: 0.8, freq: "monthly" },
  { path: "/learn/consumption/topicals", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption/bioavailability", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption/method-selection", priority: 0.7, freq: "monthly" },
  { path: "/learn/consumption/emerging", priority: 0.6, freq: "monthly" },
  { path: "/learn/legal", priority: 0.8, freq: "weekly" },
  { path: "/learn/legal/states", priority: 0.9, freq: "weekly" },
  { path: "/learn/legal/federal", priority: 0.8, freq: "monthly" },
  { path: "/learn/legal/international", priority: 0.7, freq: "monthly" },
  { path: "/learn/legal/consumer-rights", priority: 0.7, freq: "monthly" },
  { path: "/learn/legal/industry", priority: 0.6, freq: "monthly" },
  { path: "/learn/history", priority: 0.7, freq: "monthly" },
  { path: "/learn/history/origins", priority: 0.7, freq: "yearly" },
  { path: "/learn/history/religious", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/colonial-spread", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/prohibition", priority: 0.7, freq: "yearly" },
  { path: "/learn/history/cultural-movements", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/social-justice", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/science-history", priority: 0.6, freq: "yearly" },
  { path: "/learn/history/industry-evolution", priority: 0.6, freq: "yearly" },
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
  // Fetch strains directly via Supabase REST API (public, no RLS on slugs)
  let strainUrls: MetadataRoute.Sitemap = [];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SERVICE_ROLE ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Paginate to get all strains (Supabase default limit is 1000)
    let allStrains: { slug: string; created_at?: string }[] = [];
    let from = 0;
    const pageSize = 1000;

    while (true) {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/strains?select=slug,created_at&order=rank_popularity.asc.nullslast&limit=${pageSize}&offset=${from}`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) break;
      const page = await res.json();
      if (!page.length) break;
      allStrains = allStrains.concat(page);
      if (page.length < pageSize) break;
      from += pageSize;
    }

    strainUrls = allStrains.map((s) => ({
      url: `${BASE_URL}/strains/${s.slug}`,
      lastModified: s.created_at ? new Date(s.created_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap: failed to fetch strains", e);
  }

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

  const learnUrls: MetadataRoute.Sitemap = LEARN_PAGES.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.freq as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: p.priority,
  }));

  return [...staticPages, ...learnUrls, ...strainUrls];
}
