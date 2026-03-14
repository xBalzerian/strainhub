import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== "sh_debug_2026") return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const results: Record<string, unknown> = {
    url: url?.slice(0, 40),
    hasAnonKey: !!anonKey && anonKey.length > 20,
    hasServiceKey: !!serviceKey && serviceKey.startsWith("eyJ") && serviceKey.length > 100,
    hasKieKey: !!(process.env.KIE_API_KEY || process.env.KIE_API),
  };

  // Test anon client
  try {
    const anon = createClient(url, anonKey);
    const { data, error } = await anon.from("strains").select("slug").in("slug", ["og-kush", "blueberry"]);
    results.anonFetch = { ok: !error, count: data?.length, error: error?.message, slugs: data?.map((s: {slug: string}) => s.slug) };
  } catch (e) { results.anonFetch = { ok: false, error: String(e) }; }

  // Test admin client
  if (serviceKey?.startsWith("eyJ") && serviceKey.length > 100) {
    try {
      const admin = createClient(url, serviceKey);
      const { data, error } = await admin.from("strains").select("slug").in("slug", ["og-kush", "blueberry"]);
      results.adminFetch = { ok: !error, count: data?.length, error: error?.message, slugs: data?.map((s: {slug: string}) => s.slug) };
    } catch (e) { results.adminFetch = { ok: false, error: String(e) }; }
  }

  return NextResponse.json(results);
}
