import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic"; // never cache this route on the server

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cat   = searchParams.get("category") || "All";
  const limit = parseInt(searchParams.get("limit") || "30");
  try {
    const articles = await getArticles(limit, cat);
    return NextResponse.json(articles, {
      headers: {
        // Tell browser: revalidate every 60s, serve stale while revalidating
        "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
