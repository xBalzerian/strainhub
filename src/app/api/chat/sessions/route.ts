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

  const { data, error } = await getAdmin()
    .from("chat_sessions")
    .select("id, preview, updated_at, messages")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(30);

  if (error) {
    console.error("[sessions GET error]", error);
    return NextResponse.json({ sessions: [], error: error.message });
  }

  return NextResponse.json({ sessions: data || [] });
}

// POST — save/upsert a session
export async function POST(req: NextRequest) {
  try {
    const { sessionId, userId, messages, preview } = await req.json();
    if (!sessionId || !userId || !messages) {
      return NextResponse.json({ ok: false, error: "Missing fields" });
    }

    const { error } = await getAdmin()
      .from("chat_sessions")
      .upsert({
        id: sessionId,
        user_id: userId,
        messages,
        preview: preview || messages.find((m: { role: string }) => m.role === "user")?.content?.slice(0, 80) || "Chat",
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });

    if (error) {
      console.error("[sessions POST error]", error);
      return NextResponse.json({ ok: false, error: error.message });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[sessions POST catch]", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// DELETE — remove a session
export async function DELETE(req: NextRequest) {
  try {
    const { sessionId, userId } = await req.json();
    if (!sessionId || !userId) return NextResponse.json({ ok: false });
    const { error } = await getAdmin()
      .from("chat_sessions")
      .delete()
      .eq("id", sessionId)
      .eq("user_id", userId);
    if (error) {
      console.error("[sessions DELETE error]", error);
      return NextResponse.json({ ok: false, error: error.message });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
