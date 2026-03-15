import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Seeds: Complete Guide | StrainHub Learn",
  description: "Everything about cannabis seeds — types, germination, selection, storage, breeding, and legal status. Free expert guides.",
};

const TOPICS = [
  { emoji: "🌱", title: "Seed Types", subtitle: "Regular, Feminized & Autoflowering", href: "/learn/seeds/types", desc: "The differences that change everything about your grow." },
  { emoji: "💧", title: "Germination Guide", subtitle: "Paper Towel, Direct Soil & More", href: "/learn/seeds/germination", desc: "Step-by-step methods with success rates and troubleshooting." },
  { emoji: "🎯", title: "Seed Selection", subtitle: "Choosing the Right Strain", href: "/learn/seeds/selection", desc: "Match seeds to your environment, skill level, and goals." },
  { emoji: "❄️", title: "Storage Guide", subtitle: "Keep Seeds Viable for Years", href: "/learn/seeds/storage", desc: "The four enemies of seed viability and how to beat them." },
  { emoji: "🧬", title: "Breeding Fundamentals", subtitle: "F1, F2, Backcross & Beyond", href: "/learn/seeds/breeding", desc: "How breeders create stable, consistent genetics." },
  { emoji: "⚖️", title: "Seed Legality", subtitle: "What You Can and Cannot Do", href: "/learn/seeds/legal", desc: "US state laws, online seed banks, and the gray areas." },
];

export default function SeedsLearnPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-black font-medium">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/learn" className="hover:text-black font-medium">Learn</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-semibold">Seeds</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "#fffbeb", color: "#92400e" }}>
            🫘 Seeds
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Cannabis Seeds</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">From choosing the right seed type to long-term genetic preservation — everything you need to know about cannabis seeds, covered in depth.</p>
        </div>
      </div>

      {/* Topics grid */}
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
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
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
