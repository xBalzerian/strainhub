import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStrainSlugs, getStrainBySlug, getSimilarStrains } from "@/lib/strains";
import { strainMetadata, strainJsonLd } from "@/lib/seo";
import StrainCard from "@/components/StrainCard";

export async function generateStaticParams() {
  const slugs = await getAllStrainSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const strain = await getStrainBySlug(params.slug);
  if (!strain) return { title: "Strain Not Found" };
  return strainMetadata(strain);
}

const TERPENE_INFO: Record<string, { emoji: string; desc: string }> = {
  Myrcene: { emoji: "🫚", desc: "Earthy, musky. The most abundant terpene in cannabis. Promotes relaxation and sedation. Also found in mangoes and hops — eating mango before consuming cannabis may intensify effects." },
  Caryophyllene: { emoji: "🌶️", desc: "Spicy, peppery. The only terpene that also acts as a cannabinoid, binding directly to CB2 receptors. Strong anti-inflammatory properties. Also found in black pepper and cloves." },
  Limonene: { emoji: "🍋", desc: "Citrusy, fresh. Uplifting and mood-elevating. May reduce stress and anxiety. Commonly found in citrus peels. Known to enhance the absorption of other terpenes." },
  Linalool: { emoji: "💜", desc: "Floral, lavender. Calming and sedating. May help with anxiety, depression, and insomnia. The same terpene responsible for lavender's relaxing properties." },
  Pinene: { emoji: "🌲", desc: "Pine, fresh, earthy. May promote alertness and memory retention. Acts as a bronchodilator (opens airways). Found in pine needles, rosemary, and basil." },
  Ocimene: { emoji: "🌸", desc: "Sweet, herbal, woody. Uplifting and has decongestant properties. Common in tropical strains. Found in mint, parsley, and orchids." },
  Terpinolene: { emoji: "🍏", desc: "Floral, piney, fresh, slightly herbal. Mildly sedating with antioxidant properties. Particularly common in sativa-dominant strains. Found in apples, cumin, and lilacs." },
  Humulene: { emoji: "🍺", desc: "Earthy, woody, hoppy. May suppress appetite — rare among cannabis compounds. Anti-inflammatory. The same terpene that gives beer its hoppy aroma." },
};

const EFFECT_DESC: Record<string, string> = {
  Relaxed: "Deep physical and mental relaxation. Perfect for unwinding after a stressful day or easing muscle tension.",
  Happy: "Elevates mood and promotes feelings of joy, contentment, and overall wellbeing.",
  Euphoric: "Intense feelings of happiness and wellbeing. One of the most sought-after cannabis effects.",
  Creative: "Unlocks creative thinking, free association, and artistic inspiration. Great for creative projects.",
  Energetic: "Boosts energy, motivation, and physical activity. Great for daytime use and exercise.",
  Sleepy: "Promotes drowsiness and helps you fall asleep faster and stay asleep longer.",
  Uplifted: "Lifts your spirits and leaves you feeling positive, optimistic, and sociable.",
  Focused: "Sharpens mental clarity and concentration. Helps you stay on task without distraction.",
  Hungry: "Stimulates appetite strongly. Also known as 'the munchies.' Great for appetite loss.",
  Giggly: "Induces laughter and a lighthearted, playful, social mood.",
  Tingly: "Creates a pleasant tingling sensation that spreads through the body.",
};

const MOOD_EMOJI: Record<string, string> = {
  Relaxed: "😌", Happy: "😄", Euphoric: "🤩", Creative: "🎨",
  Energetic: "⚡", Sleepy: "😴", Uplifted: "🚀", Focused: "🎯",
  Giggly: "😂", Hungry: "🍔", Tingly: "✨",
};

// --- RED #1: Negative effects per strain (derived from type + effects + thc) ---
const NEGATIVE_EFFECTS_MAP: Record<string, string[]> = {
  "Dry Mouth": ["Dry Mouth"],
  "Dry Eyes": ["Dry Eyes"],
  "Paranoia": ["Paranoia"],
  "Anxiety": ["Anxiety"],
  "Dizzy": ["Dizziness"],
  "Headache": ["Headache"],
};

function derivedNegativeEffects(thcMax: number, effects: string[], type: string): string[] {
  const negatives: string[] = ["Dry Mouth", "Dry Eyes"];
  if (thcMax >= 22) negatives.push("Paranoia");
  if (thcMax >= 20 && type === "Sativa") negatives.push("Anxiety");
  if (thcMax >= 25) negatives.push("Dizzy");
  if (effects.includes("Sleepy") || type === "Indica") negatives.push("Couch-lock");
  return negatives;
}

const NEGATIVE_EMOJI: Record<string, string> = {
  "Dry Mouth": "💧",
  "Dry Eyes": "👁️",
  "Paranoia": "😰",
  "Anxiety": "😬",
  "Dizzy": "💫",
  "Headache": "🤕",
  "Couch-lock": "🛋️",
};

// --- RED #2: Sativa/Indica ratio derived from type ---
function getStrainRatio(type: string, effects: string[]): { indica: number; sativa: number; label: string } {
  if (type === "Indica") return { indica: 80, sativa: 20, label: "80% Indica / 20% Sativa" };
  if (type === "Sativa") return { indica: 20, sativa: 80, label: "20% Indica / 80% Sativa" };
  // Hybrid — lean based on effects
  const energeticEffects = effects.filter(e => ["Energetic", "Uplifted", "Creative", "Focused", "Giggly"].includes(e)).length;
  const relaxingEffects = effects.filter(e => ["Relaxed", "Sleepy", "Hungry", "Tingly"].includes(e)).length;
  if (energeticEffects > relaxingEffects) return { indica: 40, sativa: 60, label: "40% Indica / 60% Sativa" };
  if (relaxingEffects > energeticEffects) return { indica: 60, sativa: 40, label: "60% Indica / 40% Sativa" };
  return { indica: 50, sativa: 50, label: "50% Indica / 50% Sativa" };
}

// --- RED #3: Separate aroma vs flavor ---
const AROMA_KEYWORDS = ["Earthy", "Piney", "Pine", "Diesel", "Skunk", "Herbal", "Woody", "Spicy", "Pungent", "Chemical", "Ammonia", "Cheese", "Musky", "Floral", "Lavender", "Vanilla", "Coffee"];
const FLAVOR_KEYWORDS = ["Sweet", "Berry", "Blueberry", "Citrus", "Lemon", "Orange", "Grape", "Mango", "Tropical", "Mint", "Chocolate", "Caramel", "Fruity", "Candy", "Creamy", "Butter"];

function separateAromaFlavor(flavors: string[]): { aromas: string[]; flavors: string[] } {
  const aromas: string[] = [];
  const flavorOnly: string[] = [];
  for (const f of flavors) {
    const isAroma = AROMA_KEYWORDS.some(k => f.toLowerCase().includes(k.toLowerCase()));
    const isFlavor = FLAVOR_KEYWORDS.some(k => f.toLowerCase().includes(k.toLowerCase()));
    if (isAroma && !isFlavor) aromas.push(f);
    else if (isFlavor) { flavorOnly.push(f); if (isAroma) aromas.push(f); }
    else flavorOnly.push(f); // fallback
  }
  // ensure at least something in aroma
  if (aromas.length === 0 && flavorOnly.length > 0) aromas.push(...flavorOnly.slice(0, 2));
  return { aromas, flavors: flavorOnly };
}

export default async function StrainPage({ params }: { params: { slug: string } }) {
  const [strain] = await Promise.all([
    getStrainBySlug(params.slug),
  ]);

  if (!strain) notFound();

  const similar = await getSimilarStrains(strain.type, strain.slug, 4);
  const jsonLd = strainJsonLd(strain);
  const thcPct = Math.min(100, (strain.thc_max / 35) * 100);
  const cbdPct = Math.min(100, (strain.cbd_max / 25) * 100);
  const potency = strain.thc_max >= 28 ? "🔴 Very High" : strain.thc_max >= 22 ? "🟠 High" : strain.thc_max >= 16 ? "🟡 Moderate" : "🟢 Mild";
  const typeColor = strain.type === "Indica" ? "text-indica bg-indica-bg border-indica-border" : strain.type === "Sativa" ? "text-sativa bg-sativa-bg border-sativa-border" : "text-hybrid bg-hybrid-bg border-hybrid-border";

  // RED items computed
  const negativeEffects = derivedNegativeEffects(strain.thc_max, strain.effects || [], strain.type);
  const ratio = getStrainRatio(strain.type, strain.effects || []);
  const { aromas, flavors: flavorList } = separateAromaFlavor(strain.flavors || []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-xs font-semibold text-gray-400 mb-6">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <Link href="/strains" className="hover:text-brand">Strains</Link>
          <span>/</span>
          <span className="text-brand">{strain.name}</span>
        </nav>

        <Link href="/strains" className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-xl text-sm font-bold shadow-brutal-sm hover:bg-lime transition-all mb-8">
          ← Back to Strains
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 mb-12">
          {/* LEFT — Image + Quick Info */}
          <div className="lg:sticky lg:top-24 self-start">
            {strain.image_url ? (
              <img src={strain.image_url} alt={`${strain.name} cannabis strain`} className="w-full aspect-square object-cover rounded-2xl border-2 border-black shadow-brutal-lg mb-4" />
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-2xl border-2 border-black flex items-center justify-center text-8xl mb-4">🌿</div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-brutal-sm ${typeColor}`}>
                {strain.type === "Indica" ? "🍇" : strain.type === "Sativa" ? "☀️" : "⚡"} {strain.type}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-brutal-sm bg-lime">
                🔥 THC {strain.thc_min}–{strain.thc_max}%
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-brutal-sm bg-white">
                {potency} Potency
              </span>
            </div>

            {/* THC / CBD Bars */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm mb-4">
              <div className="mb-3">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>⚡ THC</span>
                  <span className="text-lime-dark font-black">{strain.thc_max}%</span>
                </div>
                <div className="bg-gray-200 rounded h-2.5 border border-black overflow-hidden">
                  <div className="bg-lime h-full rounded" style={{ width: `${thcPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>💙 CBD</span>
                  <span className="font-black">{strain.cbd_max}%</span>
                </div>
                <div className="bg-gray-200 rounded h-2.5 border border-black overflow-hidden">
                  <div className="bg-blue-400 h-full rounded" style={{ width: `${cbdPct}%` }} />
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-lime-pale border-2 border-black rounded-xl p-4 shadow-brutal-sm">
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">Quick Facts</div>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  ["Type", strain.type],
                  ["Ratio", ratio.label],
                  ["THC Range", `${strain.thc_min}–${strain.thc_max}%`],
                  ["CBD", `${strain.cbd_max}%`],
                  ["Flowering", `${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks`],
                  ["Difficulty", strain.grow_difficulty],
                  ["Yield", strain.grow_yield],
                  ["Height", strain.grow_height],
                  ...(strain.parents?.length ? [["Parents", strain.parents.slice(0, 2).join(" × ")]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <strong className="font-black">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Full Info */}
          <div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-3">{strain.name}</h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 pb-8 border-b-2 border-dashed border-gray-200">
              {strain.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "THC Range", value: `${strain.thc_min}–${strain.thc_max}%`, color: "text-lime-dark" },
                { label: "CBD", value: `${strain.cbd_max}%`, color: "" },
                { label: "Flowering", value: `${strain.flowering_weeks_min}–${strain.flowering_weeks_max}w`, color: "" },
              ].map((s) => (
                <div key={s.label} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm text-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* RED #2 — Indica/Sativa Ratio Visual */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm mb-8">
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🧬 Indica / Sativa Ratio</div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black text-indica w-14 text-right">Indica</span>
                <div className="flex-1 h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-indica-bg border-r-2 border-black transition-all"
                    style={{ width: `${ratio.indica}%` }}
                  />
                  <div
                    className="h-full bg-sativa-bg"
                    style={{ width: `${ratio.sativa}%` }}
                  />
                </div>
                <span className="text-xs font-black text-sativa w-14">Sativa</span>
              </div>
              <div className="flex justify-between text-xs font-black mt-1 px-14">
                <span className="text-indica">{ratio.indica}%</span>
                <span className="text-gray-400">{ratio.label}</span>
                <span className="text-sativa">{ratio.sativa}%</span>
              </div>
            </div>

            {/* RED #1 — Positive Effects */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">✨ Positive Effects</h2>
              <div className="flex flex-col gap-3">
                {(strain.effects || []).map((effect) => (
                  <div key={effect} className="flex items-start gap-4 bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                    <span className="text-2xl">{MOOD_EMOJI[effect] || "🌿"}</span>
                    <div>
                      <div className="font-black text-sm">{effect}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{EFFECT_DESC[effect] || ""}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RED #1 — Negative Effects / Side Effects */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">⚠️ Possible Side Effects</h2>
              <p className="text-xs text-gray-400 mb-3">Based on user reports and strain profile. Individual experiences may vary.</p>
              <div className="flex flex-wrap gap-2">
                {negativeEffects.map((effect) => (
                  <span key={effect} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
                    {NEGATIVE_EMOJI[effect] || "⚠️"} {effect}
                  </span>
                ))}
              </div>
            </div>

            {/* RED #3 — Aroma (separate from Flavor) */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">👃 Aroma</h2>
              <div className="flex flex-wrap gap-2">
                {aromas.map((a) => (
                  <span key={a} className="text-xs font-bold px-3 py-1.5 bg-purple-50 border-2 border-purple-200 rounded-lg text-purple-700">
                    🌫️ {a}
                  </span>
                ))}
              </div>
            </div>

            {/* RED #3 — Flavor (separate) */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">👅 Flavor</h2>
              <div className="flex flex-wrap gap-2">
                {flavorList.map((f) => (
                  <span key={f} className="text-xs font-bold px-3 py-1.5 bg-orange-50 border-2 border-orange-200 rounded-lg text-orange-700">
                    🍋 {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Helps With */}
            {strain.helps_with?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">💊 Reported to Help With</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {strain.helps_with.map((h) => (
                    <span key={h} className="text-xs font-bold px-3 py-1.5 bg-green-50 border-2 border-green-200 rounded-lg text-green-700">
                      ✅ {h}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400">⚠️ These are user-reported effects, not medical advice. Always consult a healthcare provider.</p>
              </div>
            )}

            {/* Genetics */}
            {strain.parents?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🌱 Genetics &amp; Lineage</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {strain.name} was created by crossing{" "}
                  {strain.parents.map((p, i) => (
                    <span key={p}>
                      <strong>{p}</strong>
                      {i < strain.parents.length - 2 ? ", " : i === strain.parents.length - 2 ? " and " : ""}
                    </span>
                  ))}, combining the best traits of both parent strains.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {strain.parents.map((parent, i) => (
                    <span key={parent} className="flex items-center gap-2">
                      <span className="bg-lime-pale border-2 border-black px-3 py-1.5 rounded-lg text-sm font-black shadow-brutal-sm">{parent}</span>
                      {i < strain.parents.length - 1 && <span className="text-gray-400 font-black">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Terpenes */}
            {strain.terpenes?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">🧬 Terpene Profile</h2>
                <p className="text-xs text-gray-400 mb-4">
                  Terpenes give {strain.name} its distinctive aroma and contribute to its effects through the entourage effect — the synergy between cannabinoids and terpenes.
                </p>
                <div className="flex flex-col gap-3">
                  {strain.terpenes.map((terpene) => {
                    const info = TERPENE_INFO[terpene];
                    return (
                      <div key={terpene} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{info?.emoji || "🌿"}</span>
                          <span className="font-black text-sm">{terpene}</span>
                          <span className="ml-auto text-[10px] font-bold bg-lime px-2 py-0.5 rounded-full border border-black">
                            {strain.terpenes[0] === terpene ? "Dominant" : "Secondary"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{info?.desc || ""}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Grow Info */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🌿 Growing {strain.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {strain.name} is a{" "}
                <strong>{strain.grow_difficulty?.toLowerCase()}</strong>-to-grow{" "}
                {strain.type.toLowerCase()} that flowers in{" "}
                <strong>{strain.flowering_weeks_min}–{strain.flowering_weeks_max} weeks</strong>. Plants reach a{" "}
                <strong>{strain.grow_height?.toLowerCase()}</strong> height with a{" "}
                <strong>{strain.grow_yield?.toLowerCase()}</strong> yield.
                {strain.grow_difficulty === "Easy" ? " Perfect for beginners — forgiving and resilient." : strain.grow_difficulty === "Difficult" ? " Recommended for experienced growers only." : " A good choice for intermediate growers."}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Difficulty", value: `${strain.grow_difficulty === "Easy" ? "🟢" : strain.grow_difficulty === "Moderate" ? "🟡" : "🔴"} ${strain.grow_difficulty}` },
                  { label: "Yield", value: `🤑 ${strain.grow_yield}` },
                  { label: "Height", value: `📏 ${strain.grow_height}` },
                  { label: "Flowering Time", value: `⏱ ${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks` },
                ].map((g) => (
                  <div key={g.label} className="bg-white border-2 border-black rounded-xl p-3 shadow-brutal-sm text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{g.label}</div>
                    <div className="text-sm font-black">{g.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">❓ People Also Ask About {strain.name}</h2>
              <div className="flex flex-col gap-3">
                {[
                  {
                    q: `What are the effects of ${strain.name}?`,
                    a: `${strain.name} is commonly reported to produce ${(strain.effects || []).join(", ")} effects. As a ${strain.type} strain, it's versatile for day or evening use.`,
                  },
                  {
                    q: `How strong is ${strain.name}?`,
                    a: `${strain.name} contains ${strain.thc_min}–${strain.thc_max}% THC — rated ${potency.replace(/[🔴🟠🟡🟢]/g, "").trim()} potency. ${strain.thc_max >= 22 ? "Suitable for most experience levels." : "Great for beginners."}`,
                  },
                  {
                    q: `What does ${strain.name} taste like?`,
                    a: `${strain.name} features a ${flavorList.join(", ")} flavor profile. The dominant terpene ${strain.terpenes?.[0]} contributes its signature aroma${strain.terpenes?.length > 1 ? `, alongside ${strain.terpenes.slice(1).join(" and ")}` : ""}.`,
                  },
                  {
                    q: `What are the side effects of ${strain.name}?`,
                    a: `Like most cannabis strains, ${strain.name} may cause ${negativeEffects.join(", ")} especially in higher doses. Start low and go slow if you're new to this strain.`,
                  },
                  {
                    q: `Is ${strain.name} good for beginners?`,
                    a: strain.grow_difficulty === "Easy"
                      ? `${strain.name} is an excellent choice for beginners — it's forgiving and resilient.`
                      : `${strain.name} is ${strain.grow_difficulty === "Moderate" ? "moderately challenging" : "best suited for experienced growers"}.`,
                  },
                  {
                    q: `What is ${strain.name} good for?`,
                    a: `Users report ${strain.name} helps with ${(strain.helps_with || []).join(", ")}. It's commonly used throughout the day depending on the desired effect.`,
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                    <div className="font-black text-sm mb-1.5">🔍 {q}</div>
                    <div className="text-gray-600 text-xs leading-relaxed">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Strains */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-xl font-black mb-6">🌿 Similar {strain.type} Strains</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((s) => (
                <StrainCard key={s.id} strain={s} rank={s.rank_popularity} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
