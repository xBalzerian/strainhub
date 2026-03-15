import Link from "next/link";
import type { Metadata } from "next";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cannabis Grow Guide — Week by Week from Seed to Harvest | StrainHub",
  description: "The complete cannabis grow guide: germination, seedling, vegetative, flowering, and harvest stages week by week. Nutrients, light schedules, and expert tips.",
  keywords: "cannabis grow guide, how to grow weed, cannabis growing stages, week by week grow, cannabis harvest guide",
  alternates: { canonical: "https://strainhub.org/learn/grow-guide" },
  openGraph: {
    title: "Cannabis Grow Guide — Seed to Harvest | StrainHub",
    description: "Week-by-week cannabis growing from germination to harvest.",
    url: "https://strainhub.org/learn/grow-guide",
    type: "article",
  },
};

const STAGES = [
  {
    stage: "Germination",
    weeks: "Week 1",
    emoji: "🫘",
    duration: "1–7 days",
    light: "No light needed",
    water: "Keep moist, not wet",
    nutrients: "None",
    temp: "21–27°C (70–80°F)",
    humidity: "70–90% RH",
    color: "#f0fdf4",
    border: "#86efac",
    badge: "#14532d",
    description: "The seed cracking open and sending out its first root (taproot). The most critical window — oxygen, moisture, and warmth are everything.",
    keyTasks: [
      "Paper towel method: place seeds between damp paper towels in a dark, warm spot",
      "Check every 12 hours — seed should crack within 24–72 hours",
      "Tap root should be 0.5–1cm before planting",
      "Plant root-down, 0.5–1cm deep in lightly moistened soil or starter cube",
      "Cover lightly — seedling will emerge in 1–4 days",
    ],
    watchFor: "Tap root should be white, not brown. Brown = rot. Start over.",
  },
  {
    stage: "Seedling",
    weeks: "Week 1–3",
    emoji: "🌱",
    duration: "2–3 weeks",
    light: "18/6 (18hrs on, 6hrs off) at low intensity",
    water: "Small amounts, around the seedling",
    nutrients: "None or ¼ strength max",
    temp: "20–25°C (68–77°F)",
    humidity: "65–70% RH",
    color: "#fefce8",
    border: "#fde047",
    badge: "#713f12",
    description: "First single-finger leaves (cotyledons) appear, followed by the first true fan leaves with cannabis's characteristic serrated edges. Fragile stage — overwatering is the #1 killer.",
    keyTasks: [
      "Keep lights 50–60cm away (LED) to prevent light burn on tiny plants",
      "Water only when top 1–2cm of soil is dry — tiny plants need tiny amounts",
      "No nutrients for first 2 weeks — seed contains all it needs",
      "Ensure good airflow but not direct fan blast on seedlings",
      "Watch for stretching (too much distance from light = long, thin stem)",
    ],
    watchFor: "Damping off (seedling falls over at soil level) = overwatering or poor drainage. Tighten watering schedule.",
  },
  {
    stage: "Vegetative (Early)",
    weeks: "Week 3–5",
    emoji: "🪴",
    duration: "2–4 weeks",
    light: "18/6 — increase intensity gradually",
    water: "Water when top 2–3cm is dry",
    nutrients: "Start at ¼ strength, increase to ½ strength. High N.",
    temp: "22–28°C (72–82°F)",
    humidity: "50–70% RH",
    color: "#eff6ff",
    border: "#93c5fd",
    badge: "#1e3a5f",
    description: "Explosive leaf and root growth. Plant is building its structure. This is when training starts. The plant is at its most resilient here — able to recover from mistakes quickly.",
    keyTasks: [
      "Begin LST or other training when 4–5 nodes are established",
      "Increase light intensity as plant grows larger",
      "Start nutrients: nitrogen-heavy formula (e.g. 3-1-2 NPK)",
      "Top or FIM if using those techniques at node 5",
      "Monitor runoff pH — should be 6.0–7.0 (soil)",
    ],
    watchFor: "pH drift (yellowing lower leaves despite feeding = check pH first). Pests start here — check undersides of leaves weekly.",
  },
  {
    stage: "Vegetative (Late)",
    weeks: "Week 5–8",
    emoji: "🌿",
    duration: "2–4 weeks",
    light: "18/6 — full intensity",
    water: "Larger volumes as root zone expands",
    nutrients: "Full strength vegetative nutrients. Maintain high N.",
    temp: "22–28°C (72–82°F)",
    humidity: "40–60% RH",
    color: "#f5f3ff",
    border: "#c4b5fd",
    badge: "#4c1d95",
    description: "Plant reaches its full vegetative size. Final training. Scrog screens fill up. Pre-flower pistils may appear (white hairs) showing sex, even in veg.",
    keyTasks: [
      "Continue LST and SCROG training — fill canopy",
      "Lollipop lower branches that won't receive light in flower",
      "Check sex: female = white pistils, male = pollen sacs (remove males)",
      "Defoliate strategically for light penetration in dense canopy",
      "Flip to 12/12 when plant is 50% of desired final height (will double in flower)",
    ],
    watchFor: "Males! Remove immediately to prevent pollination. Pre-flower check at node 4–6 for white hairs (female) or small round sacs (male).",
  },
  {
    stage: "Transition (Stretch)",
    weeks: "Flower Week 1–3",
    emoji: "🔀",
    duration: "1–3 weeks",
    light: "12/12 — strict dark period",
    water: "Maintain regular watering",
    nutrients: "Transition to bloom nutrients — reduce N, increase P/K",
    temp: "20–26°C (68–79°F)",
    humidity: "40–50% RH",
    color: "#fff7ed",
    border: "#fdba74",
    badge: "#9a3412",
    description: "The 'stretch' phase — plant can double in height in 2 weeks as it transitions to flowering. White pistils appear everywhere. The beginning of bud site formation.",
    keyTasks: [
      "Switch light schedule to exactly 12 on / 12 off — ANY light leak can cause hermaphrodites",
      "Raise lights as plant stretches rapidly",
      "Switch nutrients to bloom formula (lower N, higher P and K)",
      "Continue SCROG training as new growth emerges above net",
      "Stop all high-stress training after week 1 of flower",
    ],
    watchFor: "Light leaks during dark period = hermaphrodites. Use black tape on any blinking LEDs, timers, or gaps in tent.",
  },
  {
    stage: "Flowering (Mid)",
    weeks: "Flower Week 3–6",
    emoji: "🌸",
    duration: "3–4 weeks",
    light: "12/12",
    water: "Increase slightly as plant is drinking more",
    nutrients: "Full bloom nutrients. Calcium and magnesium supplementation.",
    temp: "18–24°C (65–75°F)",
    humidity: "40–50% RH",
    color: "#fdf4ff",
    border: "#d8b4fe",
    badge: "#6b21a8",
    description: "Buds forming and stacking rapidly. Trichomes visible under a loupe. Pistils (hairs) are white and standing. Plant smell intensifies dramatically.",
    keyTasks: [
      "Support heavy branches with stakes or SCROG net",
      "Add Cal-Mag if using coco or RO water",
      "Defoliate lightly if canopy is too dense — 20% max",
      "Watch for bud rot in dense flowers (botrytis) — increase airflow",
      "First trichome check with loupe: all clear/cloudy at this stage",
    ],
    watchFor: "Bud rot (grey mold inside dense buds) = reduce humidity immediately below 45%. Check inside colas not just outside.",
  },
  {
    stage: "Flowering (Late Ripening)",
    weeks: "Flower Week 6–10",
    emoji: "🍯",
    duration: "2–4 weeks",
    light: "12/12",
    water: "Maintain, then reduce for final flush",
    nutrients: "Reduce nutrients, begin flushing 1–2 weeks before harvest",
    temp: "17–22°C (63–72°F)",
    humidity: "30–40% RH",
    color: "#fffbeb",
    border: "#fcd34d",
    badge: "#78350f",
    description: "Maximum resin production. Buds swelling to final size. Trichomes transitioning from cloudy to amber. Pistils browning and receding. Most important window for harvest timing.",
    keyTasks: [
      "Use jeweler's loupe (60–100×) or digital microscope daily",
      "Flush: run 2–3× pot volume of plain pH'd water through soil",
      "Lower temperature by 5°C in last 2 weeks to boost color and resin",
      "Reduce humidity to 30–40% — mold risk highest now",
      "Stop all nutrients 7–14 days before harvest",
    ],
    watchFor: "Calyx swelling and pistil recession = harvest approaching. Don't rush — each extra day of ripening increases quality dramatically.",
  },
  {
    stage: "Harvest, Dry & Cure",
    weeks: "Week 10–16 (strain dependent)",
    emoji: "✂️",
    duration: "Ongoing",
    light: "Darkness during drying",
    water: "None",
    nutrients: "None",
    temp: "18–21°C (65–70°F)",
    humidity: "45–55% RH",
    color: "#fef2f2",
    border: "#fca5a5",
    badge: "#991b1b",
    description: "Harvest timing, trimming, drying, and curing are where most of the final quality is made or destroyed. A perfect grow ruined by a bad dry/cure is heartbreaking.",
    keyTasks: [
      "Trichome harvest window: 80–90% cloudy trichomes = peak THC. Amber trichomes = more sedating/relaxing high",
      "Harvest at lights-off (or just before) for maximum terpene preservation",
      "Wet trim (before dry) for faster results; dry trim for better flavor",
      "Hang whole plants or branches upside down in dark room",
      "Dry slowly: 7–14 days at 18–21°C, 45–55% RH — slower = better",
      "Cure in glass jars: burp (open) jars 2× daily for first 2 weeks, then weekly for 4–8 weeks",
    ],
    watchFor: "Drying too fast (less than 7 days) = harsh, grassy taste. Hay smell = too fast. Patient cure (8+ weeks) turns good into exceptional.",
  },
];

const HARVEST_TRICHOMES = [
  { stage: "Clear", look: "Transparent, water-like", meaning: "Not ready. THC still developing.", color: "bg-blue-100 text-blue-700" },
  { stage: "Cloudy/Milky", look: "White, opaque", meaning: "Peak THC. Cerebral, energetic high.", color: "bg-gray-100 text-gray-700" },
  { stage: "Amber", look: "Golden/brown", meaning: "THC degrading to CBN. Heavier, more sedating.", color: "bg-amber-100 text-amber-700" },
];

export default function GrowGuidePage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6]">
      <ArticleJsonLd
        title="Cannabis Grow Guide — Seed to Harvest"
        description="Every stage of the cannabis lifecycle explained with week-by-week tasks, environmental targets, and common mistakes to avoid."
        url="https://strainhub.org/learn/grow-guide"
      />
      <BreadcrumbJsonLd items={[{"name": "Home", "url": "https://strainhub.org"}, {"name": "Learn", "url": "https://strainhub.org/learn"}, {"name": "Grow Guide", "url": "https://strainhub.org/learn/grow-guide"}]} />
      <FaqJsonLd questions={[{"q": "How long does it take to grow cannabis?", "a": "Autoflowers: 8\u201312 weeks. Photoperiod indicas: 14\u201318 weeks. Photoperiod sativas: 18\u201328 weeks."}, {"q": "What's the best lighting schedule for cannabis?", "a": "Vegetative: 18/6 (18 hours on, 6 off). Flowering: 12/12 (12 hours on, 12 off). Autoflowers flower regardless of light schedule."}, {"q": "How do I know when cannabis is ready to harvest?", "a": "Check trichomes with a 60\u2013100x loupe. When 70\u201380% are milky/cloudy and 10\u201320% amber, THC is at peak potency."}]} />
      <nav className="border-b border-gray-200 bg-white" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">Grow Guide</span>
        </div>
      </nav>

      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#14532d" }}>📅 Growing</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">Cannabis Grow Guide<br />— Seed to Harvest</h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">Every stage of the cannabis lifecycle explained — germination through harvest, with week-by-week tasks, environmental targets, and common mistakes to avoid.</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>8 stages</span><span>·</span><span>~45 min read</span><span>·</span>
            <span className="font-semibold text-green-700">Beginner to Expert</span>
          </div>
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img src="/images/learn/grow-guide.jpg" alt="Cannabis growing stages from seed to harvest" className="w-full h-56 md:h-72 object-cover" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        <div className="bg-[#AAFF00] border-2 border-black rounded-2xl p-6">
          <p className="text-xs font-black uppercase tracking-widest mb-2">⚡ Total Timeline</p>
          <p className="text-base font-semibold text-black leading-relaxed">Seed to harvest takes <strong>8–16 weeks</strong> depending on strain and veg time. Autoflowers: 8–12 weeks total. Photoperiod indicas: 10–14 weeks. Photoperiod sativas: 14–20 weeks. The biggest variable is how long you veg — longer veg = bigger plants = more yield.</p>
        </div>

        {/* Timeline Nav */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Jump to Stage</p>
          <div className="flex flex-wrap gap-2">
            {STAGES.map(s => (
              <a key={s.stage} href={`#${s.stage.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")}`}
                className="text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all">
                {s.emoji} {s.stage}
              </a>
            ))}
          </div>
        </div>

        {/* Stage Cards */}
        <div className="space-y-6">
          {STAGES.map(s => (
            <div key={s.stage} id={s.stage.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")}
              className="bg-white border-2 rounded-2xl overflow-hidden"
              style={{ borderColor: s.border }}>
              <div className="p-5 border-b" style={{ background: s.color, borderColor: s.border }}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{s.emoji}</span>
                    <div>
                      <h2 className="font-black text-xl text-black">{s.stage}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: s.badge }}>{s.weeks}</span>
                        <span className="text-xs text-gray-500">Duration: {s.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">{s.description}</p>
              </div>

              <div className="p-5">
                {/* Environment targets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "💡 Light", value: s.light },
                    { label: "💧 Water", value: s.water },
                    { label: "🌡️ Temp", value: s.temp },
                    { label: "💨 Humidity", value: s.humidity },
                  ].map(e => (
                    <div key={e.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                      <div className="text-xs font-black text-gray-400 mb-1">{e.label}</div>
                      <div className="text-xs font-bold text-black leading-relaxed">{e.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">✅ Key Tasks This Stage</p>
                    <ul className="space-y-1.5">
                      {s.keyTasks.map(t => (
                        <li key={t} className="text-xs text-gray-600 flex items-start gap-1.5 leading-relaxed">
                          <span className="text-[#AAFF00] font-black mt-0.5 flex-shrink-0">✓</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">⚠️ Watch For</p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-xs text-amber-800 leading-relaxed">{s.watchFor}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">💊 Nutrients</p>
                      <p className="text-xs text-gray-600">{s.nutrients}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trichome harvest guide */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-black text-black mb-4">🔬 Reading Trichomes — Harvest Timing</h2>
          <p className="text-gray-600 text-sm mb-4">Use a jeweler's loupe (60–100×) or digital microscope to check trichomes on the calyxes — not the leaves. Leaf trichomes mature faster and give false readings.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {HARVEST_TRICHOMES.map(t => (
              <div key={t.stage} className={`rounded-xl p-4 border ${t.color.replace("text", "border").replace(/text-\w+-\d+/, "")} ${t.color}`}>
                <div className="font-black text-lg mb-2">{t.stage}</div>
                <div className="text-xs font-semibold mb-2">Looks like: {t.look}</div>
                <div className="text-xs leading-relaxed">{t.meaning}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed"><strong>Optimal harvest:</strong> 70–80% cloudy + 10–20% amber = peak potency with a balanced high. All cloudy = ceiling potency but more cerebral. Mostly amber = more sedating, body high.</p>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-black text-black mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How long does it take to grow cannabis?", a: "From seed to harvest: autoflowers take 8–12 weeks total. Photoperiod indicas: 14–18 weeks (4–8 veg + 7–9 flower). Photoperiod sativas: 18–28 weeks. Most indoor growers run 14–16 week cycles with photoperiod strains." },
              { q: "What's the best lighting schedule for cannabis?", a: "Vegetative: 18 hours on / 6 hours off (18/6). Flowering: 12 hours on / 12 hours off (12/12). The 12 hours of uninterrupted darkness triggers the plant to flower — any light leak can disrupt this. Autoflowers flower regardless of light schedule." },
              { q: "How do I know when cannabis is ready to harvest?", a: "Check trichomes with a 60–100× loupe. When 70–80% of trichomes on the calyxes (not leaves) are milky/cloudy, THC is at peak. Adding 10–20% amber trichomes shifts the high toward more relaxation. Don't just go by pistil color — trichomes are the reliable indicator." },
              { q: "Do I need nutrients to grow cannabis?", a: "In amended living soil: often no, or minimal. In coco coir, hydroponics, or depleted soil: yes, absolutely. Start at ¼ recommended dosage, increase slowly. Overfeeding (nutrient burn) is far more common than underfeeding." },
            ].map((f, i) => (
              <details key={i} className="border border-gray-100 rounded-xl overflow-hidden group">
                <summary className="px-5 py-4 font-bold text-sm text-black cursor-pointer hover:bg-gray-50 flex items-center justify-between list-none">
                  {f.q}<span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black text-black mb-4">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { href: "/learn/training", label: "Training Techniques", emoji: "✂️" },
              { href: "/learn/deficiencies", label: "Deficiency Guide", emoji: "🌿" },
              { href: "/learn/seeds/germination", label: "Germination Guide", emoji: "🫘" },
              { href: "/learn/seeds/types", label: "Seed Types (Auto vs Photo)", emoji: "🌾" },
              { href: "/learn/strains/grow-guide", label: "Strain-Specific Growing", emoji: "📋" },
              { href: "/strains", label: "Find Easy-to-Grow Strains", emoji: "🔍" },
            ].map(r => (
              <Link key={r.href} href={r.href} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-black hover:shadow-[3px_3px_0px_#000] transition-all text-sm font-bold text-black">
                <span className="text-xl">{r.emoji}</span>{r.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
