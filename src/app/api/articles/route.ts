import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cat   = searchParams.get("category") || "All";
  const limit = parseInt(searchParams.get("limit") || "30");
  try {
    const articles = await getArticles(limit, cat);
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
