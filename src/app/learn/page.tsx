import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Learning Hub — Terpenes, Grow Guides & More",
  description: "Free cannabis education — terpene library, cannabinoid guide, week-by-week grow guide, deficiency diagnosis, and more. Always free.",
};

const topics = [
  { icon: "🧬", title: "Terpene Library", desc: "Myrcene, Limonene, Caryophyllene, Linalool and 15+ more. What each terpene does, which strains are richest, and how the entourage effect works.", href: "/learn/terpenes", tag: "20+ Terpenes", bg: "bg-lime-pale" },
  { icon: "🔬", title: "Cannabinoid Guide", desc: "THC, CBD, CBN, CBG, THCV, CBC — complete breakdown of every major cannabinoid, their effects, medical uses, and how they interact.", href: "/learn/cannabinoids", tag: "8 Cannabinoids", bg: "bg-indica-bg" },
  { icon: "🌱", title: "Week-by-Week Grow Guide", desc: "From germination to harvest — detailed 16-week guide covering lighting, nutrients, watering, training techniques, and curing.", href: "/learn/grow-guide", tag: "16-Week Guide", bg: "bg-sativa-bg" },
  { icon: "🍂", title: "Deficiency Diagnosis", desc: "Visual guide to nutrient deficiencies, pests, and environmental stress. Yellow leaves? Brown tips? Spots? Find out exactly why.", href: "/learn/deficiencies", tag: "Visual Guide", bg: "bg-amber-50" },
  { icon: "💊", title: "Medical Use Index", desc: "Strains reported to help with anxiety, depression, insomnia, pain, PTSD, nausea, appetite loss — organized by condition.", href: "/learn/medical", tag: "15+ Conditions", bg: "bg-red-50" },
  { icon: "🌍", title: "Landrace Strains", desc: "Afghani, Thai, Colombian Gold, Hindu Kush — the ancient landraces that gave birth to every modern cannabis strain.", href: "/learn/landraces", tag: "Origins", bg: "bg-blue-50" },
  { icon: "🌤️", title: "Indica vs Sativa", desc: "The full scientific truth — what the research actually says, why the distinction matters (and why some experts say it doesn't).", href: "/learn/indica-vs-sativa", tag: "Deep Dive", bg: "bg-hybrid-bg" },
  { icon: "✂️", title: "Training Techniques", desc: "LST, topping, FIMming, ScrOG, lollipopping — every major training method with step-by-step instructions and expected yield gains.", href: "/learn/training", tag: "Grow Skills", bg: "bg-lime-pale" },
  { icon: "🧪", title: "How THC Works", desc: "The endocannabinoid system explained — how THC and CBD interact with CB1 and CB2 receptors in your brain and body.", href: "/learn/how-thc-works", tag: "The Science", bg: "bg-indica-bg" },
];

export default function LearnPage() {
  return (
    <>
      <div className="bg-lime border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-black tracking-tight mb-4">📚 Learning Hub</h1>
          <p className="text-lg text-brand/70 max-w-lg mx-auto">
            Everything you need to know about cannabis — science, growing, effects, genetics. Always free, never gated.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t) => (
            <Link key={t.href} href={t.href} className={`${t.bg} border-2 border-black rounded-2xl p-6 shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-1 transition-all block`}>
              <div className="text-4xl mb-4">{t.icon}</div>
              <h2 className="text-lg font-black mb-2">{t.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{t.desc}</p>
              <span className="text-xs font-black bg-white border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">
                {t.tag} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
