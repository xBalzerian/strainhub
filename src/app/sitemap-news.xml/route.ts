// src/app/sitemap-news/route.ts
// Dedicated news sitemap (also valid Google News sitemap)
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

const BASE_URL = "https://www.strainhub.org";

async function fetchArticles(): Promise<{ slug: string; title?: string; published_at?: string }[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/articles?select=slug,title,published_at&order=published_at.desc&limit=1000`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function GET() {
  const articles = await fetchArticles();

  const urlEntries = articles.map((a) => {
    const lastmod = a.published_at ? new Date(a.published_at).toISOString() : new Date().toISOString();
    const pubDate = a.published_at ? new Date(a.published_at).toISOString() : new Date().toISOString();
    const title = (a.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `  <url>
    <loc>${BASE_URL}/news/${a.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <news:news>
      <news:publication>
        <news:name>StrainHub</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  });
}
