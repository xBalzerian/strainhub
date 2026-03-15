import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marijuana Seeds Guide — Biology, Germination, Storage & Breeding | StrainHub",
  description: "Complete marijuana seeds guide: seed types (regular, feminized, auto), germination methods, long-term storage, breeding programs, and legal procurement.",
  alternates: { canonical: "https://strainhub.vercel.app/learn/seeds" },
};

const SECTIONS = [
  { slug: "types", title: "Seed Types: Regular, Feminized & Auto-Flowering", desc: "Biological differences, production methods, and which type suits your goals — breeding, commercial production, or home cultivation.", tags: ["Biology", "Beginner"], readTime: "10 min" },
  { slug: "selection", title: "Seed Selection & Procurement", desc: "Reading seed labels, evaluating seed banks, international shipping considerations, breeder vs. retailer trade-offs.", tags: ["Practical", "Beginner"], readTime: "8 min" },
  { slug: "germination", title: "Germination Science & Methods", desc: "Paper towel, direct soil, jiffy pellets, water soaking — optimal parameters, success rates, and troubleshooting common failures.", tags: ["Growing", "Beginner"], readTime: "12 min" },
  { slug: "storage", title: "Seed Storage & Longevity", desc: "Temperature, humidity, light, oxygen — how to store seeds for 1, 5, or 20+ years. Freezing protocols, desiccants, and viability testing.", tags: ["Practical", "Intermediate"], readTime: "9 min" },
  { slug: "breeding", title: "Breeding & Seed Production", desc: "Male selection, controlled pollination, genetic stabilization, backcrossing, F1 hybrid production, and marker-assisted selection.", tags: ["Advanced", "Expert"], readTime: "20 min" },
  { slug: "legal", title: "Legal & Regulatory Aspects", desc: "Farm Bill hemp provisions, interstate commerce, state home cultivation laws, IP protection, and international treaty implications.", tags: ["Legal", "Intermediate"], readTime: "10 min" },
];

export default function SeedsLearnPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">Seeds</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fffbeb", color: "#92400e" }}>🫘 Marijuana Seeds</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">Marijuana Seeds —<br />Complete Guide</h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">From seed biology and germination science to long-term storage, breeding programs, and legal procurement.</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>6 sections</span><span>·</span><span>~69 min total</span><span>·</span>
            <span className="font-semibold" style={{ color: "#92400e" }}>Beginner to Expert</span>
          </div>
          {/* Hero Image */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learn/seeds.jpg"
              alt="Hero illustration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-3">
          {SECTIONS.map((s, i) => (
            <Link key={s.slug} href={`/learn/seeds/${s.slug}`}
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
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-black flex items-center gap-2">← Back to Learning Hub</Link>
        </div>
      </div>
    </div>
  );
}
