import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Week-by-Week Grow Guide — Germination to Harvest | StrainHub",
  description: "Complete cannabis grow guide: germination, seedling, vegetative, flowering, and harvest — week by week with lighting, nutrients, watering, training techniques, and curing.",
  alternates: { canonical: "https://strainhub.com/learn/grow-guide" },
};

const STAGES = [
  { stage:"Germination", weeks:"Week 1", icon:"🌰", color:"bg-amber-50 border-amber-200",
    tasks:["Soak seeds in water 12–24 hours until they sink","Transfer to moist paper towel in dark, warm spot (21–27°C)","Taproot emerges in 24–72 hours","Plant 0.5–1cm deep, taproot pointing down"],
    light:"Dark", water:"Keep moist, not wet", nutrients:"None — seed has its own supply",
    tip:"Never touch the taproot with bare hands. Use tweezers — skin oils can damage it." },
  { stage:"Seedling", weeks:"Weeks 1–3", icon:"🌱", color:"bg-green-50 border-green-200",
    tasks:["First round leaves (cotyledons) emerge","True cannabis leaves appear after cotyledons","Keep humidity high (65–70%)","Use small pots — seedlings hate oversized containers","Watch for damping off (stem rot) — most common seedling killer"],
    light:"18/6 — T5 or CFL close to canopy", water:"Water in circle around stem. Let top inch dry before rewatering.", nutrients:"Start at 1/4 strength only — seedlings burn easily",
    tip:"Yellowing cotyledons before week 3 is normal — they die as true leaves take over." },
  { stage:"Vegetative (Early)", weeks:"Weeks 3–6", icon:"🌿", color:"bg-lime-50 border-lime-200",
    tasks:["Plant growing rapidly — new nodes every few days","Top or FIM now for multiple colas","Start LST — bend main stem outward","Transplant to larger pot if roots are circling bottom"],
    light:"18/6 — move to HID, LED, or CMH", water:"More frequent as root zone expands. Lift pots to judge weight.", nutrients:"Increase nitrogen (N) — primary vegetative macronutrient",
    tip:"The more time in veg, the bigger the final yield. Do not rush to flower." },
  { stage:"Vegetative (Late)", weeks:"Weeks 6–9", icon:"💪", color:"bg-lime-50 border-lime-200",
    tasks:["Plant doubles or triples in size — final training","Defoliate lower bud sites that won't receive light","ScrOG growers: fill the net before flipping","Check pH: 6.0–7.0 soil, 5.5–6.5 hydro","Final transplant to flowering pot (5–10 gallon)"],
    light:"18/6 — maximize intensity", water:"Large amounts but always with dry-back periods", nutrients:"Peak nitrogen, add cal/mag, slight phosphorus increase",
    tip:"Perform final defoliation 2–3 days before switching to 12/12 to reduce stress." },
  { stage:"Flower Transition", weeks:"Weeks 1–2 of flower", icon:"🔄", color:"bg-orange-50 border-orange-200",
    tasks:["Switch lights to 12/12 to trigger flowering","Plant will stretch 50–200% — pre-flower stretch","First white pistils appear at node sites","Remove any males immediately","Stop all training — plant is in reproductive mode"],
    light:"12/12 — strict darkness critical. Any light leak can cause hermaphroditism.", water:"Reduce slightly — roots consolidating", nutrients:"Taper nitrogen, increase phosphorus (P) and potassium (K)",
    tip:"Sativas can stretch 200%. Plan your ceiling height before you flip." },
  { stage:"Early Flower", weeks:"Weeks 3–5 of flower", icon:"🌸", color:"bg-pink-50 border-pink-200",
    tasks:["Bud sites forming at every node","Trichome production begins — smell intensifies","Support heavy branches with stakes or yo-yos","Defoliate selectively — remove leaves blocking bud sites"],
    light:"12/12 — some growers increase intensity for bud density", water:"Back to heavy schedule as metabolism peaks", nutrients:"Full bloom: high P/K, moderate N, cal-mag critical",
    tip:"This is when VPD management matters most. Aim for 0.8–1.2 kPa." },
  { stage:"Mid Flower", weeks:"Weeks 5–8 of flower", icon:"🌺", color:"bg-rose-50 border-rose-200",
    tasks:["Buds swelling visibly week by week","Pistils turning orange/red as they mature","Trichome density increasing — use loupe or microscope","Watch for powdery mildew and bud rot"],
    light:"12/12 — never interrupt dark period", water:"High demand — never let pots fully dry out", nutrients:"Peak bloom nutrients. Molasses for organic grows.",
    tip:"Buy a jeweler's loupe. Watching trichomes is the only accurate harvest timing method." },
  { stage:"Late Flower / Pre-Harvest", weeks:"Weeks 8–10+ of flower", icon:"✨", color:"bg-purple-50 border-purple-200",
    tasks:["Trichomes shifting clear → cloudy → amber","Pistils 70–90% orange signals maturity","Begin flush: plain pH water only for 1–2 weeks","Lower humidity to 40–50% to prevent mold"],
    light:"Some growers run 36–48h darkness before harvest to boost trichomes", water:"Flush with 3x pot volume in plain pH-adjusted water", nutrients:"STOP — flush only. Residual nutrients = harsh smoke.",
    tip:"Cloudy trichomes = peak THC. Amber trichomes = THC degrading to CBN (more sedating). Harvest to your preference." },
  { stage:"Harvest & Dry", weeks:"Day of harvest + 7–14 days", icon:"✂️", color:"bg-yellow-50 border-yellow-200",
    tasks:["Cut plants at base or branch by branch","Wet trim or dry trim — both work","Hang upside down: 60°F/15°C, 60% humidity, good airflow","Drying takes 7–14 days — buds snap when done","Jar up when outer is dry but inner has slight moisture"],
    light:"Dark — light degrades THC during drying", water:"N/A", nutrients:"N/A",
    tip:"The drying environment is as important as the grow. Rushing the dry = harsh, grassy cannabis." },
  { stage:"Curing", weeks:"2–8 weeks post-harvest", icon:"🏺", color:"bg-amber-50 border-amber-200",
    tasks:["Place dry buds in glass mason jars — 75% full","Burp jars twice daily for first week","After week 1: burp once daily","After week 2: burp every few days","Minimum 2 weeks. 4–8 weeks = noticeably smoother flavor."],
    light:"Dark, cool location", water:"Boveda 62% packs maintain optimal moisture", nutrients:"N/A",
    tip:"Curing is where most flavor development happens. It is not optional — it is the difference between good and exceptional cannabis." },
];

export default function GrowGuidePage() {
  const howToJsonLd = {
    "@context": "https://schema.org","@type": "HowTo",
    name: "How to Grow Cannabis: Week-by-Week Complete Guide",
    description: "Complete guide to growing cannabis from seed to harvest.",
    step: STAGES.map((s,i) => ({ "@type":"HowToStep", position:i+1, name:s.stage, text:s.tasks[0] })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Week-by-Week Cannabis Grow Guide</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">From seed to harvest — every stage of the cannabis life cycle with lighting, nutrients, watering, and timing. No fluff.</p>
          <div className="flex gap-3 mt-6 flex-wrap">
            {["Germination","Seedling","Vegetative","Flowering","Harvest","Curing"].map(s => (
              <span key={s} className="text-xs font-black bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-brutal-sm">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        {STAGES.map((s,i) => (
          <div key={s.stage} className={`${s.color} border-2 rounded-2xl p-6 shadow-brutal`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{s.icon}</span>
              <div><h2 className="text-xl font-black">{s.stage}</h2><span className="text-xs font-bold text-gray-400">{s.weeks}</span></div>
              <span className="ml-auto text-xs font-black bg-white border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">Stage {i+1}</span>
            </div>
            <ul className="space-y-1.5 mb-5">
              {s.tasks.map(t => <li key={t} className="flex gap-2 text-sm text-gray-700"><span className="text-lime-600 font-black shrink-0">✓</span>{t}</li>)}
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
              {[["💡 Light",s.light],["💧 Water",s.water],["🧪 Nutrients",s.nutrients]].map(([label,val]) => (
                <div key={label} className="bg-white border border-black rounded-lg p-3">
                  <div className="font-black text-gray-400 uppercase mb-1">{label}</div>
                  <div className="text-gray-600">{val}</div>
                </div>
              ))}
            </div>
            <div className="bg-black text-lime text-xs font-bold rounded-xl px-4 py-3">💡 Pro tip: {s.tip}</div>
          </div>
        ))}

        <section className="pt-4">
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {q:"How long does it take to grow cannabis?",a:"Total time is typically 3–5 months. Autoflowering strains can finish in 8–10 weeks. Photoperiod indicas take 3–4 months. Sativas can take 5–6 months due to long flowering times."},
              {q:"How do I know when to harvest cannabis?",a:"Check trichomes with a jeweler's loupe (30–60x). Clear = too early. Cloudy/milky = peak THC. Amber = THC degrading to CBN (more sedating). Harvest at 70–90% cloudy with 10–20% amber for a balanced effect."},
              {q:"What is the best light for growing cannabis indoors?",a:"LED quantum boards are the current gold standard — efficient, full-spectrum, low heat. HPS lights are proven and affordable. T5/CFL work for seedlings and small plants but lack intensity for flowering."},
              {q:"What pH should cannabis growing medium be?",a:"Soil: 6.0–7.0. Coco coir: 5.8–6.3. Hydro: 5.5–6.5. pH outside these ranges locks out nutrients even if they are present — this is the #1 cause of deficiencies in home grows."},
            ].map(faq => (
              <details key={faq.q} className="bg-white border-2 border-black rounded-xl shadow-brutal-sm group">
                <summary className="flex justify-between items-center p-5 font-black cursor-pointer list-none">{faq.q}<span className="text-xl group-open:rotate-45 transition-transform">+</span></summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t-2 border-black pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h3 className="font-black text-lg mb-4">Continue Learning</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{href:"/learn/training",label:"✂️ Training Techniques"},{href:"/learn/deficiencies",label:"🍂 Deficiency Guide"},{href:"/learn/indica-vs-sativa",label:"🌿 Indica vs Sativa"},{href:"/learn/cannabinoids",label:"🔬 Cannabinoids"},{href:"/strains",label:"Browse Strains →"}].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">{l.label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
