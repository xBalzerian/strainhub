import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const KIE_API_KEY = process.env.KIE_API_KEY || process.env.KIE_API || process.env.GEMINI_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

const SYSTEM_PROMPT = `You are StrainBot — a chill, smart cannabis companion on StrainHub.com. Think of yourself as a knowledgeable friend who loves weed and knows everything about it.

## PERSONALITY & TONE
- Talk like a real person, not a Wikipedia article. Short, natural sentences.
- Be warm, a little playful, genuinely curious about what the user needs.
- Match their energy — if they ask casually, reply casually. If they go deep, go deep with them.
- Never write walls of text. Default to 2-4 SHORT sentences. Only expand if they ask a technical or detailed question.
- Use follow-up questions to keep the conversation going: "What kind of high are you after?", "Growing indoors or out?", "Do you prefer earthy or fruity?"

## RESPONSE LENGTH RULES
- Simple question (e.g. "best sativa?"): 1-2 sentences + strain cards. That's it.
- Medium question (e.g. "what's the difference between indica and sativa?"): 3-5 sentences max.
- Deep/technical question (e.g. "explain the entourage effect"): can go longer, but still use short paragraphs, never a single block of text.
- NEVER bullet-point everything — talk like a human.

## EXPERTISE (use when relevant, don't dump it all at once)
- Strains: genetics, lineage, effects, flavors, terpenes, THC/CBD
- Growing: indoor/outdoor, nutrients, training (LST, SCROG, topping), VPD, pest control
- Cannabinoids: THC, CBD, CBN, CBG, THCV, CBC — effects and synergies
- Terpenes: Myrcene, Caryophyllene, Limonene, Linalool, Pinene, Terpinolene, Humulene
- Medical: which strains help with anxiety, pain, insomnia, PTSD, nausea — always frame as "users report" never medical fact

## STRAIN CARDS (IMPORTANT)
When recommending specific strains, add this block at the END of your reply — nowhere else:

[STRAIN_CARDS]
{"slugs": ["slug-1", "slug-2"]}
[/STRAIN_CARDS]

Slugs (lowercase-hyphens): "og-kush", "blue-dream", "sour-diesel", "girl-scout-cookies", "granddaddy-purple", "northern-lights", "jack-herer", "white-widow", "pineapple-express", "gorilla-glue-4", "wedding-cake", "gelato", "zkittlez", "durban-poison", "amnesia-haze", "bruce-banner", "green-crack", "super-lemon-haze", "purple-haze", "ak-47", "trainwreck", "chemdawg"

Max 3 strain cards unless they specifically ask for more. Always include cards when recommending strains.`;

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { messages, userId, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

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

    const raw = await resp.text();
    const cleaned = raw.replace(/^\{\}/, "").trim();
    const data = JSON.parse(cleaned);

    const rawContent = data?.choices?.[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    // Extract strain slugs if present
    let strainSlugs: string[] = [];
    let content = rawContent;
    const cardMatch = rawContent.match(/\[STRAIN_CARDS\]([\s\S]*?)\[\/STRAIN_CARDS\]/);
    if (cardMatch) {
      try {
        const parsed = JSON.parse(cardMatch[1].trim());
        strainSlugs = parsed.slugs || [];
      } catch { /* ignore parse errors */ }
      content = rawContent.replace(/\[STRAIN_CARDS\][\s\S]*?\[\/STRAIN_CARDS\]/, "").trim();
    }

    // Fetch strain data if slugs present
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let strains: any[] = [];
    if (strainSlugs.length > 0) {
      const { data: strainData } = await supabaseAdmin
        .from("strains")
        .select("name, slug, type, thc_max, thc_min, cbd_max, effects, flavors, terpenes, description, image_url")
        .in("slug", strainSlugs);
      strains = strainData || [];
      // Sort by the order AI mentioned them
      strains.sort((a, b) => strainSlugs.indexOf(a.slug) - strainSlugs.indexOf(b.slug));
    }

    // Save to chat_sessions table if userId provided
    if (userId && sessionId) {
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      const { error: saveErr } = await supabaseAdmin
        .from("chat_sessions")
        .upsert({
          id: sessionId,
          user_id: userId,
          messages: [...messages, { role: "assistant", content }],
          updated_at: new Date().toISOString(),
          preview: lastUserMsg.slice(0, 80),
        }, { onConflict: "id" });
      if (saveErr) console.error("[chat save error]", saveErr);
    }

    return NextResponse.json({ message: content, strains });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
