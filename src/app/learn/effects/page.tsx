import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Effects & Pharmacology: Complete Guide | StrainHub Learn",
  description: "Deep dives into cannabinoid pharmacology, terpene science, therapeutic uses, drug interactions, and the long-term research on cannabis and the brain.",
};

const TOPICS = [
  { emoji: "🧠", title: "Cannabinoids: THC, CBD, CBG+", subtitle: "Complete pharmacology guide", href: "/learn/effects/cannabinoids", desc: "Every major cannabinoid, how it works, and what the research shows." },
  { emoji: "🌸", title: "Terpene Pharmacology", subtitle: "How terpenes shape your experience", href: "/learn/effects/terpenes", desc: "The mechanisms behind myrcene, limonene, caryophyllene, and more." },
  { emoji: "⚡", title: "The Entourage Effect", subtitle: "Why whole-plant works better", href: "/learn/effects/entourage-effect", desc: "The science of cannabinoid-terpene synergy — and why it matters." },
  { emoji: "💡", title: "Acute Effects on the Brain", subtitle: "What happens when you get high", href: "/learn/effects/acute-effects", desc: "CB1 receptors, dopamine, memory, time perception — the full picture." },
  { emoji: "📊", title: "Long-Term Effects & Research", subtitle: "What the science actually shows", href: "/learn/effects/long-term", desc: "Separating evidence from myth on long-term cannabis use." },
  { emoji: "🏥", title: "Medical Uses & Evidence", subtitle: "Conditions with clinical backing", href: "/learn/effects/medical", desc: "Pain, epilepsy, PTSD, nausea — what the clinical evidence says." },
  { emoji: "⚠️", title: "Drug Interactions Guide", subtitle: "Cannabis + medications", href: "/learn/effects/interactions", desc: "CYP enzyme metabolism, blood thinners, SSRIs, and what to avoid." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-black font-medium">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/learn" className="hover:text-black font-medium">Learn</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold">Effects & Pharmacology</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "#faf5ff", color: "#6d28d9" }}>
            🔬 Effects & Science
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Effects & Pharmacology</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">Deep dives into cannabinoid pharmacology, terpene science, therapeutic uses, drug interactions, and the long-term research on cannabis and the brain.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((t) => (
            <Link key={t.href} href={t.href}
              className="group bg-white border-2 border-gray-100 hover:border-black rounded-2xl p-6 transition-all hover:shadow-md flex flex-col gap-3">
              <div className="text-3xl">{t.emoji}</div>
              <div>
                <div className="font-black text-black text-base group-hover:underline">{t.title}</div>
                <div className="text-xs text-gray-400 font-semibold mt-0.5">{t.subtitle}</div>
              </div>
              <p className="text-sm text-gray-600 leading-snug flex-1">{t.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-black transition-colors mt-auto">
                Read guide
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/learn" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Learn Hub
          </Link>
        </div>
      </div>
    </div>
  );
}