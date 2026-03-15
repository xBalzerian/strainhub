import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cannabis Training Techniques — LST, Topping, SCROG, SOG & More | StrainHub",
  description: "Complete guide to cannabis plant training techniques: LST, topping, FIMming, SCROG, SOG, mainlining, and supercropping. Increase yields and control plant shape.",
  keywords: "cannabis training, LST low stress training, topping cannabis, SCROG setup, SOG technique, mainlining cannabis, supercropping",
  alternates: { canonical: "https://strainhub.org/learn/training" },
  openGraph: {
    title: "Cannabis Training Techniques Guide | StrainHub",
    description: "Every training method explained: LST, topping, SCROG, SOG, mainlining, and more.",
    url: "https://strainhub.org/learn/training",
    type: "article",
  },
};

const TECHNIQUES = [
  {
    name: "LST — Low Stress Training",
    emoji: "🪢",
    difficulty: "Beginner",
    stress: "Low",
    bestFor: "Indoor, any strain, autoflowers",
    timeAdded: "0–1 week",
    yieldGain: "+20–40%",
    summary: "Bend and tie down branches to create a flat, wide canopy. No cutting required. Exposes more bud sites to light.",
    howTo: [
      "Start when plant is 20–30cm tall with 4–6 nodes",
      "Gently bend the main stem toward the edge of the pot",
      "Secure with soft wire, zip ties, or plant clips to the pot rim",
      "As new growth reaches up, bend and tie it outward too",
      "Continue throughout veg until canopy is flat and even",
      "Remove ties at flowering start — plant holds shape naturally",
    ],
    pros: ["Works on autoflowers (low stress = no lost time)", "No recovery period needed", "Dramatically improves light penetration", "Easy for beginners"],
    cons: ["Requires daily attention during veg", "Less dramatic than topping for yield gain", "Needs more horizontal space"],
    tip: "Use soft garden wire or pipe cleaners — never string that cuts into stems.",
    color: "#f0fdf4", border: "#86efac",
  },
  {
    name: "Topping",
    emoji: "✂️",
    difficulty: "Intermediate",
    stress: "Medium",
    bestFor: "Photoperiod strains, indoor/outdoor",
    timeAdded: "1–2 weeks recovery",
    yieldGain: "+30–50%",
    summary: "Cut the main growing tip to create two main colas instead of one. Repeat multiple times for a multi-top bush with even canopy.",
    howTo: [
      "Wait until plant has 5–6 nodes (30–45cm tall)",
      "Use sterile scissors or a razor blade",
      "Cut the main stem just above the 5th node",
      "Two new main shoots will grow from the remaining nodes",
      "Allow 1–2 weeks recovery before topping again",
      "Can top 2–4 times for 4, 8, or 16 main colas",
    ],
    pros: ["Creates multiple main colas of equal size", "Easy to learn", "Works beautifully with SCROG"],
    cons: ["Not suitable for autoflowers (uses recovery time)", "Risk of infection if scissors aren't sterile", "Delays flowering slightly"],
    tip: "Always sterilize your cutting tool with isopropyl alcohol. A clean cut heals 10x faster than a torn stem.",
    color: "#fef9c3", border: "#fde047",
  },
  {
    name: "FIMming",
    emoji: "🤌",
    difficulty: "Intermediate",
    stress: "Medium",
    bestFor: "Photoperiod strains, growers who want more tops faster",
    timeAdded: "1 week recovery",
    yieldGain: "+30–60%",
    summary: "FIM = 'F*** I Missed.' Pinch or cut only 75% of the main growing tip — instead of 2 new tops like topping, you get 3–4 new tops from one cut.",
    howTo: [
      "Identify the newest emerging growth tip",
      "Pinch or cut the top 75% of the new growth (not the full node)",
      "Leave 25% of the new shoot intact",
      "3–4 new main colas will emerge within 7–10 days",
      "Can be combined with LST for maximum coverage",
    ],
    pros: ["Creates more tops per cut than topping (3–4 vs 2)", "Slightly less stress than topping", "Less precise cutting angle required"],
    cons: ["Less predictable than topping", "Requires accurate 75% removal", "Still not ideal for autoflowers"],
    tip: "FIMming is actually easier than topping — you don't need a clean precise cut. Just pinch off about 3/4 of the new growth.",
    color: "#fff7ed", border: "#fdba74",
  },
  {
    name: "SCROG — Screen of Green",
    emoji: "🕸️",
    difficulty: "Intermediate",
    stress: "Low",
    bestFor: "Indoor, limited plant count, maximizing canopy",
    timeAdded: "2–4 weeks setup",
    yieldGain: "+40–100%",
    summary: "Stretch a horizontal screen (net/trellis) above your plants. Weave branches through it as they grow to create a perfectly even canopy that maximizes every inch of your grow space.",
    howTo: [
      "Install a mesh screen 20–30cm above pot tops",
      "Let plants grow through the screen naturally at first",
      "Once branches emerge 10cm above screen, weave them back through horizontally",
      "Fill every square of the screen with an even branch",
      "Flip to flower when screen is 70–80% full",
      "Remove any growth below the screen (lollipopping) for airflow",
    ],
    pros: ["Maximizes every watt of light across the canopy", "Perfect for 1–4 plant legal limits", "Creates enormous flat colas", "Best technique for indoor efficiency"],
    cons: ["Requires permanent screen setup", "Hard to move plants once trained", "Takes longer in veg to fill screen"],
    tip: "Use nylon string mesh or a garden trellis net. 5cm × 5cm holes are ideal. Build it removable for harvest.",
    color: "#eff6ff", border: "#93c5fd",
  },
  {
    name: "SOG — Sea of Green",
    emoji: "🌊",
    difficulty: "Beginner–Intermediate",
    stress: "None",
    bestFor: "Fast turnover, many small plants, clones",
    timeAdded: "None (shorter overall cycle)",
    yieldGain: "+30–50% per cycle (faster cycles = more annual yield)",
    summary: "Pack many small plants together and flip to flower very early — each plant produces one main cola. Speed over size. Multiple quick harvests per year beats fewer big harvests.",
    howTo: [
      "Start many small plants or clones simultaneously",
      "Use small pots (1–3 gallon) densely packed",
      "Flip to 12/12 light schedule when plants are only 20–30cm tall",
      "Each plant produces one large central cola",
      "Harvest all at once, then restart immediately",
      "Lollipop lower growth to improve airflow and focus energy upward",
    ],
    pros: ["Fastest path to harvest", "Ideal for clone-based operations", "Simple execution", "Maximizes annual harvest cycles"],
    cons: ["Requires many plants (may conflict with legal limits)", "Less yield per plant", "Dense canopy needs good airflow to prevent mold"],
    tip: "SOG works best with fast-flowering indica strains. Clone identical genetics for uniform harvest timing.",
    color: "#f0fdf4", border: "#6ee7b7",
  },
  {
    name: "Mainlining",
    emoji: "🔱",
    difficulty: "Advanced",
    stress: "High",
    bestFor: "Photoperiod strains, growers wanting uniform colas",
    timeAdded: "3–4 weeks",
    yieldGain: "+40–80%",
    summary: "Create a symmetrical plant with an equal number of main colas (typically 8 or 16) all receiving identical energy from the root system. Most time-intensive technique but produces the most uniform harvest.",
    howTo: [
      "Top at the 3rd node — remove everything below node 3",
      "Tie down both new tops horizontally (180° apart)",
      "Let 4 new shoots develop, top each one above node 3 again",
      "You now have 4 main branches — top again for 8, or again for 16",
      "Keep all branches at same height with LST throughout",
      "All colas receive equal light and equal energy",
    ],
    pros: ["Most uniform colas of any technique (consistent size at harvest)", "Maximizes each branch's potential equally", "Visually impressive, highly organized"],
    cons: ["Most time-consuming technique", "Multiple high-stress events = longest veg time", "Mistakes are hard to correct mid-way"],
    tip: "Think of mainlining as building a perfect binary tree. Each top doubles your main colas: 1 → 2 → 4 → 8 → 16.",
    color: "#fdf4ff", border: "#d8b4fe",
  },
  {
    name: "Supercropping",
    emoji: "💪",
    difficulty: "Intermediate–Advanced",
    stress: "High",
    bestFor: "Photoperiod strains, tall sativas, outdoor",
    timeAdded: "5–7 days recovery",
    yieldGain: "+20–35%",
    summary: "Squeeze and bend a branch until the inner fibers collapse — but the outer skin stays intact. The plant heals by forming a knuckle that becomes stronger than before and increases resin production near the stress point.",
    howTo: [
      "Identify a branch you want to bend (2–4 weeks into veg)",
      "Squeeze the stem firmly between thumb and forefinger for 10–15 seconds",
      "Gently bend the softened stem to a 90° angle",
      "Support if needed — it will heal within 5–7 days",
      "The healed 'knuckle' sends stress signals that boost resin",
      "Works well on tall sativa branches to bring them level with others",
    ],
    pros: ["Doesn't require cutting", "Tames tall sativa branches without losing the top", "The stress response increases resin near the knuckle", "Great for outdoor height control"],
    cons: ["Easy to snap branch completely if done wrong", "Higher stress = longer recovery", "Not for autoflowers"],
    tip: "If the branch snaps fully, tape it back together with electrical tape. Cannabis heals remarkably well — 70% of snapped branches recover fully.",
    color: "#fef2f2", border: "#fca5a5",
  },
  {
    name: "Lollipopping",
    emoji: "🍭",
    difficulty: "Beginner–Intermediate",
    stress: "Low–Medium",
    bestFor: "All indoor grows, improving airflow and yield quality",
    timeAdded: "0–3 days recovery",
    yieldGain: "Quality increase + top cola size +20–30%",
    summary: "Remove all lower growth (small branches, popcorn buds) that won't receive enough light to produce quality buds. Redirects all plant energy to top-quality colas.",
    howTo: [
      "At flip to flower (or 1 week into flower)",
      "Remove all branches in the bottom 1/3 of the plant",
      "Remove any tiny 'popcorn' bud sites that won't develop fully",
      "Leave only the main branches with clear light access",
      "The plant looks like a lollipop — bare stem with bushy top",
      "Dramatically improves airflow, reducing mold risk",
    ],
    pros: ["Simple, fast, low-risk", "Reduces mold risk by improving airflow", "Energy redirect improves top cola density and size", "Works with any other technique"],
    cons: ["Reduces total bud count (but improves quality per bud)", "Can be overdone — don't remove too much of the plant"],
    tip: "Combine with SCROG or topping for maximum effect. Lollipopping alone on an untrained plant has limited yield benefit.",
    color: "#fdf5f0", border: "#fed7aa",
  },
];

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6]">
      <nav className="border-b border-gray-200 bg-white" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">Training Techniques</span>
        </div>
      </nav>

      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#14532d" }}>✂️ Grow Techniques</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">Cannabis Training<br />Techniques</h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">LST, topping, FIMming, SCROG, SOG, mainlining, supercropping — every training method explained with step-by-step instructions, yield gains, and difficulty ratings.</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>8 techniques</span><span>·</span><span>~35 min read</span><span>·</span>
            <span className="font-semibold text-green-700">Beginner to Advanced</span>
          </div>
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img src="/images/learn/grow-guide.jpg" alt="Cannabis training techniques illustration" className="w-full h-56 md:h-72 object-cover" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        <div className="bg-[#AAFF00] border-2 border-black rounded-2xl p-6">
          <p className="text-xs font-black uppercase tracking-widest mb-2">⚡ Why Train?</p>
          <p className="text-base font-semibold text-black leading-relaxed">Untrained cannabis grows as a Christmas tree — one dominant central cola surrounded by small, shaded branches. Training breaks that pattern, creating a flat, even canopy where every bud site gets equal light. The result: <strong>20–100% more yield from the same light and space</strong>.</p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-black text-black">Quick Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Technique", "Difficulty", "Stress", "Yield Gain", "Works on Autos?"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-black text-xs uppercase tracking-wide text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TECHNIQUES.map(t => (
                  <tr key={t.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <a href={`#${t.name.split("—")[0].trim().toLowerCase().replace(/\s+/g, "-")}`} className="font-bold hover:underline">{t.emoji} {t.name.split("—")[0].trim()}</a>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        t.difficulty.includes("Beginner") ? "bg-green-100 text-green-700" :
                        t.difficulty.includes("Advanced") ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>{t.difficulty}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{t.stress}</td>
                    <td className="px-4 py-3 font-bold text-green-700">{t.yieldGain}</td>
                    <td className="px-4 py-3 text-gray-600">{t.stress === "Low" || t.stress === "None" ? "✅ Yes" : t.name.includes("LST") ? "✅ Yes" : "❌ No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technique Cards */}
        <div className="space-y-8">
          {TECHNIQUES.map(t => (
            <div key={t.name} id={t.name.split("—")[0].trim().toLowerCase().replace(/\s+/g, "-")}
              className="bg-white border-2 rounded-2xl overflow-hidden"
              style={{ borderColor: t.border }}>
              <div className="p-5 border-b" style={{ background: t.color, borderColor: t.border }}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{t.emoji}</span>
                    <div>
                      <h2 className="font-black text-xl text-black">{t.name}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                          t.difficulty.includes("Beginner") ? "bg-green-100 text-green-700 border-green-200" :
                          t.difficulty.includes("Advanced") ? "bg-red-100 text-red-700 border-red-200" :
                          "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}>{t.difficulty}</span>
                        <span className="text-xs text-gray-500">Stress: {t.stress}</span>
                        <span className="text-xs font-bold text-green-700">{t.yieldGain} yield</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-xs text-gray-500">Best for</div>
                    <div className="font-bold text-xs text-black">{t.bestFor}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">{t.summary}</p>
              </div>

              <div className="p-5 grid md:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">📋 Step by Step</p>
                  <ol className="space-y-2">
                    {t.howTo.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-black">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">✅ Pros</p>
                    <ul className="space-y-1">
                      {t.pros.map(p => <li key={p} className="text-sm text-gray-600 flex items-start gap-1.5"><span className="text-green-500 mt-0.5">+</span>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">⚠️ Cons</p>
                    <ul className="space-y-1">
                      {t.cons.map(c => <li key={c} className="text-sm text-gray-600 flex items-start gap-1.5"><span className="text-red-400 mt-0.5">−</span>{c}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#AAFF00] bg-opacity-20 border border-[#AAFF00] rounded-xl p-3">
                    <p className="text-xs font-black text-gray-700 mb-1">💡 Pro Tip</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-black text-black mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Can you train autoflowering cannabis?", a: "Yes, but only with low-stress techniques (LST, lollipopping). Autoflowers run on a fixed genetic timer — any technique that requires recovery time (topping, FIMming, mainlining) can significantly reduce your final yield. LST from week 2–3 is the most effective approach for autos." },
              { q: "When should I start training my cannabis plant?", a: "For LST: as soon as the plant has 4–5 nodes (usually week 3–4 of veg). For topping: after the 5th node is established. For SCROG: set up the screen in veg, and flip to flower when the screen is 70–80% full." },
              { q: "Which training technique gives the most yield?", a: "SCROG combined with topping typically produces the highest yields per light by maximizing canopy coverage. Mainlining produces the most uniform, predictable results. For beginners, LST alone adds 20–40% yield with zero risk." },
              { q: "Can I combine multiple training techniques?", a: "Absolutely — the most experienced growers combine techniques. Common combinations: Topping + LST + Lollipopping, or Mainlining + SCROG. Start simple (LST only) for your first few grows before combining methods." },
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
              { href: "/learn/grow-guide", label: "Week-by-Week Grow Guide", emoji: "📅" },
              { href: "/learn/deficiencies", label: "Deficiency Guide", emoji: "🌿" },
              { href: "/learn/strains/grow-guide", label: "Strain Grow Tips", emoji: "🌱" },
              { href: "/learn/seeds/germination", label: "Germination Guide", emoji: "🫘" },
              { href: "/learn/seeds/types", label: "Seed Types", emoji: "🌾" },
              { href: "/strains", label: "Browse Strains", emoji: "🔍" },
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
