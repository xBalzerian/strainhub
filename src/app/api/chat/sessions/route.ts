import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ sessions: [] });

  const { data } = await supabaseAdmin
    .from("chat_sessions")
    .select("id, preview, updated_at, messages")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(20);

  return NextResponse.json({ sessions: data || [] });
}

export async function DELETE(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { sessionId, userId } = await req.json();
  if (!sessionId || !userId) return NextResponse.json({ ok: false });
  await supabaseAdmin.from("chat_sessions").delete().eq("id", sessionId).eq("user_id", userId);
  return NextResponse.json({ ok: true });
}
