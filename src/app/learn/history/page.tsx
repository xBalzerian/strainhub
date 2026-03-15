import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis History & Culture: Complete Guide | StrainHub Learn",
  description: "10,000 years of cannabis — from ancient Chinese medicine to modern legalization movements, the complete story of how this plant shaped human civilization.",
};

const TOPICS = [
  { emoji: "🏺", title: "Ancient Origins", subtitle: "10,000 BCE to 1500 CE", href: "/learn/history/origins", desc: "Cannabis in China, India, Scythia — the oldest plant-human relationship." },
  { emoji: "🙏", title: "Religious & Ritual Use", subtitle: "Bhang, hashish, and sacred cannabis", href: "/learn/history/religious", desc: "Hinduism, Rastafari, Sufism — the spiritual dimension of cannabis." },
  { emoji: "⛵", title: "Colonial Spread", subtitle: "How hemp circled the globe", href: "/learn/history/colonial-spread", desc: "From Manila rope to American hemp mandates — the colonial cannabis story." },
  { emoji: "🚫", title: "Prohibition History", subtitle: "The real story of how it became illegal", href: "/learn/history/prohibition", desc: "Harry Anslinger, Reefer Madness, and the racist roots of prohibition." },
  { emoji: "✌️", title: "Cultural Movements", subtitle: "Beat, Hippie, Reggae & Beyond", href: "/learn/history/cultural-movements", desc: "How cannabis shaped art, music, and counterculture globally." },
  { emoji: "✊", title: "Social Justice & the Drug War", subtitle: "Who paid the price", href: "/learn/history/social-justice", desc: "Mass incarceration, racial disparities, and the ongoing fight for equity." },
  { emoji: "🔭", title: "Science History", subtitle: "From CBD discovery to the ECS", href: "/learn/history/science-history", desc: "Mechoulam, the endocannabinoid system, and 70 years of research." },
  { emoji: "💼", title: "The Modern Industry", subtitle: "From illegal to billion-dollar", href: "/learn/history/industry-evolution", desc: "Colorado 2012 to a $50B global market — how legalization unfolded." },
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
          <span className="text-gray-700 font-semibold">Cannabis History & Culture</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5" style={{ background: "#fff1f2", color: "#be123c" }}>
            📜 History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Cannabis History & Culture</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">10,000 years of cannabis — from ancient Chinese medicine to modern legalization movements, the complete story of how this plant shaped human civilization.</p>
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