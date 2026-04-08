// src/app/sitemap-strains/route.ts
// Dedicated strain sitemap — fetches all strains from Supabase
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = "https://www.strainhub.org";

async function fetchAllStrains(): Promise<{ slug: string; created_at?: string }[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  let all: { slug: string; created_at?: string }[] = [];
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/strains?select=slug,created_at&order=rank_popularity.asc.nullslast&limit=${pageSize}&offset=${from}`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" }
    );
    if (!res.ok) break;
    const batch: { slug: string; created_at?: string }[] = await res.json();
    if (!batch.length) break;
    all = all.concat(batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

export async function GET() {
  const strains = await fetchAllStrains();

  const urlEntries = strains.map((s) => {
    const lastmod = s.created_at ? new Date(s.created_at).toISOString() : new Date().toISOString();
    return `  <url>
    <loc>${BASE_URL}/strains/${s.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
