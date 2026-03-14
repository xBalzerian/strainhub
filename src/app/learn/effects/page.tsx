import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Effects & Pharmacology — Complete Science Guide | StrainHub",
  description: "Deep dive into cannabis pharmacology: cannabinoid mechanisms, terpene science, acute psychoactive effects, therapeutic applications, long-term health, and drug interactions.",
  alternates: { canonical: "https://strainhub.vercel.app/learn/effects" },
};

const SECTIONS = [
  { slug: "cannabinoids", title: "Cannabinoid Pharmacology", desc: "THC, CBD, CBG, CBN, THCV, CBC — receptor binding mechanisms, signaling pathways, and therapeutic applications of every major cannabinoid.", tags: ["Science", "Expert"], readTime: "18 min" },
  { slug: "terpenes", title: "Terpene Pharmacology Library", desc: "20+ terpenes — myrcene, limonene, caryophyllene, linalool, pinene and beyond. Mechanisms, effects, boiling points, and representative strains.", tags: ["Science", "Intermediate"], readTime: "22 min" },
  { slug: "acute-effects", title: "Acute Psychoactive Effects", desc: "Euphoria, time perception, sensory enhancement, creativity, anxiety, memory — complete dose-response analysis of cannabis's immediate psychological effects.", tags: ["Effects", "Intermediate"], readTime: "14 min" },
  { slug: "medical", title: "Therapeutic & Medicinal Applications", desc: "Evidence-graded review of cannabis in chronic pain, neuropathy, MS, epilepsy, cancer, PTSD, anxiety, and other conditions.", tags: ["Medical", "Expert"], readTime: "25 min" },
  { slug: "long-term", title: "Long-Term Health Considerations", desc: "Tolerance, dependence, respiratory effects, cardiovascular impact, adolescent development, psychosis risk, and reproductive considerations.", tags: ["Health", "Intermediate"], readTime: "16 min" },
  { slug: "interactions", title: "Drug Interactions & Contraindications", desc: "CYP450 enzyme inhibition, warfarin, opioids, benzodiazepines, antidepressants, seizure medications — what you need to know before combining.", tags: ["Medical", "Expert"], readTime: "12 min" },
  { slug: "entourage-effect", title: "The Entourage Effect Explained", desc: "How cannabinoids and terpenes work together to produce effects greater than the sum of their parts — the science, the evidence, and the debate.", tags: ["Science", "Intermediate"], readTime: "10 min" },
];

export default function EffectsLearnPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">Effects & Pharmacology</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#faf5ff", color: "#6d28d9" }}>🔬 Effects & Pharmacology</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">Cannabis Science &<br />Pharmacology</h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">The biology behind the experience — from receptor binding to therapeutic applications, long-term health, and drug interactions.</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>7 sections</span><span>·</span><span>~117 min total</span><span>·</span>
            <span className="font-semibold" style={{ color: "#6d28d9" }}>Science-backed</span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-3">
          {SECTIONS.map((s, i) => (
            <Link key={s.slug} href={`/learn/effects/${s.slug}`}
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
