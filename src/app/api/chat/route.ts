import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const KIE_API_KEY = process.env.KIE_API_KEY || process.env.KIE_API || process.env.GEMINI_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

const SYSTEM_PROMPT = `You are StrainBot — the world's most knowledgeable cannabis expert and grow advisor, powering StrainHub.com.

You have deep expertise in:
- Cannabis strains: genetics, lineage, effects, flavors, terpene profiles, THC/CBD levels
- Growing cannabis: indoor, outdoor, hydro, soil, nutrients, training techniques (LST, SCROG, topping), lighting schedules, VPD, pest & disease management
- Cannabinoids: THC, CBD, CBN, CBG, THCV, CBC — their effects, synergies, and medical applications
- Terpenes: Myrcene, Caryophyllene, Limonene, Linalool, Pinene, Ocimene, Terpinolene, Humulene
- Medical uses: which strains/cannabinoids help with anxiety, pain, insomnia, PTSD, nausea, appetite

IMPORTANT — STRAIN CARD FEATURE:
When the user asks you to recommend, list, or show specific strains, you MUST include a special JSON block at the END of your response using this exact format:

[STRAIN_CARDS]
{"slugs": ["slug-1", "slug-2", "slug-3"]}
[/STRAIN_CARDS]

Use the exact database slug (lowercase, hyphens). Example slugs: "og-kush", "blue-dream", "sour-diesel", "girl-scout-cookies", "granddaddy-purple", "northern-lights", "jack-herer", "white-widow", "pineapple-express", "gorilla-glue-4", "wedding-cake", "gelato", "zkittlez", "durban-poison", "amnesia-haze", "bruce-banner", "green-crack", "super-lemon-haze", "purple-haze", "ak-47", "trainwreck", "chemdawg"

Rules:
- Be conversational, warm, expert-level but approachable
- Give specific, actionable advice
- When recommending strains, explain WHY — then include the STRAIN_CARDS block
- Keep responses concise (2-4 paragraphs max unless asked for detail)
- Never give medical diagnoses — frame as "many users report" or "this strain is known for"
- Always include STRAIN_CARDS when recommending 1-5 specific strains`;

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
      await supabaseAdmin
        .from("chat_sessions")
        .upsert({
          id: sessionId,
          user_id: userId,
          messages: [...messages, { role: "assistant", content }],
          updated_at: new Date().toISOString(),
          preview: lastUserMsg.slice(0, 80),
        }, { onConflict: "id" });
    }

    return NextResponse.json({ message: content, strains });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
