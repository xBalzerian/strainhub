// src/app/sitemap-seedbanks/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

const BASE_URL = "https://www.strainhub.org";

async function fetchSeedbanks(): Promise<{ slug: string; created_at?: string }[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/seedbanks?select=slug,created_at&order=rank_popularity.asc.nullslast&limit=1000`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function GET() {
  const seedbanks = await fetchSeedbanks();

  const urlEntries = seedbanks.map((s) => {
    const lastmod = s.created_at ? new Date(s.created_at).toISOString() : new Date().toISOString();
    return `  <url>
    <loc>${BASE_URL}/seedbanks/${s.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/seedbanks</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${urlEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
