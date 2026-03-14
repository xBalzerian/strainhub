import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const KIE_API_KEY = process.env.KIE_API_KEY || process.env.KIE_API || process.env.GEMINI_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

// Strains are public — use anon key (no service role needed)
function getAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Sessions need service role for cross-user writes — but fall back gracefully if missing
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  // Detect if the key is obviously wrong (same as URL, too short, or missing eyJ prefix)
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

Use these exact slugs:
og-kush, blue-dream, sour-diesel, girl-scout-cookies, granddaddy-purple, northern-lights, jack-herer, white-widow, pineapple-express, gorilla-glue-4, wedding-cake, gelato, zkittlez, durban-poison, amnesia-haze, bruce-banner, green-crack, super-lemon-haze, purple-haze, ak-47, trainwreck, chemdawg, strawberry-cough, bubba-kush, purple-punch, sunset-sherbet, runtz, ice-cream-cake, do-si-dos, mimosa, banana-kush, lemon-haze, super-silver-haze, candy-kush, mango-kush, critical-kush, critical-mass, hindu-kush, master-kush, afghan-kush, blueberry, cherry-pie, death-star, girl-scout-cookies, godfather-og, headband, kosher-kush, la-confidential, purple-urkle, skywalker-og, tahoe-og, banana-og

Max 3 slugs unless user specifically asks for more. ALWAYS include this block when mentioning specific strain names.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userId, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    if (!KIE_API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    // ── Call KIE AI ──────────────────────────────────────────────────────────
    const payload = {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-20),
      ],
      stream: false,
    };

    const resp = await fetch(KIE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[chat] KIE API error:", resp.status, errText.slice(0, 200));
      return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
    }

    const raw = await resp.text();
    // KIE sometimes prepends an empty JSON object
    const cleaned = raw.replace(/^\{\}\s*/, "").trim();

    let data: { choices?: { message?: { content?: string } }[] };
    try {
      data = JSON.parse(cleaned);
    } catch {
      console.error("[chat] JSON parse error:", cleaned.slice(0, 200));
      return NextResponse.json({ error: "AI response parse error" }, { status: 500 });
    }

    const rawContent = data?.choices?.[0]?.message?.content;
    if (!rawContent) {
      console.error("[chat] No content in response:", JSON.stringify(data).slice(0, 200));
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    // ── Parse strain cards ───────────────────────────────────────────────────
    let strainSlugs: string[] = [];
    let content = rawContent;
    const cardMatch = rawContent.match(/\[STRAIN_CARDS\]([\s\S]*?)\[\/STRAIN_CARDS\]/);
    if (cardMatch) {
      try {
        const parsed = JSON.parse(cardMatch[1].trim());
        strainSlugs = (parsed.slugs || []).slice(0, 5);
      } catch {
        console.error("[chat] Strain card parse error:", cardMatch[1]);
      }
      content = rawContent.replace(/\[STRAIN_CARDS\][\s\S]*?\[\/STRAIN_CARDS\]/, "").trim();
    }

    // ── Fetch strain data using ANON key (public table) ──────────────────────
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
          strains = (strainData || []).sort(
            (a, b) => strainSlugs.indexOf(a.slug) - strainSlugs.indexOf(b.slug)
          );
        }
      } catch (e) {
        console.error("[chat] Strain fetch exception:", e);
      }
    }

    // ── Save session using admin client (graceful if unavailable) ────────────
    if (userId && sessionId) {
      const admin = getAdminClient();
      if (admin) {
        try {
          const lastUserMsg = messages[messages.length - 1]?.content || "";
          const { error: saveErr } = await admin
            .from("chat_sessions")
            .upsert({
              id: sessionId,
              user_id: userId,
              messages: [...messages, { role: "assistant", content }],
              updated_at: new Date().toISOString(),
              preview: lastUserMsg.slice(0, 80),
            }, { onConflict: "id" });
          if (saveErr) console.error("[chat] Session save error:", saveErr.message);
        } catch (e) {
          console.error("[chat] Session save exception:", e);
        }
      } else {
        console.warn("[chat] Admin client unavailable — skipping session save");
      }
    }

    return NextResponse.json({ message: content, strains });
  } catch (err) {
    console.error("[chat] Unhandled error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
