import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const KIE_API_KEY = process.env.KIE_API_KEY || process.env.KIE_API || process.env.GEMINI_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

const FREE_CHAT_LIMIT = 5;

function getAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!key || !key.startsWith("eyJ") || key.length < 100) return null;
  return createClient(url, key);
}

const SYSTEM_PROMPT = `You are StrainBot — a chill, knowledgeable cannabis companion on StrainHub.com. Think of yourself as a knowledgeable friend who loves cannabis and knows everything about it.

## PERSONALITY & TONE
- Talk like a real person, not a Wikipedia article. Short, natural sentences.
- Be warm, a little playful, genuinely curious about what the user needs.
- Match their energy — casual question = casual reply. Deep question = go deeper.
- Default to 2–4 SHORT sentences. Never write walls of text.
- Use follow-up questions: "What kind of high are you after?", "Growing indoors or out?", "Do you prefer earthy or fruity?"

## RESPONSE LENGTH
- Simple question (e.g. "best sativa?"): 1-2 sentences + strain cards
- Medium question: 3-5 sentences max
- Technical/deep question: short paragraphs, never a single block of text
- NEVER bullet-point everything — talk like a human

## EXPERTISE
- Strains: genetics, lineage, effects, flavors, terpenes, THC/CBD
- Growing: indoor/outdoor, nutrients, training (LST, SCROG, topping), VPD, pests
- Cannabinoids: THC, CBD, CBN, CBG, THCV, CBC
- Terpenes: Myrcene, Caryophyllene, Limonene, Linalool, Pinene, Terpinolene, Humulene
- Medical: always frame as "users report" — never as medical fact

## STRAIN CARDS — CRITICAL INSTRUCTION
When you recommend ANY specific strains by name, you MUST include this JSON block at the very END of your response. No exceptions:

[STRAIN_CARDS]
{"slugs": ["slug-1", "slug-2", "slug-3"]}
[/STRAIN_CARDS]

Use these exact slugs (pick the ones you mention):
og-kush, blue-dream, sour-diesel, girl-scout-cookies, granddaddy-purple, northern-lights, jack-herer, white-widow, pineapple-express, gorilla-glue-4, wedding-cake, gelato, zkittlez, durban-poison, amnesia-haze, bruce-banner, green-crack, super-lemon-haze, purple-haze, ak-47, trainwreck, chemdawg, strawberry-cough, bubba-kush, purple-punch, sunset-sherbet, runtz, ice-cream-cake, do-si-dos, mimosa, banana-kush, lemon-haze, super-silver-haze, candy-kush, mango-kush, critical-kush, critical-mass, hindu-kush, master-kush, afghan-kush, blueberry, cherry-pie, headband, kosher-kush, la-confidential, purple-urkle, skywalker-og, tahoe-og, banana-og

Max 3 slugs per response. ALWAYS include this JSON block whenever you name specific strains.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userId, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }
    if (!KIE_API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    // ── SERVER-SIDE chat limit (only for logged-in users) ─────────────────────
    if (userId) {
      const admin = getAdminClient();
      if (admin) {
        const { data: profile } = await admin
          .from("profiles")
          .select("plan, plan_expires_at, chats_today, chats_date")
          .eq("id", userId)
          .single();

        if (profile) {
          const isProUser =
            profile.plan !== "free" &&
            (!profile.plan_expires_at || new Date(profile.plan_expires_at) > new Date());

          if (!isProUser) {
            const today = new Date().toISOString().split("T")[0];
            const isToday = (d: string | null) => !!(d && d.startsWith(today));
            const currentChats = isToday(profile.chats_date) ? (profile.chats_today || 0) : 0;
            if (currentChats >= FREE_CHAT_LIMIT) {
              return NextResponse.json({
                error: `You've used all ${FREE_CHAT_LIMIT} free chats for today. Upgrade to Pro for unlimited chat! 🚀`,
                limitReached: true,
              }, { status: 429 });
            }
            // Increment BEFORE calling AI
            await admin.from("profiles").update({
              chats_today: currentChats + 1,
              chats_date: today,
            }).eq("id", userId);
          }
        }
      }
    }

    // ── Call KIE AI ───────────────────────────────────────────────────────────
    const resp = await fetch(KIE_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${KIE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)],
        stream: false,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[chat] KIE error:", resp.status, errText.slice(0, 200));
      return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
    }

    const raw = await resp.text();
    const cleaned = raw.replace(/^\{\}\s*/, "").trim();
    let data: { choices?: { message?: { content?: string } }[] };
    try { data = JSON.parse(cleaned); }
    catch { return NextResponse.json({ error: "AI response parse error" }, { status: 500 }); }

    const rawContent = data?.choices?.[0]?.message?.content;
    if (!rawContent) return NextResponse.json({ error: "No response from AI" }, { status: 500 });

    // ── Parse STRAIN_CARDS block ──────────────────────────────────────────────
    let strainSlugs: string[] = [];
    let content = rawContent;
    const cardMatch = rawContent.match(/\[STRAIN_CARDS\]([\s\S]*?)\[\/STRAIN_CARDS\]/);
    if (cardMatch) {
      try {
        const parsed = JSON.parse(cardMatch[1].trim());
        strainSlugs = (parsed.slugs || []).slice(0, 5);
        console.log("[chat] Parsed strain slugs:", strainSlugs);
      } catch (e) {
        console.error("[chat] Strain card JSON parse failed:", cardMatch[1], e);
      }
      content = rawContent.replace(/\[STRAIN_CARDS\][\s\S]*?\[\/STRAIN_CARDS\]/, "").trim();
    } else {
      console.log("[chat] No STRAIN_CARDS block found in AI response");
    }

    // ── Fetch strain data from DB (strains are public — anon key works) ─────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let strains: any[] = [];
    if (strainSlugs.length > 0) {
      try {
        const anon = getAnonClient();
        const { data: strainData, error: strainErr } = await anon
          .from("strains")
          .select("name, slug, type, thc_max, thc_min, cbd_max, effects, flavors, terpenes, description, image_url")
          .in("slug", strainSlugs);
        if (strainErr) {
          console.error("[chat] Strain fetch error:", strainErr.message);
        } else {
          strains = (strainData || []).sort((a, b) => strainSlugs.indexOf(a.slug) - strainSlugs.indexOf(b.slug));
          console.log("[chat] Fetched", strains.length, "strains for slugs:", strainSlugs);
        }
      } catch (e) {
        console.error("[chat] Strain fetch exception:", e);
      }
    }

    // ── Save session (include strains in message data) ────────────────────────
    if (userId && sessionId) {
      const admin = getAdminClient();
      if (admin) {
        try {
          const lastUserMsg = messages[messages.length - 1]?.content || "";
          await admin.from("chat_sessions").upsert({
            id: sessionId,
            user_id: userId,
            // Save strains alongside message so they reload correctly
            messages: [...messages, { role: "assistant", content, strains }],
            updated_at: new Date().toISOString(),
            preview: lastUserMsg.slice(0, 80),
          }, { onConflict: "id" });
        } catch (e) {
          console.error("[chat] Session save exception:", e);
        }
      }
    }

    return NextResponse.json({ message: content, strains });
  } catch (err) {
    console.error("[chat] Unhandled error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
