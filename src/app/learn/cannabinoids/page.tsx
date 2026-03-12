import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Cannabinoid Guide — THC, CBD, CBN, CBG, THCV, CBC Explained | StrainHub",
  description:
    "Complete guide to cannabis cannabinoids: THC, CBD, CBN, CBG, THCV, CBC — what each one does, medical benefits, how they interact, and which strains are highest in each.",
  alternates: { canonical: "https://strainhub.com/learn/cannabinoids" },
};

const CANNABINOIDS = [
  {
    name: "THC",
    full: "Delta-9-Tetrahydrocannabinol",
    emoji: "🔥",
    color: "bg-red-50 border-red-200",
    tagColor: "bg-red-100",
    discovered: "1964",
    psychoactive: true,
    typicalRange: "10–30%",
    summary: "The primary psychoactive compound in cannabis. THC binds to CB1 receptors in the brain and central nervous system, producing the classic cannabis 'high' — euphoria, altered perception, increased appetite, and relaxation.",
    effects: ["Euphoria", "Relaxation", "Appetite stimulation", "Pain relief", "Altered time perception", "Heightened sensory experience"],
    medical: ["Chronic pain", "Nausea & vomiting (chemotherapy)", "Muscle spasticity (MS)", "Glaucoma", "Insomnia", "PTSD"],
    sideEffects: ["Anxiety at high doses", "Short-term memory impairment", "Dry mouth", "Increased heart rate", "Psychosis risk in predisposed individuals"],
    detail: "THC was isolated in 1964 by Israeli chemist Raphael Mechoulam, who is known as the 'father of cannabis research.' It works by mimicking anandamide — the body's natural endocannabinoid nicknamed the 'bliss molecule.' THC binds to CB1 receptors in the hippocampus (memory), cerebral cortex (thinking), cerebellum (coordination), basal ganglia (movement), and limbic system (emotions). This widespread receptor distribution explains why THC affects so many different cognitive and physical functions simultaneously.",
    strains: ["Ghost Train Haze (THC 25–28%)", "Godfather OG (THC 34%)", "Strawberry Banana (THC 26%)", "Bruce Banner (THC 29%)"],
  },
  {
    name: "CBD",
    full: "Cannabidiol",
    emoji: "💙",
    color: "bg-blue-50 border-blue-200",
    tagColor: "bg-blue-100",
    discovered: "1940",
    psychoactive: false,
    typicalRange: "0.1–20%",
    summary: "The second most prominent cannabinoid. CBD is non-psychoactive and has broad medical applications. It modulates THC's effects, reducing anxiety and paranoia while preserving therapeutic benefits.",
    effects: ["Anti-anxiety (without the high)", "Anti-seizure", "Anti-inflammatory", "Neuroprotective", "Mood balancing"],
    medical: ["Epilepsy (FDA-approved as Epidiolex)", "Anxiety disorders", "Inflammatory conditions", "Chronic pain", "Psychosis", "Addiction withdrawal"],
    sideEffects: ["Drowsiness at high doses", "Dry mouth", "May interact with some medications", "Liver enzyme changes at very high doses"],
    detail: "CBD was first isolated in 1940 but was largely ignored until the 2000s when its anti-seizure effects were documented. Unlike THC, CBD doesn't bind directly to CB1 or CB2 receptors but acts as an allosteric modulator — changing how other compounds bind to receptors. It also interacts with serotonin, opioid, and TRPV1 receptors. The 2018 FDA approval of Epidiolex (pure CBD) for childhood epilepsy was a landmark moment. CBD also directly counteracts THC anxiety: higher CBD:THC ratios produce calmer, more functional experiences.",
    strains: ["ACDC (CBD 20%)", "Charlotte's Web (CBD 17%)", "Harlequin (CBD 10–15%)", "Ringo's Gift (CBD 15%)"],
  },
  {
    name: "CBN",
    full: "Cannabinol",
    emoji: "🌙",
    color: "bg-indigo-50 border-indigo-200",
    tagColor: "bg-indigo-100",
    discovered: "1899",
    psychoactive: false,
    typicalRange: "0.1–1%",
    summary: "CBN forms as THC degrades over time through oxidation. It's mildly psychoactive (about 1/4 the potency of THC) and is most associated with sedation — it's the reason old, oxidized cannabis feels more 'couch-lock.'",
    effects: ["Sedation", "Mild pain relief", "Appetite stimulation", "Antibacterial"],
    medical: ["Insomnia", "Pain management", "Appetite loss", "Anti-MRSA (antibiotic-resistant bacteria)"],
    sideEffects: ["Grogginess", "Mild psychoactivity in high amounts"],
    detail: "CBN was actually the first cannabinoid ever isolated — in 1899, long before THC was characterized. It forms through the degradation of THCA (the acid precursor to THC) when cannabis is exposed to heat, light, and oxygen over time. Cannabis that has been improperly stored or is very old will have higher CBN content. This is why old weed often makes you very sleepy. The sedative effects of CBN synergize strongly with myrcene. Some studies suggest CBN is one of the most potent antibacterial cannabinoids, showing activity against MRSA strains resistant to multiple antibiotics.",
    strains: ["Aged cannabis", "Purple Urkle", "Granddaddy Purple (aged)", "Bubba Kush (cured)"],
  },
  {
    name: "CBG",
    full: "Cannabigerol",
    emoji: "🌿",
    color: "bg-green-50 border-green-200",
    tagColor: "bg-green-100",
    discovered: "1964",
    psychoactive: false,
    typicalRange: "0.1–1% (up to 10% in specialized strains)",
    summary: "Called the 'mother of all cannabinoids' — CBG is the precursor from which THC, CBD, and other cannabinoids are synthesized. Non-psychoactive with powerful neuroprotective and antibacterial properties.",
    effects: ["Neuroprotective", "Appetite stimulant", "Anti-inflammatory", "Antibacterial", "Focus enhancement"],
    medical: ["Inflammatory bowel disease", "Glaucoma (reduces intraocular pressure)", "Neurodegeneration (Parkinson's, Huntington's)", "MRSA infections", "Bladder dysfunction"],
    sideEffects: ["Generally very well tolerated", "Mild fatigue at high doses"],
    detail: "CBG is biosynthetically the parent molecule for all other cannabinoids — in young cannabis plants, most of the cannabinoid content is CBGA (cannabigerolic acid), which enzymes then convert into THCA, CBDA, or CBCA as the plant matures. By harvest, less than 1% CBG typically remains, which is why it's been called the 'stem cell' of cannabinoids and is expensive to produce. High-CBG strains have been specially bred by harvesting early or through genetic modification. Research shows CBG has remarkable effects on inflammatory bowel disease and may stimulate neurogenesis (new brain cell growth) — one of very few compounds shown to do this.",
    strains: ["White CBG", "Jack Frost CBG", "Lemon Diesel CBG", "Stem Cell CBG"],
  },
  {
    name: "THCV",
    full: "Tetrahydrocannabivarin",
    emoji: "⚡",
    color: "bg-yellow-50 border-yellow-200",
    tagColor: "bg-yellow-100",
    discovered: "1973",
    psychoactive: true,
    typicalRange: "0.1–1% (up to 5% in some African sativas)",
    summary: "A rare cannabinoid with a unique profile: appetite-suppressing (opposite of THC), fast-acting but shorter duration high, and potential diabetes and bone health benefits. Common in African landrace sativas.",
    effects: ["Appetite suppression", "Euphoria (shorter, cleaner)", "Alertness", "Reduced panic attacks"],
    medical: ["Obesity/weight management", "Type 2 diabetes", "Osteoporosis", "Parkinson's disease", "Panic disorders"],
    sideEffects: ["Short duration (wears off faster)", "Can suppress appetite strongly"],
    detail: "THCV is structurally similar to THC but has a propyl side chain instead of a pentyl chain — a small change with major effects. At low doses, THCV acts as a CB1 antagonist (blocking THC's appetite stimulation), but at high doses it becomes a CB1 agonist (producing psychoactive effects). The high from THCV is described as clear-headed, energetic, and shorter-lasting than THC. African sativa landraces like Durban Poison and strains from Malawi, Rwanda, and Zimbabwe tend to have the highest THCV content — likely an adaptation to equatorial growing conditions. Research into THCV for type 2 diabetes and weight management is particularly promising.",
    strains: ["Durban Poison", "Doug's Varin", "Pineapple Purps", "Willie Nelson"],
  },
  {
    name: "CBC",
    full: "Cannabichromene",
    emoji: "🧬",
    color: "bg-purple-50 border-purple-200",
    tagColor: "bg-purple-100",
    discovered: "1966",
    psychoactive: false,
    typicalRange: "0.1–1%",
    summary: "The third most abundant cannabinoid (after THC and CBD). Non-psychoactive with powerful anti-inflammatory effects and emerging evidence of neurogenesis promotion — new brain cell growth.",
    effects: ["Anti-inflammatory", "Analgesic (pain relief)", "Antidepressant synergy", "Neurogenesis"],
    medical: ["Depression (works best with THC/CBD)", "Pain", "Brain cell growth", "Acne (topically)", "Diarrhea/IBS"],
    sideEffects: ["Very well tolerated", "No known significant side effects"],
    detail: "Like CBG, CBC is synthesized from CBGA — the cannabis plant's master cannabinoid precursor. It doesn't bind well to CB1 receptors (no psychoactivity) but interacts strongly with TRPA1 and TRPV1 receptors (pain receptors). Most excitingly, research published in the British Journal of Pharmacology found CBC promotes neurogenesis — the growth of new brain cells in the hippocampus. This is a remarkable finding given that very few substances are known to promote neurogenesis in adults. Combined with THC and CBD, CBC appears to have strong antidepressant effects through the entourage effect.",
    strains: ["Charlotte's Web", "ACDC", "Maui Dream", "Blue Cherry Soda"],
  },
];

export default function CannabinoidsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the difference between THC and CBD?", "acceptedAnswer": { "@type": "Answer", "text": "THC (tetrahydrocannabinol) is the primary psychoactive compound in cannabis — it produces the 'high.' CBD (cannabidiol) is non-psychoactive and has broad medical applications including anxiety relief, anti-seizure effects, and pain management. CBD also modulates THC's effects, reducing anxiety and paranoia." } },
      { "@type": "Question", "name": "What is CBN and does it make you sleepy?", "acceptedAnswer": { "@type": "Answer", "text": "CBN (cannabinol) forms as THC degrades over time. It is associated with strong sedative effects and is one reason why old, oxidized cannabis tends to produce more couch-lock and sleepiness. CBN is mildly psychoactive at high doses." } },
      { "@type": "Question", "name": "What is CBG the mother cannabinoid?", "acceptedAnswer": { "@type": "Answer", "text": "CBG (cannabigerol) is called the 'mother of all cannabinoids' because it is the chemical precursor from which THC, CBD, and other cannabinoids are biosynthesized in the cannabis plant. By the time a plant is harvested, most CBGA has converted into other cannabinoids, leaving less than 1% CBG." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Cannabis Cannabinoid Guide</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Cannabis contains over 100 unique cannabinoids — chemical compounds that interact with your body's endocannabinoid system.
            THC and CBD get all the press, but CBN, CBG, THCV, and CBC each have distinct and powerful effects worth knowing about.
          </p>
          <div className="flex gap-3 mt-6 flex-wrap">
            {CANNABINOIDS.map(c => (
              <a key={c.name} href={`#${c.name}`} className="text-xs font-black bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-brutal-sm hover:bg-lime transition-colors">
                {c.emoji} {c.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

        {/* Endocannabinoid system teaser */}
        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h2 className="text-xl font-black mb-2">🧠 How Cannabinoids Work</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Cannabinoids work by interacting with your body's <strong>endocannabinoid system (ECS)</strong> — a network of receptors (CB1 and CB2) found throughout the brain, nervous system, immune system, and organs.
            CB1 receptors are concentrated in the brain and produce psychoactive effects. CB2 receptors are in the immune system and produce anti-inflammatory effects without a high.
            Your body naturally produces its own cannabinoids (endocannabinoids) — cannabis cannabinoids mimic and amplify these signals.
          </p>
          <Link href="/learn/how-thc-works" className="inline-block mt-4 text-xs font-black border-2 border-black px-3 py-1.5 rounded-full bg-white shadow-brutal-sm hover:bg-lime-pale">
            Deep dive: How THC works in the brain →
          </Link>
        </section>

        {/* Cannabinoid cards */}
        {CANNABINOIDS.map(c => (
          <section key={c.name} id={c.name} className={`${c.color} border-2 rounded-2xl p-6 sm:p-8 shadow-brutal`}>
            <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{c.emoji}</span>
                <div>
                  <h2 className="text-3xl font-black">{c.name}</h2>
                  <p className="text-sm text-gray-500">{c.full}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className={`text-xs font-black ${c.tagColor} border-2 border-black px-3 py-1 rounded-full`}>
                  {c.psychoactive ? "🔥 Psychoactive" : "✅ Non-Psychoactive"}
                </span>
                <span className="text-xs font-black bg-white border-2 border-black px-3 py-1 rounded-full">
                  Typical: {c.typicalRange}
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-5 font-medium">{c.summary}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.detail}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Effects</div>
                <ul className="space-y-1">
                  {c.effects.map(e => <li key={e} className="text-xs text-gray-600 flex items-center gap-1"><span className="text-lime-600 font-black">✓</span> {e}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Medical Uses</div>
                <ul className="space-y-1">
                  {c.medical.map(m => <li key={m} className="text-xs text-gray-600 flex items-center gap-1"><span className="text-blue-500 font-black">+</span> {m}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Rich Strains</div>
                <ul className="space-y-1">
                  {c.strains.map(s => <li key={s} className="text-xs text-gray-600 flex items-center gap-1"><span className="text-brand font-black">→</span> {s}</li>)}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* Comparison table */}
        <section>
          <h2 className="text-3xl font-black mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto border-2 border-black rounded-2xl shadow-brutal">
            <table className="w-full text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="text-left p-4 font-black">Cannabinoid</th>
                  <th className="text-left p-4 font-black">Psychoactive?</th>
                  <th className="text-left p-4 font-black">Primary Effect</th>
                  <th className="text-left p-4 font-black">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "THC", psycho: "Yes", primary: "Euphoria, relaxation", best: "Pain, nausea, insomnia" },
                  { name: "CBD", psycho: "No", primary: "Anxiety relief, anti-seizure", best: "Anxiety, epilepsy, inflammation" },
                  { name: "CBN", psycho: "Mildly", primary: "Sedation", best: "Insomnia, deep sleep" },
                  { name: "CBG", psycho: "No", primary: "Neuroprotection, focus", best: "IBD, glaucoma, focus" },
                  { name: "THCV", psycho: "At high doses", primary: "Energy, appetite suppression", best: "Weight, diabetes, Parkinson's" },
                  { name: "CBC", psycho: "No", primary: "Anti-inflammatory, neurogenesis", best: "Depression, pain, brain health" },
                ].map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-black"><a href={`#${row.name}`} className="hover:text-brand">{row.name}</a></td>
                    <td className="p-4 text-gray-600">{row.psycho}</td>
                    <td className="p-4 text-gray-600">{row.primary}</td>
                    <td className="p-4 text-gray-600">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What is the difference between THC and CBD?", a: "THC is psychoactive — it binds to CB1 receptors in the brain to produce the 'high.' CBD is non-psychoactive and works through different pathways, offering anxiety relief, anti-inflammatory, and anti-seizure effects. CBD also counteracts THC anxiety — strains with higher CBD:THC ratios produce calmer experiences." },
              { q: "Which cannabinoid is best for sleep?", a: "CBN is most associated with sedation and sleep. It forms as THC ages and oxidizes — old cannabis typically has more CBN. THC also helps with sleep initiation, though it may reduce REM sleep. A combination of THC, CBN, and the terpene myrcene is commonly reported as most sleep-inducing." },
              { q: "What is CBG good for?", a: "CBG (cannabigerol) has shown remarkable results for inflammatory bowel disease, glaucoma (by reducing intraocular pressure), and neurodegeneration. It's non-psychoactive and appears to promote neurogenesis (new brain cell growth). It's rare and expensive to produce, so high-CBG strains are specialty items." },
              { q: "Does THCV suppress appetite?", a: "Yes — at low-to-moderate doses, THCV acts as a CB1 receptor antagonist, blocking the appetite-stimulating effect of THC. This is the opposite of the typical cannabis 'munchies.' High-THCV strains like Durban Poison are popular with users who want the benefits of cannabis without increased appetite." },
            ].map(faq => (
              <details key={faq.q} className="bg-white border-2 border-black rounded-xl shadow-brutal-sm group">
                <summary className="flex justify-between items-center p-5 font-black cursor-pointer list-none">
                  {faq.q}
                  <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t-2 border-black pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h3 className="font-black text-lg mb-3">Keep Exploring</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/learn/terpenes", label: "🌿 Terpene Library" },
              { href: "/learn/how-thc-works", label: "🧠 How THC Works" },
              { href: "/learn/indica-vs-sativa", label: "⚡ Indica vs Sativa" },
              { href: "/learn/medical", label: "💊 Medical Index" },
              { href: "/strains", label: "Browse All Strains →" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
