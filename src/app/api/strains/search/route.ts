import { NextRequest, NextResponse } from "next/server";
import { searchStrains } from "@/lib/strains";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");
    if (!q || q.length < 2) return NextResponse.json({ strains: [] });
    const strains = await searchStrains(q);
    return NextResponse.json({ strains });
  } catch (error) {
    return NextResponse.json({ strains: [] });
  }
}
