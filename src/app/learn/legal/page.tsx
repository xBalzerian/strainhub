import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Legal Guide — US Federal, State & International Laws | StrainHub",
  description: "Complete cannabis legal guide: US federal law, all 50 states, international frameworks, industry regulation, consumer rights. Updated monthly with current legal status.",
  alternates: { canonical: "https://strainhub.vercel.app/learn/legal" },
};

const US_STATUS = [
  { category: "Adult-Use Legal", count: "24+ states", color: "#16a34a", bg: "#f0fdf4", examples: "CA, CO, WA, IL, MI, NY, NJ, MN, MD" },
  { category: "Medical Only", count: "~13 states", color: "#0369a1", bg: "#f0f9ff", examples: "FL, PA, TX (limited), GA, LA" },
  { category: "Decriminalized", count: "~6 states", color: "#b45309", bg: "#fffbeb", examples: "NC, NE, and municipalities" },
  { category: "Prohibited", count: "~7 states", color: "#be123c", bg: "#fff1f2", examples: "ID, WY, KS, SC, TN" },
];

const SECTIONS = [
  { slug: "federal", title: "US Federal Law & CSA Scheduling", desc: "Controlled Substances Act Schedule I classification, DEA enforcement, FDA authority, banking restrictions, and 280E tax code — the federal framework that still governs everything.", tags: ["Federal", "Essential"], readTime: "14 min" },
  { slug: "states", title: "State-by-State Legal Guide", desc: "All 50 states — adult-use programs, medical requirements, decriminalization laws, home cultivation rights, possession limits, and pending legislation.", tags: ["State Law", "Essential"], readTime: "20 min" },
  { slug: "international", title: "International Cannabis Laws", desc: "Canada, Uruguay, Germany, Netherlands, Spain, Israel, Thailand, Australia — the world's major cannabis frameworks compared.", tags: ["International", "Intermediate"], readTime: "16 min" },
  { slug: "industry", title: "Industry & Commercial Regulation", desc: "Licensing types, seed-to-sale tracking (Metrc), product testing requirements, packaging rules, advertising restrictions, and banking access.", tags: ["Business", "Advanced"], readTime: "12 min" },
  { slug: "consumer-rights", title: "Consumer Rights & Responsibilities", desc: "Possession limits, DUI standards, employment drug testing, housing restrictions, firearm ownership, travel, medical privacy, and record expungement.", tags: ["Consumer", "Essential"], readTime: "14 min" },
];

export default function LegalLearnPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">Legal</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff7ed", color: "#b45309" }}>⚖️ Legal & Regulatory</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">Cannabis Law —<br />Complete Guide</h1>          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-4">Federal law, all 50 states, international frameworks, and your rights as a consumer or business. Updated monthly.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 font-medium max-w-xl">
            ⚠️ This is educational information only — not legal advice. Laws change frequently. Consult an attorney for specific situations.
          </div>
          {/* Hero Image */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learn/legal.jpg"
              alt="Hero illustration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* US Status Overview */}
        <section>
          <h2 className="text-lg font-black text-black mb-4">US Legal Status Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {US_STATUS.map(s => (
              <div key={s.category} className="rounded-xl p-4 border" style={{ background: s.bg, borderColor: s.color + "40" }}>
                <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.count}</div>
                <div className="text-xs font-bold text-black mb-1">{s.category}</div>
                <div className="text-xs text-gray-500">{s.examples}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="space-y-3">
            {SECTIONS.map((s, i) => (
              <Link key={s.slug} href={`/learn/legal/${s.slug}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-5 hover:border-black hover:shadow-[3px_3px_0px_#000] transition-all group block">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400 flex-shrink-0 mt-0.5">{String(i+1).padStart(2,"0")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="font-black text-base text-black group-hover:underline">{s.title}</h2>
                    <span className="text-xs text-gray-400 flex-shrink-0">{s.readTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {s.tags.map(t => <span key={t} className="text-xs font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <div className="pt-4 border-t border-gray-200">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-black flex items-center gap-2">← Back to Learning Hub</Link>
        </div>
      </div>
    </div>
  );
}
