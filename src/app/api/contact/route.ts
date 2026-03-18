import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Save to Supabase contact_messages table
    const res = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceRole,
        "Authorization": `Bearer ${serviceRole}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Supabase error:", err);
      // Still return success to user — log it server-side
      console.log("[contact] SUBMISSION:", { name, email, subject, message });
      return NextResponse.json({ ok: true, note: "logged" });
    }

    console.log("[contact] Saved to DB:", email, subject);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
