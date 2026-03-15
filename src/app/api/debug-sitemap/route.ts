import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SERVICE_ROLE;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const keyToUse = supabaseServiceKey || serviceRole || anonKey;
  let fetchResult: { ok: boolean; status?: number; count?: number; error?: string } = { ok: false };
  if (supabaseUrl && keyToUse) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/strains?select=slug&limit=3`,
        { headers: { apikey: keyToUse, Authorization: `Bearer ${keyToUse}` }, cache: "no-store" }
      );
      const data = await res.json();
      fetchResult = { ok: res.ok, status: res.status, count: Array.isArray(data) ? data.length : -1 };
    } catch (e: unknown) {
      fetchResult = { ok: false, error: String(e) };
    }
  }
  return NextResponse.json({
    hasSupabaseUrl: !!supabaseUrl,
    hasServiceRole: !!serviceRole,
    hasSupabaseServiceKey: !!supabaseServiceKey,
    hasAnonKey: !!anonKey,
    keyUsed: supabaseServiceKey ? "SUPABASE_SERVICE_ROLE_KEY" : serviceRole ? "SERVICE_ROLE" : anonKey ? "NEXT_PUBLIC" : "none",
    fetchResult,
  });
}
