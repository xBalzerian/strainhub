import { NextRequest, NextResponse } from "next/server";
import { searchStrains } from "@/lib/strains";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) return NextResponse.json({ strains: [] });

  const strains = await searchStrains(q);
  return NextResponse.json({ strains });
}
