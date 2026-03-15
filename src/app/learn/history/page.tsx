import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis History & Culture — From Ancient Origins to Legalization | StrainHub",
  description: "10,000 years of cannabis history: ancient origins, colonial spread, prohibition, racial injustice, religious traditions, cultural movements, and the modern legalization era.",
  alternates: { canonical: "https://strainhub.vercel.app/learn/history" },
};

const TIMELINE = [
  { era: "~8000 BCE", event: "First cannabis cultivation evidence — Central Asia, fiber and food use" },
  { era: "~2700 BCE", event: "Shen Nung records medicinal uses — world's first cannabis pharmacology" },
  { era: "1500 BCE", event: "Vedic texts reference cannabis — spiritual and medicinal use in India" },
  { era: "1839", event: "O'Shaughnessy introduces cannabis to Western medicine" },
  { era: "1937", event: "Marihuana Tax Act effectively criminalizes cannabis in the US" },
  { era: "1964", event: "Raphael Mechoulam isolates and synthesizes THC" },
  { era: "1988", event: "Cannabinoid receptors (CB1) discovered — ECS paradigm begins" },
  { era: "1996", event: "California Proposition 215 — first medical legalization" },
  { era: "2012", event: "Colorado & Washington — first adult-use legalization" },
  { era: "2018", event: "FDA approves Epidiolex — first cannabis-derived medicine" },
  { era: "2024", event: "Germany legalizes adult use — largest EU market opens" },
];

const SECTIONS = [
  { slug: "origins", title: "Ancient Origins: 10,000 BCE to 1800s", desc: "Neolithic cultivation, Chinese pharmacopoeia, Indian Vedas, Scythian rituals, Islamic Golden Age pharmacology — cannabis before prohibition.", tags: ["History", "Cultural"], readTime: "18 min" },
  { slug: "colonial-spread", title: "Global Spread & Colonial Era", desc: "Silk Road diffusion, European hemp for naval industry, Spanish introduction to Americas, British colonial India, 19th century Western medicine.", tags: ["History", "Intermediate"], readTime: "14 min" },
  { slug: "prohibition", title: "Prohibition: The Real History", desc: "Harry Anslinger, 1937 Tax Act, Reefer Madness, Nixon's War on Drugs — the political, racial, and economic motivations behind criminalization.", tags: ["History", "Essential"], readTime: "16 min" },
  { slug: "social-justice", title: "Racial Justice & the Drug War", desc: "Disproportionate arrest data, sentencing disparities, community economic exclusion, expungement movements, and social equity licensing.", tags: ["Justice", "Essential"], readTime: "14 min" },
  { slug: "religious", title: "Religious & Spiritual Traditions", desc: "Hindu Shaivism, Sufi Islam, Rastafarianism, Scythian shamanism, Buddhist applications, and modern cannabis churches.", tags: ["Culture", "Intermediate"], readTime: "12 min" },
  { slug: "cultural-movements", title: "Cultural Movements & Creative Expression", desc: "Jazz era underground, Beat Generation, 1960s counterculture, reggae's global spread, hip-hop, stoner comedy, and wellness integration.", tags: ["Culture", "Intermediate"], readTime: "14 min" },
  { slug: "science-history", title: "Scientific & Medical History", desc: "O'Shaughnessy to Mechoulam to Epidiolex — the history of cannabis science, endocannabinoid system discovery, and clinical trial expansion.", tags: ["Science", "Expert"], readTime: "16 min" },
  { slug: "industry-evolution", title: "Industry & Economic Evolution", desc: "Black market structures, medical dispensary era, Colorado and Washington pioneering, VC waves, public markets, and federal legalization scenarios.", tags: ["Business", "Intermediate"], readTime: "12 min" },
];

export default function HistoryLearnPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">History & Culture</span>
        </div>
          {/* Hero Image */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learn/history.jpg"
              alt="Hero illustration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>📜 History & Culture</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">10,000 Years of<br />Cannabis History</h1>          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">From Neolithic hemp farms to modern dispensaries — the full story of humanity's oldest cultivated plant.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Timeline */}
        <section>
          <h2 className="text-lg font-black text-black mb-5">Key Milestones</h2>
          <div className="space-y-0">
            {TIMELINE.map((t, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0" />
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" style={{ minHeight: 20 }} />}
                </div>
                <div className="pb-4">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.era}</span>
                  <p className="text-sm text-gray-700 mt-0.5">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="space-y-3">
            {SECTIONS.map((s, i) => (
              <Link key={s.slug} href={`/learn/history/${s.slug}`}
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
