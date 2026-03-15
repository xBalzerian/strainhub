import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consumption Methods: Complete Guide | StrainHub Learn",
  description: "Every method compared — bioavailability, onset time, health impact, and practical guidance so you can make the best choice for your situation.",
};

const TOPICS = [
  { emoji: "🔥", title: "Inhalation: Smoking & Vaporizing", subtitle: "The most common methods compared", href: "/learn/consumption/inhalation", desc: "Health differences, bioavailability, and best practices for inhalation." },
  { emoji: "🍫", title: "Edibles: Onset, Dosing & Science", subtitle: "Why edibles hit different", href: "/learn/consumption/edibles", desc: "First-pass metabolism, the 11-OH-THC effect, and how to dose safely." },
  { emoji: "🧴", title: "Topicals & Transdermal", subtitle: "Creams, balms and patches", href: "/learn/consumption/topicals", desc: "When they work, when they don not, and the topical vs. transdermal difference." },
  { emoji: "📊", title: "Bioavailability Comparison", subtitle: "How much actually reaches your blood", href: "/learn/consumption/bioavailability", desc: "Smoking to patches — the full absorption data behind each method." },
  { emoji: "🎯", title: "Choosing the Right Method", subtitle: "By goal, health, and lifestyle", href: "/learn/consumption/method-selection", desc: "A practical decision framework based on what you actually need." },
  { emoji: "🚀", title: "Emerging Methods", subtitle: "Beverages, MDIs, nasal sprays", href: "/learn/consumption/emerging", desc: "Cannabis delivery technology — what exists now and what is coming." },
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
          <span className="text-gray-700 font-semibold">Consumption Methods</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "#f0f9ff", color: "#0369a1" }}>
            💨 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Consumption Methods</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">Every method compared — bioavailability, onset time, health impact, and practical guidance so you can make the best choice for your situation.</p>
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