import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Strains: Complete Guide | StrainHub Learn",
  description: "The science of strain differences — genetics, terpene profiles, cultivation traits, geographic origins, and how to choose the right strain for any goal.",
};

const TOPICS = [
  { emoji: "🧬", title: "Indica vs. Sativa: The Science", subtitle: "What genetics actually say", href: "/learn/strains/indica-vs-sativa", desc: "The real science behind the most debated topic in cannabis." },
  { emoji: "🧪", title: "Cannabinoid Profiles", subtitle: "Reading a lab report", href: "/learn/strains/cannabinoid-profiles", desc: "THC, CBD, CBG, CBN — what the numbers mean and how to use them." },
  { emoji: "🌸", title: "Terpene Profiles & Effects", subtitle: "8 major terpenes explained", href: "/learn/strains/terpene-categories", desc: "The aromatic compounds that drive your experience more than THC." },
  { emoji: "⚡", title: "Why Strains Feel Different", subtitle: "The science of effect variation", href: "/learn/strains/effects", desc: "Same THC, completely different high — here is why." },
  { emoji: "🗺️", title: "Geographic Origins", subtitle: "Landrace strains of the world", href: "/learn/strains/geographic-origins", desc: "Hindu Kush, Thai, Durban, Colombian — the genetic roots of modern cannabis." },
  { emoji: "🌱", title: "Cultivation Traits", subtitle: "Flowering, yield, height, difficulty", href: "/learn/strains/cultivation-traits", desc: "How to read grow data and what each metric means for your space." },
  { emoji: "📋", title: "Using Strain Grow Data", subtitle: "Planning your grow with strain data", href: "/learn/strains/grow-guide", desc: "From seed selection to harvest window — how to use StrainHub profiles." },
  { emoji: "💊", title: "Strains for Medical Use", subtitle: "Condition-by-condition guide", href: "/learn/strains/medical-strains", desc: "Evidence-informed recommendations for pain, sleep, anxiety, PTSD, and more." },
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
          <span className="text-gray-700 font-semibold">Cannabis Strains</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "#f0fdf4", color: "#166534" }}>
            🌿 Strains
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Cannabis Strains</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">The science of strain differences — genetics, terpene profiles, cultivation traits, geographic origins, and how to choose the right strain for any goal.</p>
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