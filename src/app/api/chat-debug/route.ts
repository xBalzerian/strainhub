import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const KIE_API_KEY = process.env.KIE_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // Test 1: KIE API raw response
  const resp = await fetch(KIE_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${KIE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "When recommending strains, ALWAYS end with [STRAIN_CARDS]{\"slugs\":[\"blue-dream\",\"og-kush\"]}[/STRAIN_CARDS]" },
        ...messages,
      ],
      stream: false,
    }),
  });

  const raw = await resp.text();
  
  // Test 2: Supabase strains read (public - uses anon key)
  const supaAnon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: strains, error: strainsErr } = await supaAnon
    .from("strains")
    .select("name, slug")
    .in("slug", ["blue-dream", "og-kush"])
    .limit(2);

  // Test 3: Supabase admin (service role)
  const supaAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: strainsAdmin, error: strainsAdminErr } = await supaAdmin
    .from("strains")
    .select("name, slug")
    .in("slug", ["blue-dream", "og-kush"])
    .limit(2);

  // Test 4: chat_sessions with service role
  const { data: sessions, error: sessionsErr } = await supaAdmin
    .from("chat_sessions")
    .select("id")
    .limit(1);

  return NextResponse.json({
    kieRaw: raw.slice(0, 500),
    kieStatus: resp.status,
    kieApiKeyPresent: !!KIE_API_KEY,
    kieApiKeyPreview: KIE_API_KEY.slice(0, 8) + "...",
    strainsAnon: { data: strains, error: strainsErr?.message },
    strainsAdmin: { data: strainsAdmin, error: strainsAdminErr?.message },
    sessionsAdmin: { data: sessions, error: sessionsErr?.message },
    envKeys: {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      serviceKeyPreview: (process.env.SUPABASE_SERVICE_ROLE_KEY || "").slice(0, 20) + "...",
    }
  });
}
