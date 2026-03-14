import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  // Validate key — must be a JWT (starts with eyJ) and be long enough
  if (!key || !key.startsWith("eyJ") || key.length < 100) {
    return null;
  }
  return createClient(url, key);
}

// GET — list sessions for a user
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ sessions: [] });

  const admin = getAdminClient();
  if (!admin) {
    console.warn("[sessions] Admin client unavailable — service role key invalid");
    return NextResponse.json({ sessions: [], warning: "service_key_invalid" });
  }

  try {
    const { data, error } = await admin
      .from("chat_sessions")
      .select("id, preview, updated_at, messages")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(30);

    if (error) {
      console.error("[sessions GET]", error.message);
      return NextResponse.json({ sessions: [], dbError: error.message });
    }
    return NextResponse.json({ sessions: data || [] });
  } catch (e) {
    console.error("[sessions GET catch]", e);
    return NextResponse.json({ sessions: [] });
  }
}

// POST — upsert a session
export async function POST(req: NextRequest) {
  try {
    const { sessionId, userId, messages, preview } = await req.json();
    if (!sessionId || !userId || !messages) {
      return NextResponse.json({ ok: false, error: "Missing required fields" });
    }

    const admin = getAdminClient();
    if (!admin) {
      console.warn("[sessions POST] Admin client unavailable");
      return NextResponse.json({ ok: false, error: "service_key_invalid" });
    }

    const { error } = await admin
      .from("chat_sessions")
      .upsert({
        id: sessionId,
        user_id: userId,
        messages,
        preview: preview || messages.find((m: { role: string }) => m.role === "user")?.content?.slice(0, 80) || "Chat",
        updated_at: new Date().toISOString(),
      }, { onConflict: "id" });

    if (error) {
      console.error("[sessions POST]", error.message);
      return NextResponse.json({ ok: false, error: error.message });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[sessions POST catch]", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// DELETE — remove a session (or all sessions for a user)
export async function DELETE(req: NextRequest) {
  try {
    const { sessionId, userId, deleteAll } = await req.json();
    if (!userId) return NextResponse.json({ ok: false, error: "Missing userId" });

    const admin = getAdminClient();
    if (!admin) return NextResponse.json({ ok: false, error: "service_key_invalid" });

    if (deleteAll) {
      const { error } = await admin.from("chat_sessions").delete().eq("user_id", userId);
      if (error) return NextResponse.json({ ok: false, error: error.message });
      return NextResponse.json({ ok: true, deletedAll: true });
    }

    if (!sessionId) return NextResponse.json({ ok: false, error: "Missing sessionId" });
    const { error } = await admin
      .from("chat_sessions")
      .delete()
      .eq("id", sessionId)
      .eq("user_id", userId);

    if (error) {
      console.error("[sessions DELETE]", error.message);
      return NextResponse.json({ ok: false, error: error.message });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// Note: DELETE is already defined above. The body can optionally include { deleteAll: true }
