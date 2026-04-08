// src/app/rss.xml/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = "https://www.strainhub.org";
const SITE_NAME = "StrainHub";
const SITE_DESC = "The most comprehensive cannabis strain database. Browse 500+ strains with effects, terpenes, grow info, and more.";

async function fetchArticles(): Promise<{ slug: string; title?: string; summary?: string; published_at?: string; image_hero?: string; category?: string }[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/articles?select=slug,title,summary,published_at,image_hero,category&order=published_at.desc&limit=50`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await fetchArticles();
  const now = new Date().toUTCString();

  const items = articles.map((a) => {
    const title = escapeXml(a.title || "Cannabis News");
    const desc = escapeXml(a.summary || "");
    const link = `${BASE_URL}/news/${a.slug}`;
    const pubDate = a.published_at ? new Date(a.published_at).toUTCString() : now;
    const image = a.image_hero || "";
    const category = escapeXml(a.category || "Cannabis");

    return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${category}</category>${image ? `
      <enclosure url="${image}" type="image/jpeg" length="0"/>
      <media:content url="${image}" medium="image"/>` : ""}
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME} - Cannabis News &amp; Strain Updates</title>
    <link>${BASE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>${SITE_NAME}</title>
      <link>${BASE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
