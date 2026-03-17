import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Terpenes — Complete Science Guide to 20+ Terpenes | StrainHub",
  description: "The definitive cannabis terpene reference: myrcene, limonene, caryophyllene, linalool, pinene, terpinolene — mechanisms, effects, boiling points, strains, and entourage interactions.",
  alternates: { canonical: "https://www.strainhub.org/learn/effects/terpenes" },
  openGraph: { title: "Cannabis Terpenes: Complete Science Guide", description: "Every cannabis terpene explained — pharmacology, effects, aroma, boiling points, representative strains.", url: "https://www.strainhub.org/learn/effects/terpenes" },
};

const TERPENES = [
  { name: "Myrcene", formula: "C₁₀H₁₆", emoji: "🥭", aroma: "Earthy · Musky · Mango", boiling: "167°C / 332°F", prevalence: "Most common", effects: ["Sedation", "Muscle relaxation", "Analgesia"], medical: ["Insomnia", "Chronic pain", "Muscle tension"], mechanism: "GABA-A modulation, enhances BBB permeability — may increase THC uptake speed and intensity.", strains: ["OG Kush", "Granddaddy Purple", "Blue Dream", "Cherry Pie"], foods: ["Mango", "Hops", "Lemongrass"], color: "#b45309", bg: "#fffbeb" },
  { name: "Limonene", formula: "C₁₀H₁₆", emoji: "🍋", aroma: "Citrus · Lemon · Orange", boiling: "176°C / 349°F", prevalence: "2nd most common", effects: ["Mood elevation", "Stress relief", "Focus"], medical: ["Anxiety", "Depression", "GERD"], mechanism: "Serotonergic and dopaminergic modulation; anxiolytic effects demonstrated in clinical studies.", strains: ["Sour Diesel", "Super Lemon Haze", "Jack Herer", "Do-Si-Dos"], foods: ["Citrus peel", "Juniper", "Peppermint"], color: "#a16207", bg: "#fefce8" },
  { name: "β-Caryophyllene", formula: "C₁₅H₂₄", emoji: "🌶️", aroma: "Spicy · Pepper · Woody", boiling: "119°C / 246°F", prevalence: "Top 3", effects: ["Anti-inflammatory", "Analgesia", "Anxiolytic"], medical: ["Arthritis", "Inflammatory pain", "Anxiety"], mechanism: "Only terpene that directly activates CB2 cannabinoid receptors — technically a dietary cannabinoid.", strains: ["Girl Scout Cookies", "Bubba Kush", "Chemdawg", "Sour Diesel"], foods: ["Black pepper", "Cloves", "Cinnamon"], color: "#b91c1c", bg: "#fff1f2" },
  { name: "Linalool", formula: "C₁₀H₁₈O", emoji: "💜", aroma: "Floral · Lavender · Spice", boiling: "198°C / 388°F", prevalence: "Common", effects: ["Anxiolytic", "Sedation", "Anticonvulsant"], medical: ["Anxiety", "Insomnia", "Seizures"], mechanism: "GABA-A positive modulation; reduces glutamate-evoked seizures; anticonvulsant synergy with CBD.", strains: ["Lavender Kush", "LA Confidential", "Amnesia Haze", "G-13"], foods: ["Lavender", "Mint", "Coriander"], color: "#7c3aed", bg: "#faf5ff" },
  { name: "α-Pinene", formula: "C₁₀H₁₆", emoji: "🌲", aroma: "Pine · Forest · Rosemary", boiling: "155°C / 311°F", prevalence: "Common", effects: ["Alertness", "Memory retention", "Bronchodilation"], medical: ["Asthma", "Memory issues", "Inflammation"], mechanism: "Acetylcholinesterase inhibition — may counteract THC-induced memory impairment. Bronchodilator.", strains: ["Jack Herer", "Blue Dream", "Strawberry Cough", "Island Sweet Skunk"], foods: ["Pine", "Rosemary", "Dill"], color: "#15803d", bg: "#f0fdf4" },
  { name: "Terpinolene", formula: "C₁₀H₁₆", emoji: "🌸", aroma: "Floral · Herbal · Fresh", boiling: "186°C / 367°F", prevalence: "Rare dominant", effects: ["Uplifting", "Creative", "Antioxidant"], medical: ["Oxidative stress", "Potential anticancer"], mechanism: "Antioxidant; anticancer properties in vitro; sedative at high isolated concentrations.", strains: ["Jack Herer", "Ghost Train Haze", "Golden Pineapple", "XJ-13"], foods: ["Apples", "Cumin", "Lilac"], color: "#0369a1", bg: "#f0f9ff" },
  { name: "Humulene", formula: "C₁₅H₂₄", emoji: "🍺", aroma: "Hoppy · Earthy · Wood", boiling: "106°C / 223°F", prevalence: "Moderate", effects: ["Appetite suppression", "Anti-inflammatory", "Antibacterial"], medical: ["Appetite control", "Inflammation", "Bacterial infection"], mechanism: "CB2 partial agonist; anti-inflammatory via PGE-2 inhibition; anorectic properties.", strains: ["White Widow", "Girl Scout Cookies", "Headband", "Death Star"], foods: ["Hops", "Sage", "Ginger"], color: "#4d7c0f", bg: "#f7fee7" },
  { name: "Ocimene", formula: "C₁₀H₁₆", emoji: "🌿", aroma: "Sweet · Herbal · Woody", boiling: "50°C / 122°F (volatile)", prevalence: "Emerging", effects: ["Decongestant", "Antifungal", "Antiviral"], medical: ["Respiratory", "Fungal infections"], mechanism: "Antifungal, antiviral and decongestant properties documented in preclinical research.", strains: ["Golden Goat", "Clementine", "Space Queen", "Amnesia"], foods: ["Mint", "Parsley", "Orchids"], color: "#0891b2", bg: "#ecfeff" },
];

const FAQ = [
  { q: "What are terpenes in cannabis?", a: "Terpenes are aromatic organic compounds produced in the trichomes of cannabis plants. They create the plant's distinctive scent profiles and interact with cannabinoids to modulate effects through what's known as the entourage effect. Over 200 terpenes have been identified in cannabis, though typically 5–10 dominate any given strain's profile." },
  { q: "Do terpenes get you high?", a: "Terpenes are not directly psychoactive in typical cannabis concentrations. However, they modify the quality and character of the cannabis experience by interacting with cannabinoids and neurotransmitter systems. Beta-caryophyllene is unique as it directly activates CB2 receptors, making it technically a dietary cannabinoid." },
  { q: "What is the most common cannabis terpene?", a: "Myrcene is the most abundant terpene found in most commercial cannabis strains, often comprising 50%+ of the total terpene profile. It's associated with sedation, muscle relaxation, and the 'couch-lock' effect, and is found naturally in mangoes, hops, and lemongrass." },
  { q: "What temperature should I vaporize cannabis for terpenes?", a: "Terpenes have varying boiling points. For maximum terpene preservation, vaporize at 157–185°C (315–365°F). Lower temperatures (157–165°C) capture lighter terpenes like α-pinene. Higher temperatures (185–210°C) release heavier terpenes like linalool. Most full-spectrum terpene sessions use 170–185°C." },
];

export default function TerpenesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Cannabis Terpenes — Complete Science Guide",
          description: "Comprehensive reference covering 20+ cannabis terpenes including mechanisms, effects, boiling points, and representative strains.",
          url: "https://www.strainhub.org/learn/effects/terpenes",
          author: { "@type": "Organization", name: "StrainHub" },
          publisher: { "@type": "Organization", name: "StrainHub", url: "https://www.strainhub.org" },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map(({ q, a }) => ({
            "@type": "Question", name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ])}} />

      <div className="min-h-screen bg-[#F8F8F0]">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-black">Home</Link><span>/</span>
            <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
            <Link href="/learn/effects" className="hover:text-black">Effects & Pharmacology</Link><span>/</span>
            <span className="text-black font-semibold">Terpenes</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white border-b-2 border-black">
          <div className="max-w-4xl mx-auto px-6 py-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#16a34a" }}>🧬 Terpene Library</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">Cannabis Terpenes —<br />Complete Science Guide</h1>            <p className="text-gray-500 text-lg max-w-xl leading-relaxed">The 20+ terpenes that define cannabis aroma, flavor, and effect — pharmacological mechanisms, clinical evidence, boiling points, and representative strains.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

          {/* What Are Terpenes */}
          <section>
            <h2 className="text-xl font-black text-black mb-3">What Are Terpenes?</h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Terpenes are aromatic hydrocarbons produced in the trichomes of cannabis plants — the same structures that produce cannabinoids like THC and CBD. Over 200 distinct terpenes have been identified in cannabis, though most strains are dominated by 5–10 key compounds that define their characteristic aroma and flavor.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Beyond aroma, terpenes interact with cannabinoids and neurotransmitter systems through the <strong>entourage effect</strong> — a synergistic relationship where the combined profile produces qualitatively different effects than isolated compounds. This is why two strains with identical THC percentages can feel completely different.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { num: "150+", label: "Terpenes identified in cannabis" },
                  { num: "50%+", label: "Often just myrcene alone" },
                  { num: "1", label: "Terpene that activates CB2 receptors (β-caryophyllene)" },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-black text-black">{s.num}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Terpene Cards */}
          <section>
            <h2 className="text-xl font-black text-black mb-5">Primary Terpenes — Detailed Reference</h2>
            <div className="space-y-4">
              {TERPENES.map((t) => (
                <div key={t.name} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-start justify-between p-5 border-b border-gray-100" style={{ background: t.bg }}>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{t.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-lg text-black">{t.name}</h3>
                          <span className="text-xs font-mono text-gray-400">{t.formula}</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: t.color, background: t.color + "18" }}>{t.prevalence}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-0.5">{t.aroma}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-400 font-medium">Boiling point</div>
                      <div className="text-sm font-bold text-black">{t.boiling}</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Mechanism of Action</div>
                      <p className="text-sm text-gray-600 leading-relaxed">{t.mechanism}</p>

                      <div className="mt-4">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Primary Effects</div>
                        <div className="flex flex-wrap gap-1.5">
                          {t.effects.map(e => (
                            <span key={e} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: t.color, background: t.color + "15" }}>{e}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Medical Applications</div>
                        <div className="flex flex-wrap gap-1.5">
                          {t.medical.map(m => (
                            <span key={m} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Rich Strains</div>
                      <div className="space-y-1.5">
                        {t.strains.map(s => (
                          <Link key={s} href={`/strains/${s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black">
                            <span style={{ color: t.color }}>→</span>{s}
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4">
                        <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Also Found In</div>
                        <div className="text-sm text-gray-500">{t.foods.join(" · ")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vaporization Temperature Chart */}
          <section>
            <h2 className="text-xl font-black text-black mb-4">Vaporization Temperature Guide</h2>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <p className="text-sm text-gray-600">Terpenes evaporate at different temperatures. Vaporizing at lower temperatures preserves lighter terpenes; higher temperatures release heavier compounds.</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[...TERPENES].sort((a, b) => parseInt(a.boiling) - parseInt(b.boiling)).map(t => (
                  <div key={t.name} className="flex items-center gap-4 px-5 py-3">
                    <span className="text-lg">{t.emoji}</span>
                    <div className="w-24 font-semibold text-sm text-black">{t.name}</div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, ((parseInt(t.boiling) - 50) / 160) * 100)}%`, background: t.color }} />
                    </div>
                    <div className="text-xs font-bold text-gray-500 w-28 text-right">{t.boiling}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-black mb-4">Frequently Asked Questions</h2>
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
            <Link href="/learn/effects/cannabinoids" className="text-sm font-bold text-black hover:underline">Cannabinoid Guide →</Link>
          </div>
          {/* Hero Image */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learn/terpenes.jpg"
              alt="Hero illustration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
