import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendKey = process.env.RESEND_API_KEY!;

const NOTIFY_EMAIL = "jjbalz1994@gmail.com";
const FROM_EMAIL = "StrainHub <notifications@strainhub.org>";

async function sendNotificationEmail(name: string, email: string, subject: string, message: string) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#0D0D0D;padding:16px 24px;border-radius:12px 12px 0 0;">
        <h1 style="color:#AAFF00;margin:0;font-size:20px;">🌿 StrainHub — New Contact Message</h1>
      </div>
      <div style="background:#fff;border:2px solid #0D0D0D;border-top:none;border-radius:0 0 12px 12px;padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#888;font-size:13px;width:80px;vertical-align:top;">From</td>
            <td style="padding:8px 0;font-weight:700;color:#0D0D0D;">${name} &lt;${email}&gt;</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Subject</td>
            <td style="padding:8px 0;font-weight:700;color:#0D0D0D;">${subject || "No subject"}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top;">Message</td>
            <td style="padding:8px 0;color:#333;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td>
          </tr>
        </table>
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid #eee;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your message on StrainHub')}" 
             style="display:inline-block;background:#AAFF00;color:#0D0D0D;font-weight:800;padding:10px 20px;border-radius:8px;text-decoration:none;">
            Reply to ${name} →
          </a>
        </div>
      </div>
      <p style="color:#aaa;font-size:11px;text-align:center;margin-top:16px;">Sent from strainhub.org/contact</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `[StrainHub] New message from ${name} — ${subject || "Contact form"}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] Resend error:", err);
  } else {
    console.log("[contact] Notification email sent to", NOTIFY_EMAIL);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Save to Supabase
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceRole,
        "Authorization": `Bearer ${serviceRole}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!dbRes.ok) {
      const err = await dbRes.text();
      console.error("[contact] Supabase error:", err);
    } else {
      console.log("[contact] Saved to DB:", email, subject);
    }

    // 2. Send notification email (don't await — fire and forget, don't block response)
    sendNotificationEmail(name, email, subject, message).catch(e =>
      console.error("[contact] Email notification failed:", e)
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
