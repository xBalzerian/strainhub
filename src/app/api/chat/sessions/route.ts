import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET — list sessions for a user
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ sessions: [] });

  const { data } = await getAdmin()
    .from("chat_sessions")
    .select("id, preview, updated_at, messages")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(30);

  return NextResponse.json({ sessions: data || [] });
}

// POST — save/upsert a session (called when user clicks New Chat)
export async function POST(req: NextRequest) {
  try {
    const { sessionId, userId, messages, preview } = await req.json();
    if (!sessionId || !userId || !messages) return NextResponse.json({ ok: false });

    await getAdmin()
      .from("chat_sessions")
      .upsert({
        id: sessionId,
        user_id: userId,
        messages,
        preview: preview || messages.find((m: { role: string }) => m.role === "user")?.content?.slice(0, 80) || "Chat",
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// DELETE — remove a session
export async function DELETE(req: NextRequest) {
  const { sessionId, userId } = await req.json();
  if (!sessionId || !userId) return NextResponse.json({ ok: false });
  await getAdmin().from("chat_sessions").delete().eq("id", sessionId).eq("user_id", userId);
  return NextResponse.json({ ok: true });
}
