import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // re-generate every hour

const BASE_URL = "https://www.strainhub.org";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
  { url: `${BASE_URL}/strains`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
];

const LEARN_PAGES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/learn/strains`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/learn/strains/indica-vs-sativa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/strains/grow-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/strains/cannabinoid-profiles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/strains/cultivation-traits`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/strains/effects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/strains/geographic-origins`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/strains/medical-strains`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/strains/terpene-categories`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/seeds`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/learn/seeds/types`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/seeds/germination`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/seeds/selection`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/seeds/storage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/seeds/breeding`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/seeds/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/effects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/learn/effects/terpenes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/learn/effects/cannabinoids`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/learn/effects/entourage-effect`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/effects/medical`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/effects/acute-effects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/effects/long-term`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/effects/interactions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/consumption`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/learn/consumption/inhalation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/consumption/edibles`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/consumption/topicals`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/consumption/bioavailability`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/consumption/method-selection`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/consumption/emerging`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/learn/legal`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/learn/legal/states`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/learn/legal/federal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/legal/international`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/legal/consumer-rights`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/legal/industry`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/learn/history`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/history/origins`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE_URL}/learn/history/religious`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/learn/history/colonial-spread`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/learn/history/prohibition`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE_URL}/learn/history/cultural-movements`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/learn/history/social-justice`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/learn/history/science-history`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/learn/history/industry-evolution`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/learn/deficiencies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/grow-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/medical`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/indica-vs-sativa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/how-thc-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/landraces`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/learn/cannabinoids`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/terpenes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/learn/training`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

async function fetchAllStrains(): Promise<{ slug: string; created_at?: string }[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SERVICE_ROLE ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
        cache: "no-store",
      }
    );
    if (!res.ok) break;
    const batch: { slug: string; created_at?: string }[] = await res.json();
    if (!batch.length) break;
    allStrains = allStrains.concat(batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return allStrains;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let strainUrls: MetadataRoute.Sitemap = [];

  try {
    const strains = await fetchAllStrains();
    strainUrls = strains.map((s) => ({
      url: `${BASE_URL}/strains/${s.slug}`,
      lastModified: s.created_at ? new Date(s.created_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap: failed to fetch strains", e);
  }

  return [
    ...STATIC_PAGES,
    ...LEARN_PAGES,
    ...strainUrls,
  ];
}
