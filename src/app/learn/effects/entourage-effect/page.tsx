import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Entourage Effect Explained — Cannabis Synergy Science | StrainHub",
  description: "What is the entourage effect? How cannabinoids and terpenes work together for effects greater than isolated compounds. The science, the evidence, and the debate.",
  alternates: { canonical: "https://strainhub.vercel.app/learn/effects/entourage-effect" },
};

const FAQ = [
  { q: "What is the entourage effect in cannabis?", a: "The entourage effect is a proposed mechanism where cannabinoids, terpenes, and other phytochemicals in cannabis interact synergistically to produce effects that are qualitatively and quantitatively different from isolated compounds. Coined by Raphael Mechoulam in 1998, it suggests whole-plant preparations may be more therapeutically effective than isolated THC or CBD." },
  { q: "Is the entourage effect scientifically proven?", a: "The entourage effect has substantial preclinical evidence and clinical plausibility, but rigorous human clinical trials directly proving it are limited. Key evidence includes: β-caryophyllene's direct CB2 activation, α-pinene's apparent THC memory counteraction, and CBD's modulation of THC anxiety. Most researchers consider it real but acknowledge the evidence base needs strengthening." },
  { q: "Does CBD counteract THC?", a: "CBD modulates THC's effects through multiple mechanisms: negative allosteric modulation of CB1 receptors (reducing THC binding efficiency), 5-HT1A agonism (reducing anxiety), and FAAH inhibition (prolonging endocannabinoid activity). High-CBD strains and 1:1 products typically produce less anxiety and paranoia than high-THC alone." },
  { q: "What is full-spectrum vs. broad-spectrum vs. isolate?", a: "Full-spectrum extracts contain the complete plant profile — cannabinoids, terpenes, flavonoids, and minor compounds. Broad-spectrum removes THC while retaining other compounds. Isolate is a single purified compound (typically CBD or THC). The entourage hypothesis predicts full-spectrum provides superior therapeutic outcomes, though this varies by condition and individual." },
];

export default function EntourageEffectPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      })}} />

      <div className="min-h-screen bg-[#F8F8F0]">
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-black">Home</Link><span>/</span>
            <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
            <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
            <span className="text-black font-semibold">Entourage Effect</span>
          </div>
        </div>

        <div className="bg-white border-b-2 border-black">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#faf5ff", color: "#6d28d9" }}>🔬 Pharmacology</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">The Entourage Effect</h1>
            <p className="text-gray-500 text-lg leading-relaxed">How cannabinoids and terpenes combine to produce effects greater than the sum of their parts — the science, the evidence, and what it means for strain selection.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">

          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-black text-black mb-3">The Core Concept</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              First described by Israeli researcher Raphael Mechoulam in 1998, the entourage effect proposes that the hundreds of compounds in cannabis — cannabinoids, terpenes, flavonoids, and other phytochemicals — work together synergistically. The sum, the theory holds, is greater than its parts.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              This has significant practical implications: two strains with identical THC percentages can produce dramatically different experiences based on their terpene and minor cannabinoid profiles. It also explains why pharmaceutical isolated THC (Marinol/dronabinol) is often less effective and more dysphoric than whole-plant preparations.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mt-4">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Key Quote</div>
              <blockquote className="text-sm text-gray-700 italic">"The plant is ahead of us. We don't know all the compounds yet. And the interactions are incredibly complex."</blockquote>
              <div className="text-xs text-gray-400 mt-2">— Ethan Russo, MD, neurologist and cannabis researcher</div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-black mb-4">Documented Synergistic Interactions</h2>
            <div className="space-y-3">
              {[
                { pair: "CBD ↔ THC", effect: "Anxiety reduction", mechanism: "CBD negatively modulates CB1 receptors, reducing THC binding efficiency and dampening psychotomimetic effects including anxiety and paranoia.", evidence: "Strong" },
                { pair: "α-Pinene ↔ THC", effect: "Memory preservation", mechanism: "Pinene inhibits acetylcholinesterase, potentially counteracting THC's disruption of short-term memory encoding in the hippocampus.", evidence: "Moderate" },
                { pair: "β-Caryophyllene ↔ CBD", effect: "Anti-inflammatory synergy", mechanism: "Caryophyllene activates CB2 receptors while CBD modulates TRPV and other inflammatory pathways — complementary anti-inflammatory mechanisms.", evidence: "Moderate" },
                { pair: "Linalool ↔ THC", effect: "Anxiety reduction", mechanism: "Linalool's GABA-A modulation complements CBD's effect on THC anxiety, with lavender-based preparations showing anxiolytic clinical evidence.", evidence: "Emerging" },
                { pair: "Myrcene ↔ THC", effect: "Potency enhancement", mechanism: "Myrcene may increase blood-brain barrier permeability, potentially enhancing cannabinoid CNS uptake. The 'eat mango before cannabis' folk remedy has some scientific basis.", evidence: "Preclinical" },
              ].map(item => (
                <div key={item.pair} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-black text-base text-black">{item.pair}</div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      item.evidence === "Strong" ? "bg-green-100 text-green-700" :
                      item.evidence === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{item.evidence} evidence</span>
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.effect}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.mechanism}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-black mb-4">Full-Spectrum vs. Isolate</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { type: "Full-Spectrum", desc: "Complete plant profile — cannabinoids, terpenes, flavonoids, chlorophyll, waxes. Preserves entourage interactions.", pro: "Maximum synergy", con: "Contains THC (legal consideration)", color: "#16a34a" },
                { type: "Broad-Spectrum", desc: "THC removed, all other compounds retained. Attempts to preserve entourage while eliminating intoxicant.", pro: "No THC, some entourage", con: "THC removal affects synergistic profile", color: "#0369a1" },
                { type: "Isolate", desc: "Single purified compound — typically CBD or THC at 99%+ purity. No synergistic compounds present.", pro: "Precise dosing, no THC concern", con: "Bell curve efficacy, loses entourage", color: "#6d28d9" },
              ].map(item => (
                <div key={item.type} className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="font-black text-sm mb-2" style={{ color: item.color }}>{item.type}</div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                  <div className="text-xs"><span className="text-green-600 font-semibold">✓ {item.pro}</span></div>
                  <div className="text-xs mt-1"><span className="text-red-500 font-semibold">✗ {item.con}</span></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-black mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                      <h3 className="font-bold text-sm text-black pr-4">{f.q}</h3>
                      <span className="text-gray-400 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Link href="/learn/effects" className="text-sm font-bold text-gray-400 hover:text-black">← Effects & Pharmacology</Link>
            <Link href="/learn/effects/terpenes" className="text-sm font-bold text-black hover:underline">Terpene Library →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
