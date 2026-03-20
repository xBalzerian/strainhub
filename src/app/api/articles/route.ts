import { NextResponse } from "next/server";
import type { Article } from "@/lib/articles";

export const dynamic = "force-dynamic";

const SB_URL = "https://bfzcjunuuxzhqafuljlh.supabase.co";
// Service role key is safe server-side — never sent to browser
const SB_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SERVICE_ROLE ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmemNqdW51dXh6aHFhZnVsamxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI5OTg5MSwiZXhwIjoyMDg4ODc1ODkxfQ.h25adAQDZboQXLQ_IEb3gjSJhdXaRhD5wyvY7pQKnzk";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cat   = searchParams.get("category") || "All";
  const limit = parseInt(searchParams.get("limit") || "30");

  try {
    let url = `${SB_URL}/rest/v1/articles?select=*&is_published=eq.true&order=published_at.desc&limit=${limit}`;
    if (cat !== "All") url += `&category=eq.${encodeURIComponent(cat)}`;

    const res = await fetch(url, {
      headers: {
        "apikey": SB_SERVICE_KEY,
        "Authorization": `Bearer ${SB_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("articles API fetch failed:", res.status, await res.text());
      return NextResponse.json([], { status: 500 });
    }

    const articles = await res.json() as Article[];
    return NextResponse.json(articles, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("articles API error:", e);
    return NextResponse.json([], { status: 500 });
  }
}
