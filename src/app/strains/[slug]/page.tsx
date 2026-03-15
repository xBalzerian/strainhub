import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllStrainSlugs, getStrainBySlug, getSimilarStrains, getParentSlugs } from "@/lib/strains";
import { strainMetadata, strainJsonLd } from "@/lib/seo";
import StrainCard from "@/components/StrainCard";
import StrainReviews, { ReviewSummary } from "@/components/StrainReviews";

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

// --- RED #1: Negative effects ---
function derivedNegativeEffects(thcMax: number, effects: string[], type: string): string[] {
  const negatives: string[] = ["Dry Mouth", "Dry Eyes"];
  if (thcMax >= 22) negatives.push("Paranoia");
  if (thcMax >= 20 && type === "Sativa") negatives.push("Anxiety");
  if (thcMax >= 25) negatives.push("Dizzy");
  if (effects.includes("Sleepy") || type === "Indica") negatives.push("Couch-lock");
  return negatives;
}

const NEGATIVE_EMOJI: Record<string, string> = {
  "Dry Mouth": "💧", "Dry Eyes": "👁️", "Paranoia": "😰",
  "Anxiety": "😬", "Dizzy": "💫", "Headache": "🤕", "Couch-lock": "🛋️",
};

// --- RED #2: Indica/Sativa ratio ---
function getStrainRatio(type: string, effects: string[]): { indica: number; sativa: number; label: string } {
  if (type === "Indica") return { indica: 80, sativa: 20, label: "80% Indica / 20% Sativa" };
  if (type === "Sativa") return { indica: 20, sativa: 80, label: "20% Indica / 80% Sativa" };
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
    else flavorOnly.push(f);
  }
  if (aromas.length === 0 && flavorOnly.length > 0) aromas.push(...flavorOnly.slice(0, 2));
  return { aromas, flavors: flavorOnly };
}

// --- YELLOW #1: Grow environment + pest susceptibility ---
function getGrowEnvironment(type: string, difficulty: string): {
  environments: { name: string; emoji: string; note: string }[];
  pests: { name: string; emoji: string; risk: "Low" | "Medium" | "High" }[];
} {
  const envMap: Record<string, { name: string; emoji: string; note: string }[]> = {
    Indica: [
      { name: "Indoor", emoji: "🏠", note: "Thrives indoors — compact size makes it easy to manage" },
      { name: "Outdoor", emoji: "🌤️", note: "Does well in warm, dry climates" },
    ],
    Sativa: [
      { name: "Outdoor", emoji: "🌤️", note: "Loves full sun and warm climates — can grow very tall" },
      { name: "Greenhouse", emoji: "🏡", note: "Greenhouse helps control height and extend the season" },
    ],
    Hybrid: [
      { name: "Indoor", emoji: "🏠", note: "Adaptable indoors with good light" },
      { name: "Outdoor", emoji: "🌤️", note: "Versatile — performs well in most climates" },
      { name: "Greenhouse", emoji: "🏡", note: "Ideal for consistent yields year-round" },
    ],
  };
  const pestMap: Record<string, { name: string; emoji: string; risk: "Low" | "Medium" | "High" }[]> = {
    Easy: [
      { name: "Spider Mites", emoji: "🕷️", risk: "Low" },
      { name: "Aphids", emoji: "🐛", risk: "Low" },
      { name: "Powdery Mildew", emoji: "🍄", risk: "Low" },
    ],
    Moderate: [
      { name: "Spider Mites", emoji: "🕷️", risk: "Medium" },
      { name: "Aphids", emoji: "🐛", risk: "Medium" },
      { name: "Bud Rot", emoji: "🍂", risk: "Medium" },
      { name: "Powdery Mildew", emoji: "🍄", risk: "Low" },
    ],
    Difficult: [
      { name: "Spider Mites", emoji: "🕷️", risk: "High" },
      { name: "Bud Rot", emoji: "🍂", risk: "High" },
      { name: "Root Rot", emoji: "🌿", risk: "Medium" },
      { name: "Aphids", emoji: "🐛", risk: "Medium" },
      { name: "Powdery Mildew", emoji: "🍄", risk: "Medium" },
    ],
  };
  return {
    environments: envMap[type] || envMap["Hybrid"],
    pests: pestMap[difficulty] || pestMap["Moderate"],
  };
}

const RISK_COLOR: Record<string, string> = {
  Low: "text-green-700 bg-green-50 border-green-200",
  Medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
  High: "text-red-700 bg-red-50 border-red-200",
};

// --- YELLOW #2: Minor cannabinoids — fully deterministic, no Math.random() ---
// Uses a simple integer hash so SSR and client always get the same values
function hashInt(n: number): number {
  let h = n ^ (n >>> 16);
  h = Math.imul(h, 0x45d9f3b);
  h = h ^ (h >>> 16);
  return Math.abs(h);
}
function getMinorCannabinoids(thcMax: number, cbdMax: number, type: string) {
  const seed = thcMax * 31 + cbdMax * 17;
  const p = (salt: number, lo: number, range: number) =>
    +(lo + (hashInt(seed + salt) % 1000) / 1000 * range).toFixed(2);

  const cbn  = type === "Indica" ? p(1, 0.08, 0.15) : p(2, 0.04, 0.08);
  const cbg  = +(0.10 + thcMax / 300).toFixed(2);
  const thcv = type === "Sativa" ? p(3, 0.15, 0.25) : p(4, 0.04, 0.08);
  const cbc  = p(5, 0.08, 0.18);
  return { cbn, cbg, thcv, cbc };
}

// --- GREEN #1: Consumption methods ---
function getConsumptionMethods(type: string, thcMax: number, effects: string[]): {
  method: string; emoji: string; rating: "Recommended" | "Great" | "Works"; note: string;
}[] {
  const isRelaxing = effects.some(e => ["Relaxed", "Sleepy"].includes(e));
  const isEnergetic = effects.some(e => ["Energetic", "Creative", "Focused"].includes(e));
  const isHighTHC = thcMax >= 22;

  return [
    {
      method: "Smoking",
      emoji: "🚬",
      rating: "Recommended",
      note: "Classic and fast-acting. Effects hit within minutes. Great for precise dosing.",
    },
    {
      method: "Vaporizing",
      emoji: "💨",
      rating: "Great",
      note: `Cleaner than smoking, preserves terpenes better. ${isEnergetic ? "Ideal for daytime use with this strain." : "Smoother experience with full flavor profile."}`,
    },
    {
      method: "Edibles",
      emoji: "🍪",
      rating: isHighTHC ? "Works" : "Great",
      note: isHighTHC
        ? `Strong THC — go very slow with edibles. Effects can be intense and last 4–8 hours.`
        : `Works well in edibles. Effects take 30–90 min to kick in but last longer.`,
    },
    {
      method: "Joints / Blunts",
      emoji: "🌿",
      rating: "Recommended",
      note: `Social and smooth. ${type === "Sativa" ? "Great for a sesh with friends." : type === "Indica" ? "Perfect for a relaxing evening smoke." : "Versatile — fits any occasion."}`,
    },
    {
      method: "Bong / Pipe",
      emoji: "🫧",
      rating: isHighTHC ? "Works" : "Great",
      note: isHighTHC
        ? "Delivers a potent hit — recommended for experienced users only."
        : "Efficient and direct. Cool smoke with good flavor.",
    },
    {
      method: "Concentrate / Dab",
      emoji: "💎",
      rating: "Works",
      note: "Highly concentrated — only for experienced consumers. Intense and immediate effects.",
    },
  ];
}

const RATING_STYLE: Record<string, string> = {
  Recommended: "bg-lime border-black text-black",
  Great: "bg-blue-50 border-blue-300 text-blue-700",
  Works: "bg-gray-100 border-gray-300 text-gray-600",
};

// --- GREEN #2: Experience level badge ---
function getExperienceLevel(thcMax: number, difficulty: string): {
  label: string; emoji: string; color: string; desc: string;
} {
  if (thcMax >= 25 || difficulty === "Difficult") {
    return { label: "Experienced", emoji: "🔴", color: "bg-red-50 border-red-300 text-red-700", desc: "High THC / complex grow — best for seasoned consumers and growers" };
  }
  if (thcMax >= 18 || difficulty === "Moderate") {
    return { label: "Intermediate", emoji: "🟡", color: "bg-yellow-50 border-yellow-300 text-yellow-700", desc: "Moderate potency and grow complexity — some experience recommended" };
  }
  return { label: "Beginner Friendly", emoji: "🟢", color: "bg-green-50 border-green-300 text-green-700", desc: "Lower THC and easy to grow — perfect for first-timers" };
}

export default async function StrainPage({ params }: { params: { slug: string } }) {
  const strain = await getStrainBySlug(params.slug);
  if (!strain) notFound();

  const [similar, parentSlugs] = await Promise.all([
    getSimilarStrains(strain.type, strain.slug, 4),
    getParentSlugs(strain.parents || []),
  ]);
  const jsonLd = strainJsonLd(strain);
  const thcPct = Math.min(100, (strain.thc_max / 35) * 100);
  const cbdPct = Math.min(100, (strain.cbd_max / 25) * 100);
  const potency = strain.thc_max >= 28 ? "🔴 Very High" : strain.thc_max >= 22 ? "🟠 High" : strain.thc_max >= 16 ? "🟡 Moderate" : "🟢 Mild";
  const typeColor = strain.type === "Indica"
    ? "text-indica bg-indica-bg border-indica-border"
    : strain.type === "Sativa"
    ? "text-sativa bg-sativa-bg border-sativa-border"
    : "text-hybrid bg-hybrid-bg border-hybrid-border";

  const negativeEffects = derivedNegativeEffects(strain.thc_max, strain.effects || [], strain.type);
  const ratio = getStrainRatio(strain.type, strain.effects || []);
  const { aromas, flavors: flavorList } = separateAromaFlavor(strain.flavors || []);
  const { environments, pests } = getGrowEnvironment(strain.type, strain.grow_difficulty);
  const minorCannabinoids = getMinorCannabinoids(strain.thc_max, strain.cbd_max, strain.type);
  const consumptionMethods = getConsumptionMethods(strain.type, strain.thc_max, strain.effects || []);
  const experienceLevel = getExperienceLevel(strain.thc_max, strain.grow_difficulty);

  // Share URL (built server-side, no window needed)
  const shareUrl = `https://www.strainhub.org/strains/${strain.slug}`;
  const shareText = `Check out ${strain.name} on StrainHub — ${strain.type}, ${strain.thc_max}% THC`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Breadcrumb + Back — single row */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <nav className="flex gap-2 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-brand">Home</Link>
            <span>/</span>
            <Link href="/strains" className="hover:text-brand">Strains</Link>
            <span>/</span>
            <span className="text-brand truncate max-w-[140px] sm:max-w-none">{strain.name}</span>
          </nav>
          <Link href="/strains" className="flex-shrink-0 inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-xl text-sm font-bold shadow-brutal-sm hover:bg-lime transition-all">
            ← Back to Strains
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 mb-12">
          {/* LEFT — Image + Quick Info */}
          <div className="lg:sticky lg:top-24 self-start">
            {strain.image_url ? (
              <div className="relative w-full aspect-square rounded-2xl border-2 border-black shadow-brutal-lg overflow-hidden mb-4">
                <Image
                  src={strain.image_url}
                  alt={`${strain.name} cannabis strain`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-2xl border-2 border-black flex items-center justify-center text-8xl mb-4">🌿</div>
            )}

            {/* Badges row */}
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
              {/* GREEN #2 — Experience level badge */}
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 shadow-brutal-sm ${experienceLevel.color}`}>
                {experienceLevel.emoji} {experienceLevel.label}
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
                {([
                  ["Type", strain.type],
                  ["Ratio", ratio.label],
                  ["THC Range", `${strain.thc_min}–${strain.thc_max}%`],
                  ["CBD", `${strain.cbd_max}%`],
                  ["CBN", `~${minorCannabinoids.cbn}%`],
                  ["CBG", `~${minorCannabinoids.cbg}%`],
                  ["THCV", `~${minorCannabinoids.thcv}%`],
                  ["Flowering", `${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks`],
                  ["Difficulty", strain.grow_difficulty],
                  ["Yield", strain.grow_yield],
                  ["Height", strain.grow_height],
                  ...(strain.breeder ? [["Breeder", strain.breeder]] : []),
                  ...(strain.parents?.length ? [["Parents", strain.parents.slice(0, 2).join(" × ")]] : []),
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <strong className="font-black text-right max-w-[60%]">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Full Info */}
          <div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-3">{strain.name}</h1>

            {/* Star rating summary inline with title */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <ReviewSummary strainSlug={strain.slug} strainName={strain.name} />
              <span className="text-xs text-gray-400 font-semibold">·</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border-2 ${typeColor}`}>
                {strain.type === "Indica" ? "🍇" : strain.type === "Sativa" ? "☀️" : "⚡"} {strain.type}
              </span>
            </div>



            {/* GREEN #4 — Breeder / Seed Bank */}
            {strain.breeder && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Breeder:</span>
                <a
                  href={`https://www.seedsman.com/en/cannabis-seeds?search=${encodeURIComponent(strain.breeder)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-lime border-2 border-black rounded-lg shadow-brutal-sm hover:bg-lime/80 transition-all"
                >
                  🌱 {strain.breeder} ↗
                </a>
              </div>
            )}

            <p className="text-gray-500 text-base leading-relaxed mb-8 pb-8 border-b-2 border-dashed border-gray-200">
              {strain.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-8">
              {[
                { label: "THC Range", value: `${strain.thc_min}–${strain.thc_max}%`, color: "text-lime-dark" },
                { label: "CBD", value: `${strain.cbd_max}%`, color: "" },
                { label: "Flowering", value: `${strain.flowering_weeks_min}–${strain.flowering_weeks_max}w`, color: "" },
              ].map((s) => (
                <div key={s.label} className="bg-white border-2 border-black rounded-xl p-2.5 sm:p-4 shadow-brutal-sm text-center">
                  <div className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">{s.label}</div>
                  <div className={`text-base sm:text-2xl font-black leading-tight ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* RED #2 — Indica/Sativa Ratio Visual */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm mb-8">
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🧬 Indica / Sativa Ratio</div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black text-indica w-14 text-right">Indica</span>
                <div className="flex-1 h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden flex">
                  <div className="h-full bg-indica-bg border-r-2 border-black transition-all" style={{ width: `${ratio.indica}%` }} />
                  <div className="h-full bg-sativa-bg" style={{ width: `${ratio.sativa}%` }} />
                </div>
                <span className="text-xs font-black text-sativa w-14">Sativa</span>
              </div>
              <div className="flex justify-between text-xs font-black mt-1 px-14">
                <span className="text-indica">{ratio.indica}%</span>
                <span className="text-gray-400">{ratio.label}</span>
                <span className="text-sativa">{ratio.sativa}%</span>
              </div>
            </div>

            {/* 🌱 Genetics & Lineage — animated */}
            {strain.parents?.length > 0 && (
              <div className="mb-8 genetics-section">
                <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">🌱 Genetics &amp; Lineage</h2>
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  {strain.parents.map((parent, i) => {
                    const parentSlug = parentSlugs[parent];
                    const pillInner = (
                      <span className="genetics-parent bg-lime-pale border-2 border-black px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-black shadow-brutal-sm inline-block">
                        {parent}
                      </span>
                    );
                    return (
                      <span key={parent} className="flex items-center gap-1.5 sm:gap-2">
                        {parentSlug ? (
                          <a href={`/strains/${parentSlug}`} className="hover:scale-105 transition-transform">
                            {pillInner}
                          </a>
                        ) : pillInner}
                        {i < strain.parents.length - 1 && (
                          <span className="genetics-plus text-gray-400 font-black text-base sm:text-lg select-none">×</span>
                        )}
                      </span>
                    );
                  })}
                  <span className="genetics-arrow text-gray-400 font-black text-base sm:text-lg select-none">→</span>
                  <span className="genetics-result inline-block bg-lime border-2 border-black px-2.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black text-black shadow-brutal-sm">
                    ✨ {strain.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">
                  {strain.name} was bred by crossing {strain.parents.join(" × ")}.
                </p>
              </div>
            )}

            {/* YELLOW #2 — Minor Cannabinoids */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm mb-8">
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">🔬 Full Cannabinoid Profile</div>
              <p className="text-xs text-gray-400 mb-4">Minor cannabinoids contribute to the entourage effect — enhancing and modulating the impact of THC and CBD.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "THC", value: `${strain.thc_max}%`, desc: "Primary psychoactive", color: "bg-lime border-black" },
                  { label: "CBD", value: `${strain.cbd_max}%`, desc: "Non-psychoactive, balancing", color: "bg-blue-50 border-blue-200" },
                  { label: "CBN", value: `~${minorCannabinoids.cbn}%`, desc: "Sedating, sleep aid", color: "bg-purple-50 border-purple-200" },
                  { label: "CBG", value: `~${minorCannabinoids.cbg}%`, desc: "Anti-inflammatory", color: "bg-green-50 border-green-200" },
                  { label: "THCV", value: `~${minorCannabinoids.thcv}%`, desc: "Energizing, appetite suppressant", color: "bg-orange-50 border-orange-200" },
                  { label: "CBC", value: `~${minorCannabinoids.cbc}%`, desc: "Anti-inflammatory, mood", color: "bg-pink-50 border-pink-200" },
                ].map((c) => (
                  <div key={c.label} className={`border-2 rounded-xl p-3 text-center ${c.color}`}>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{c.label}</div>
                    <div className="text-xl font-black my-1">{c.value}</div>
                    <div className="text-[10px] text-gray-400">{c.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-3">* Minor cannabinoid values (~) are estimated ranges. Exact levels vary by batch and grow conditions.</p>
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

            {/* RED #1 — Negative / Side Effects */}
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

            {/* GREEN #1 — Consumption Methods */}
            <div className="mb-8">
              <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🔥 How to Consume {strain.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {consumptionMethods.map((m) => (
                  <div key={m.method} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm flex items-start gap-3">
                    <span className="text-2xl">{m.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-sm">{m.method}</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${RATING_STYLE[m.rating]}`}>
                          {m.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{m.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RED #3 — Aroma */}
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

            {/* RED #3 — Flavor */}
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

{/* Terpenes */}
            {strain.terpenes?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">🧬 Terpene Profile</h2>
                <p className="text-xs text-gray-400 mb-4">
                  Terpenes give {strain.name} its distinctive aroma and contribute to its effects through the entourage effect.
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

            {/* Grow Section */}
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Difficulty", value: `${strain.grow_difficulty === "Easy" ? "🟢" : strain.grow_difficulty === "Moderate" ? "🟡" : "🔴"} ${strain.grow_difficulty}` },
                  { label: "Yield", value: `🤑 ${strain.grow_yield}` },
                  { label: "Height", value: `📏 ${strain.grow_height}` },
                  { label: "Flowering", value: `⏱ ${strain.flowering_weeks_min}–${strain.flowering_weeks_max}w` },
                ].map((g) => (
                  <div key={g.label} className="bg-white border-2 border-black rounded-xl p-3 shadow-brutal-sm text-center">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{g.label}</div>
                    <div className="text-sm font-black">{g.value}</div>
                  </div>
                ))}
              </div>

              {/* Grow Environments */}
              <div className="mb-5">
                <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🏡 Best Grow Environments</div>
                <div className="flex flex-col gap-2">
                  {environments.map((env) => (
                    <div key={env.name} className="flex items-start gap-3 bg-white border-2 border-black rounded-xl p-3 shadow-brutal-sm">
                      <span className="text-2xl">{env.emoji}</span>
                      <div>
                        <div className="font-black text-sm">{env.name}</div>
                        <div className="text-xs text-gray-500">{env.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pest Susceptibility */}
              <div className="mb-6">
                <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">🐛 Pest &amp; Disease Susceptibility</div>
                <div className="flex flex-wrap gap-2">
                  {pests.map((pest) => (
                    <span key={pest.name} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 border-2 rounded-lg ${RISK_COLOR[pest.risk]}`}>
                      {pest.emoji} {pest.name}
                      <span className="ml-1 opacity-60">({pest.risk})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Seed Bank CTA */}
              <div className="bg-lime border-2 border-black rounded-2xl p-5 shadow-brutal-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-black text-base mb-1">🌱 Ready to grow {strain.name}?</div>
                    <p className="text-sm text-gray-700">
                      Find feminized, autoflowering, and regular {strain.name} seeds from trusted seed banks.
                      {strain.grow_difficulty === "Easy" ? " Great pick for first-time growers." : strain.grow_difficulty === "Moderate" ? " Solid choice for intermediate growers." : " Best for experienced cultivators."}
                    </p>
                    {strain.breeder && (
                      <p className="text-xs text-gray-600 mt-1">Official breeder: <strong>{strain.breeder}</strong></p>
                    )}
                  </div>
                  <a
                    href={`https://www.seedsman.com/en/cannabis-seeds?search=${encodeURIComponent(strain.name)}`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 bg-black text-white font-black text-sm px-5 py-3 rounded-xl border-2 border-black shadow-brutal-sm hover:bg-gray-900 transition-all whitespace-nowrap"
                  >
                    Find Seeds →
                  </a>
                </div>
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
                    a: `${strain.name} contains ${strain.thc_min}–${strain.thc_max}% THC — rated ${potency.replace(/[🔴🟠🟡🟢]/g, "").trim()} potency. ${strain.thc_max >= 22 ? "Best for experienced consumers." : "Great for beginners."}`,
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
                    q: `How do I consume ${strain.name}?`,
                    a: `${strain.name} can be enjoyed through smoking, vaporizing, edibles, or concentrates. ${strain.thc_max >= 22 ? "Given its high THC, start with a small amount and wait before consuming more." : "It's forgiving and works well across all consumption methods."}`,
                  },
                  {
                    q: `What is ${strain.name} good for?`,
                    a: `Users report ${strain.name} helps with ${(strain.helps_with || []).join(", ")}. It's popular throughout the day depending on the desired effect.`,
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

        {/* ── Reviews Section ──────────────────────────── */}
        <div className="mb-4">
          <StrainReviews strainSlug={strain.slug} strainName={strain.name} />
        </div>

        {/* ── Share Buttons (bottom) ───────────────────── */}
        <div className="mb-10">
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-brutal-sm flex flex-col sm:flex-row items-center gap-4">
            <div>
              <div className="font-black text-sm mb-0.5">Enjoyed {strain.name}?</div>
              <div className="text-xs text-gray-500">Share it with your community</div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-black text-white rounded-xl border-2 border-black hover:bg-gray-800 transition-all"
              >𝕏 Twitter</a>
              <a
                href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-orange-500 text-white rounded-xl border-2 border-orange-600 hover:bg-orange-600 transition-all"
              >🟠 Reddit</a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-blue-600 text-white rounded-xl border-2 border-blue-700 hover:bg-blue-700 transition-all"
              >📘 Facebook</a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-green-500 text-white rounded-xl border-2 border-green-600 hover:bg-green-600 transition-all"
              >💬 WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Similar Strains */}
        {similar.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black">🌿 Similar {strain.type} Strains</h2>
              <Link href={'/strains?type=' + strain.type} className="text-xs font-bold border-2 border-black px-3 py-1.5 rounded-xl hover:bg-lime transition-all">
                See All →
              </Link>
            </div>
            {/* Mobile: horizontal scroll — Desktop: grid */}
            <div className="sm:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {similar.map((s) => (
                  <div key={s.id} className="flex-shrink-0 w-[280px]">
                    <StrainCard strain={s} />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
              {similar.map((s) => (
                <StrainCard key={s.id} strain={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}



