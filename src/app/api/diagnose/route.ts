import { NextRequest, NextResponse } from "next/server";

const KIE_API_KEY = process.env.KIE_API_KEY || process.env.KIE_API || process.env.GEMINI_API_KEY || "";
const KIE_ENDPOINT = "https://api.kie.ai/gemini-2.5-flash/v1/chat/completions";

const DIAGNOSE_SYSTEM = `You are PlantDoc — an expert cannabis plant diagnostician on StrainHub.com.

When given an image of a cannabis plant, you analyze it for:
- Nutrient deficiencies (Nitrogen, Phosphorus, Potassium, Calcium, Magnesium, Iron, etc.)
- Nutrient toxicities / nutrient burn
- Pests (spider mites, fungus gnats, aphids, thrips, whiteflies, caterpillars)
- Diseases (powdery mildew, botrytis/bud rot, root rot, damping off, leaf septoria)
- Environmental stress (heat stress, light burn, overwatering, underwatering, pH issues, root-bound)
- Physical damage

Your diagnosis MUST follow this exact JSON format:
{
  "summary": "One sentence summary of main issue",
  "severity": "Mild" | "Moderate" | "Severe" | "Healthy",
  "issues": [
    {
      "name": "Issue name",
      "category": "Deficiency" | "Toxicity" | "Pest" | "Disease" | "Environmental" | "Physical",
      "confidence": "High" | "Medium" | "Low",
      "symptoms": ["symptom 1", "symptom 2"],
      "causes": ["cause 1", "cause 2"],
      "treatment": ["treatment step 1", "treatment step 2", "treatment step 3"],
      "urgency": "Immediate" | "Within 48 hours" | "Monitor" | "Non-urgent"
    }
  ],
  "preventionTips": ["tip 1", "tip 2", "tip 3"],
  "overallHealth": "Brief 1-2 sentence overall health assessment"
}

If the image shows a healthy plant with no issues, set severity to "Healthy" and issues to [].
If the image is not a cannabis plant, return an error in the summary field.
Always respond with valid JSON only — no markdown, no extra text.`;

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, imageBase64 } = await req.json();

    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const imageContent = imageUrl
      ? { type: "image_url", image_url: { url: imageUrl } }
      : { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } };

    const payload = {
      messages: [
        { role: "system", content: DIAGNOSE_SYSTEM },
        {
          role: "user",
          content: [
            { type: "text", text: "Please diagnose this cannabis plant. Return JSON only." },
            imageContent,
          ],
        },
      ],
      stream: false,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "plant_diagnosis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              summary: { type: "string" },
              severity: { type: "string" },
              issues: { type: "array" },
              preventionTips: { type: "array" },
              overallHealth: { type: "string" },
            },
          },
        },
      },
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

    // Handle async task response from Kie vision
    let parsedOuter: Record<string, unknown>;
    try {
      parsedOuter = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "Failed to parse API response" }, { status: 500 });
    }

    // Check if it's an async task (code 200 with no choices)
    if (parsedOuter.code === 200 && !parsedOuter.choices) {
      // Vision is async — we need to poll. Return task info.
      return NextResponse.json({
        async: true,
        taskId: parsedOuter.data,
        message: "Analysis started, please wait...",
      });
    }

    const content = (parsedOuter as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No diagnosis returned" }, { status: 500 });
    }

    // Parse the JSON diagnosis
    let diagnosis;
    try {
      diagnosis = JSON.parse(content);
    } catch {
      // Try to extract JSON from text
      const match = content.match(/\{[\s\S]*\}/);
      if (match) diagnosis = JSON.parse(match[0]);
      else return NextResponse.json({ error: "Failed to parse diagnosis" }, { status: 500 });
    }

    return NextResponse.json({ diagnosis });
  } catch (err) {
    console.error("Diagnose API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
