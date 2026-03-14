import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const slugsParam = req.nextUrl.searchParams.get("slugs");
  if (!slugsParam) return NextResponse.json({ strains: [] });

  const slugs = slugsParam.split(",").map(s => s.trim()).filter(Boolean).slice(0, 5);
  if (slugs.length === 0) return NextResponse.json({ strains: [] });

  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await anon
    .from("strains")
    .select("name, slug, type, thc_max, thc_min, cbd_max, effects, flavors, terpenes, description, image_url")
    .in("slug", slugs);

  if (error) {
    console.error("[by-slugs]", error.message);
    return NextResponse.json({ strains: [] });
  }

  const sorted = (data || []).sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));
  return NextResponse.json({ strains: sorted });
}
