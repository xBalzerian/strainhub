import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marijuana Strains Guide — Taxonomy, Genetics & Effects | StrainHub",
  description: "Complete marijuana strain education: indica vs sativa science, terpene-driven categories, cannabinoid profiles, effect classifications, cultivation traits, and geographic origins.",
  alternates: { canonical: "https://www.strainhub.org/learn/strains" },
  openGraph: { title: "Marijuana Strains Guide", description: "Comprehensive strain education covering taxonomy, genetics, effects, and cultivation.", url: "https://www.strainhub.org/learn/strains" },
};

const SECTIONS = [
  {
    slug: "indica-vs-sativa",
    title: "Indica vs. Sativa: The Science Beyond the Labels",
    desc: "Why the classic classification persists despite genomic evidence showing it doesn't predict effects. What actually determines your experience.",
    tags: ["Taxonomy", "Beginner"],
    readTime: "8 min",
    keyPoints: ["Botanical origins vs. effect prediction", "Chemotype vs. phenotype", "What genomics actually shows"],
  },
  {
    slug: "terpene-categories",
    title: "Terpene-Driven Strain Categories",
    desc: "Myrcene sedation, limonene uplift, caryophyllene anti-inflammation — selecting strains by terpene profile rather than name.",
    tags: ["Terpenes", "Intermediate"],
    readTime: "12 min",
    keyPoints: ["8 dominant terpene categories", "Representative strains per terpene", "Multi-terpene synergy"],
  },
  {
    slug: "cannabinoid-profiles",
    title: "Cannabinoid Profiles: High-THC to CBD-Dominant",
    desc: "THC, CBD, CBG, CBN, THCV strains — understanding cannabinoid ratios and selecting for therapeutic targets.",
    tags: ["Cannabinoids", "Intermediate"],
    readTime: "10 min",
    keyPoints: ["25%+ THC varieties", "1:1 THC:CBD ratios", "THCV and CBG-rich strains"],
  },
  {
    slug: "effects",
    title: "Effect-Based Strain Classification",
    desc: "Sleep, pain, anxiety, focus, creativity, energy — matching strains to specific desired outcomes using mechanism-based selection.",
    tags: ["Effects", "Beginner"],
    readTime: "15 min",
    keyPoints: ["10 primary effect categories", "Mechanism-based selection", "Dosage considerations"],
  },
  {
    slug: "medical-strains",
    title: "Medical Condition Targeting",
    desc: "Evidence-graded strain recommendations for epilepsy, MS, cancer, PTSD, fibromyalgia, and 10+ other conditions.",
    tags: ["Medical", "Expert"],
    readTime: "20 min",
    keyPoints: ["Evidence quality grading", "FDA-approved cannabinoid medicines", "Drug interaction alerts"],
  },
  {
    slug: "cultivation-traits",
    title: "Cultivation Characteristics Guide",
    desc: "Beginner-friendly, high-yield, compact, mold-resistant, autoflowering — matching strain to growing environment and skill level.",
    tags: ["Growing", "Beginner"],
    readTime: "12 min",
    keyPoints: ["Grow difficulty ratings", "Indoor vs. outdoor suitability", "Flowering time comparison"],
  },
  {
    slug: "geographic-origins",
    title: "Regional & Geographic Origins",
    desc: "Afghan Kush to Thai Sativa to California exotics — how geography shaped cannabis genetics over millennia.",
    tags: ["History", "Intermediate"],
    readTime: "14 min",
    keyPoints: ["10 major genetic regions", "Landrace preservation", "Modern breeding centers"],
  },
];

const QUICK_FACTS = [
  { q: "How many cannabis strains exist?", a: "Estimates range from 700 to over 10,000 named varieties, though many share similar genetics under different names. Genetic analysis suggests significantly fewer truly distinct chemotypes." },
  { q: "Does indica vs sativa predict effects?", a: "Not reliably. Modern research shows cannabinoid and terpene profiles are far better predictors of effects than the indica/sativa classification, which primarily describes morphology." },
  { q: "What makes a strain 'high-THC'?", a: "Commercial 'high-THC' strains typically test at 25–35% THC by dry weight. However, lab testing methodologies vary, and total cannabinoid percentage doesn't directly translate to subjective potency." },
];

export default function StrainsLearnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: QUICK_FACTS.map(({ q, a }) => ({
          "@type": "Question", name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      })}} />

      <div className="min-h-screen bg-[#F8F8F0]">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-black">Learn</Link>
            <span>/</span>
            <span className="text-black font-semibold">Strains</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white border-b-2 border-black">
          <div className="max-w-4xl mx-auto px-6 py-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#16a34a" }}>
              🌿 Marijuana Strains
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">
              Everything About<br />Cannabis Strains
            </h1>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">
              From ancient landrace genetics to modern designer hybrids — understand taxonomy, chemotypes, effects, and how to select the right strain for any goal.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>7 sections</span>
              <span>·</span>
              <span>~91 min total reading</span>
              <span>·</span>
              <span className="font-semibold" style={{ color: "#16a34a" }}>Free</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">

          {/* Section list */}
          <section>
            <div className="space-y-3">
              {SECTIONS.map((s, i) => (
                <Link key={s.slug} href={`/learn/strains/${s.slug}`}
                  className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-5 hover:border-black hover:shadow-[3px_3px_0px_#000] transition-all group block">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400 flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h2 className="font-black text-base text-black group-hover:underline">{s.title}</h2>
                      <span className="text-xs text-gray-400 flex-shrink-0">{s.readTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {s.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{tag}</span>
                      ))}
                      <span className="text-xs text-gray-400">•</span>
                      {s.keyPoints.map(kp => (
                        <span key={kp} className="text-xs text-gray-400">{kp}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-black mb-4">Quick Facts</h2>
            <div className="space-y-3">
              {QUICK_FACTS.map((f, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
                  <div className="font-bold text-sm text-black mb-1">{f.q}</div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Back to hub */}
          <div className="pt-4 border-t border-gray-200">
            <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-black flex items-center gap-2">← Back to Learning Hub</Link>
          </div>
          {/* Hero Image */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learn/strains.jpg"
              alt="Hero illustration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
