import { NextRequest, NextResponse } from "next/server";

const KIE_API_KEY = process.env.KIE_API_KEY || process.env.KIE_API || process.env.GEMINI_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

const SYSTEM_PROMPT = `You are StrainBot — the world's most knowledgeable cannabis expert and grow advisor, powering StrainHub.com.

You have deep expertise in:
- Cannabis strains: genetics, lineage, effects, flavors, terpene profiles, THC/CBD levels
- Growing cannabis: indoor, outdoor, hydro, soil, nutrients, training techniques (LST, SCROG, topping), lighting schedules, VPD, pest & disease management
- Cannabinoids: THC, CBD, CBN, CBG, THCV, CBC — their effects, synergies, and medical applications
- Terpenes: Myrcene, Caryophyllene, Limonene, Linalool, Pinene, Ocimene, Terpinolene, Humulene — aromas, effects, synergies
- The entourage effect and how compounds work together
- Medical uses: which strains/cannabinoids help with anxiety, pain, insomnia, PTSD, nausea, appetite
- Strain finding: helping users find the perfect strain based on desired effects, flavor, grow difficulty, THC level, or medical need

StrainHub Database Context:
- We have 100+ premium strains fully catalogued with genetics, terpenes, cannabinoid profiles, grow info, and images
- Strain types: Indica (relaxing, body), Sativa (energizing, cerebral), Hybrid (balanced)
- Top strains include: OG Kush, Blue Dream, Girl Scout Cookies, Sour Diesel, Granddaddy Purple, Northern Lights, Jack Herer, White Widow, Pineapple Express, Gorilla Glue #4, Wedding Cake, Gelato, Zkittlez, and many more

Rules:
- Be conversational, warm, expert-level but approachable
- Give specific, actionable advice — not vague generalities  
- When recommending strains, explain WHY that strain fits the user's need
- Keep responses concise but complete (2-4 paragraphs max unless asked for detail)
- Never give medical diagnoses — frame as "many users report" or "this strain is known for"
- If asked about a specific strain in our database, give rich detail about it
- If asked to find a strain, ask 1-2 clarifying questions if needed (desired effect, grow experience, etc.)
- You're enthusiastic about cannabis — this passion shows in your answers`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const payload = {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-20), // keep last 20 messages for context
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
    // Kie sometimes prepends "{}" — handle that
    const cleaned = raw.replace(/^\{\}/, "").trim();
    const data = JSON.parse(cleaned);

    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    return NextResponse.json({ message: content });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
