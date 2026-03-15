import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { subscriptionId, plan, userId } = await req.json();
    if (!userId || !plan || !subscriptionId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verify subscription with PayPal API
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
    const secret = process.env.PAYPAL_CLIENT_SECRET!;
    const base = process.env.PAYPAL_ENV === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    // Get access token
    const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(`${clientId}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error("PayPal token error:", tokenData);
      return NextResponse.json({ error: "PayPal verification failed" }, { status: 500 });
    }

    // Get subscription details
    const subRes = await fetch(`${base}/v1/billing/subscriptions/${subscriptionId}`, {
      headers: { "Authorization": `Bearer ${tokenData.access_token}` },
    });
    const subData = await subRes.json();

    // Must be ACTIVE or APPROVED
    if (!["ACTIVE", "APPROVED"].includes(subData.status)) {
      console.error("Subscription not active:", subData.status, subData);
      return NextResponse.json({ error: `Subscription status: ${subData.status}` }, { status: 400 });
    }

    // Set expiry based on plan
    const durationDays = plan === "annual" ? 366 : 31;
    const expiresAt = new Date(Date.now() + durationDays * 86400000).toISOString();

    const { error: dbError } = await supabase.from("profiles").update({
      plan: plan === "annual" ? "annual" : "monthly",
      plan_expires_at: expiresAt,
    }).eq("id", userId);

    if (dbError) {
      console.error("DB update error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    console.log(`✅ Pro activated: user=${userId} plan=${plan} sub=${subscriptionId}`);
    return NextResponse.json({ success: true, plan, expiresAt });

  } catch (err) {
    console.error("Activate subscription error:", err);
    return NextResponse.json({ error: "Activation failed" }, { status: 500 });
  }
}
