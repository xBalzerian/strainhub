import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  // Lazy-init so env vars are available at runtime, not build time
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { subscriptionId, plan, userId } = await req.json();
    if (!userId || !plan || !subscriptionId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const durationDays = plan === "annual" ? 366 : 31;
    const expiresAt = new Date(Date.now() + durationDays * 86400000).toISOString();

    const { error } = await supabase.from("profiles").update({
      plan,
      plan_expires_at: expiresAt,
      paypal_subscription_id: subscriptionId,
    }).eq("id", userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Activate subscription error:", err);
    return NextResponse.json({ error: "Failed to activate" }, { status: 500 });
  }
}
