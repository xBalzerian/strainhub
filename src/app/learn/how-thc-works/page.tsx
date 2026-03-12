import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How THC Works in Your Brain — The Endocannabinoid System Explained | StrainHub",
  description:
    "How does THC get you high? The science of the endocannabinoid system, CB1 and CB2 receptors, anandamide, and how cannabis interacts with your brain and body — fully explained.",
  alternates: { canonical: "https://strainhub.com/learn/how-thc-works" },
};

export default function HowThcWorksPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How does THC make you high?", "acceptedAnswer": { "@type": "Answer", "text": "THC binds to CB1 receptors in the brain, which are concentrated in regions controlling pleasure, memory, thinking, concentration, movement, coordination, and sensory perception. By flooding these receptors, THC disrupts normal neurotransmitter signaling, producing euphoria, altered perception of time, increased appetite, and relaxation." } },
      { "@type": "Question", "name": "What is the endocannabinoid system?", "acceptedAnswer": { "@type": "Answer", "text": "The endocannabinoid system (ECS) is a biological system in all mammals — including humans — that regulates mood, appetite, memory, pain, immune function, and sleep. It consists of cannabinoid receptors (CB1 and CB2), endocannabinoids produced by your own body (like anandamide and 2-AG), and enzymes that break them down. Cannabis compounds like THC and CBD interact with this system." } },
      { "@type": "Question", "name": "Can you build a tolerance to THC?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. With regular cannabis use, CB1 receptors downregulate — they decrease in number and sensitivity in response to chronic THC stimulation. This is why regular users need more cannabis to achieve the same effect. Taking a break (often called a 'tolerance break' or 'T-break') allows CB1 receptors to recover, typically over 2–4 weeks." } },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How THC Works in the Brain: The Endocannabinoid System Explained",
    "description": "A complete scientific explanation of how THC interacts with CB1 and CB2 receptors, anandamide, and the endocannabinoid system.",
    "url": "https://strainhub.com/learn/how-thc-works",
    "author": { "@type": "Organization", "name": "StrainHub" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">How THC Works in Your Brain</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            The science of cannabis starts with a system you already have. Your brain was built to receive cannabinoids —
            it produces its own. Here's exactly what happens when THC enters your bloodstream.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">

        {/* ECS */}
        <section>
          <h2 className="text-3xl font-black mb-5">The Endocannabinoid System (ECS)</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Before cannabis can do anything to your brain, you need to understand the system it's interacting with.
            The <strong>endocannabinoid system (ECS)</strong> is a biological signaling network found in all mammals.
            Scientists didn't know it existed until 1988 — and only discovered it because they were trying to understand why THC works.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The ECS has three components:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: "🔵", title: "Receptors", desc: "CB1 (brain & CNS) and CB2 (immune system & periphery) — the locks that cannabinoids fit into." },
              { icon: "🟢", title: "Endocannabinoids", desc: "Your body's own cannabinoids: anandamide (AEA) and 2-AG. They're made on demand when needed." },
              { icon: "🔴", title: "Enzymes", desc: "FAAH and MAGL — enzymes that break down endocannabinoids after they've done their job." },
            ].map(item => (
              <div key={item.title} className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-black mb-2">{item.title}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed">
            The ECS regulates an enormous range of functions: pain, mood, appetite, memory, sleep, immune response, reproduction, and more.
            It's essentially a master regulatory system — keeping your physiology in balance (homeostasis).
            When something is out of balance, the ECS responds. Cannabis hijacks this system, which is why it affects so many different things simultaneously.
          </p>
        </section>

        {/* Anandamide */}
        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h2 className="text-2xl font-black mb-3">🕊️ Anandamide — Your Brain's Own Cannabis</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In 1992, Israeli scientist Raphael Mechoulam (who isolated THC in 1964) discovered the first endocannabinoid.
            He named it <strong>anandamide</strong>, from the Sanskrit word <em>ananda</em> — meaning "bliss" or "divine joy."
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Anandamide is a naturally occurring molecule in your brain that binds to the same CB1 receptors as THC.
            It's produced on demand — not stored — and broken down within minutes by the FAAH enzyme.
            Anandamide is released during exercise (it's one reason for "runner's high"), creative activity, meditation, and positive social experiences.
          </p>
          <p className="text-gray-700 leading-relaxed">
            THC's similarity to anandamide is not a coincidence of evolution — it's why cannabis has such profound psychological effects.
            But unlike anandamide (which lasts minutes), THC can persist in the brain for hours, partially because it's fat-soluble and resists enzyme breakdown.
          </p>
        </section>

        {/* CB1 and CB2 */}
        <section>
          <h2 className="text-3xl font-black mb-5">CB1 vs CB2 Receptors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-brutal">
              <h3 className="text-xl font-black mb-3">🧠 CB1 Receptors</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Concentrated in the brain and central nervous system. Activation by THC produces the psychoactive high.</p>
              <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">High concentration in:</div>
              <ul className="space-y-1 text-sm text-gray-600">
                {[
                  ["Hippocampus", "Memory formation — why THC impairs short-term memory"],
                  ["Basal ganglia", "Movement & coordination — why cannabis can affect motor function"],
                  ["Cerebral cortex", "Thinking & perception — altered sensory experience"],
                  ["Cerebellum", "Balance & timing — time distortion"],
                  ["Limbic system", "Emotions — euphoria, anxiety, mood elevation"],
                  ["Hypothalamus", "Appetite — the munchies"],
                ].map(([area, effect]) => (
                  <li key={area} className="flex gap-2"><strong className="w-32 shrink-0">{area}:</strong><span className="text-gray-500">{effect}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-brutal">
              <h3 className="text-xl font-black mb-3">🛡️ CB2 Receptors</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Primarily in the immune system and peripheral tissues. No psychoactive effects — anti-inflammatory benefits.</p>
              <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">High concentration in:</div>
              <ul className="space-y-1 text-sm text-gray-600">
                {[
                  ["Spleen", "Immune modulation"],
                  ["Tonsils", "Immune response"],
                  ["Bone marrow", "Blood cell production"],
                  ["Gut", "Digestive regulation"],
                  ["Skin", "Inflammation & pain (topicals work here)"],
                  ["Liver", "Metabolic function"],
                ].map(([area, effect]) => (
                  <li key={area} className="flex gap-2"><strong className="w-32 shrink-0">{area}:</strong><span className="text-gray-500">{effect}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Journey of THC */}
        <section>
          <h2 className="text-3xl font-black mb-5">What Happens When You Consume Cannabis</h2>
          <div className="space-y-4">
            {[
              { step: "01", time: "0–10 min (inhaled)", title: "Absorption", desc: "THC molecules cross from your lungs into your bloodstream through the alveoli. Within seconds, THC reaches the brain via the blood-brain barrier — a selective membrane that normally keeps toxins out but allows fat-soluble molecules like THC through." },
              { step: "02", time: "10–30 min", title: "Receptor Binding", desc: "THC binds to CB1 receptors, particularly in the nucleus accumbens (reward center) and prefrontal cortex. This triggers a dopamine release — the same mechanism as other pleasurable activities. Unlike opioids, THC doesn't directly kill cells, but it does disrupt normal neurotransmitter signaling." },
              { step: "03", time: "30–120 min", title: "Peak Effects", desc: "CB1 receptors are now saturated with THC. The hippocampus is disrupted (short-term memory impairment), the limbic system is activated (euphoria), the hypothalamus receives false satiety signals (leading to appetite stimulation), and the basal ganglia firing is altered (body relaxation, possible heaviness)." },
              { step: "04", time: "2–6 hours", title: "Metabolism", desc: "The liver processes THC into 11-hydroxy-THC (which is MORE psychoactive and crosses the blood-brain barrier more efficiently — explaining why edibles hit differently and harder). Both are then converted to THC-COOH, the inactive metabolite stored in fat cells and detectable in urine tests." },
              { step: "05", time: "Days–weeks", title: "Clearance", desc: "THC-COOH is fat-soluble, so it accumulates in fat cells and is released slowly back into the bloodstream. This is why drug tests can detect cannabis 30+ days after use in heavy users. Regular users have continuous low-level CB1 exposure from this fat release, which contributes to tolerance." },
            ].map(s => (
              <div key={s.step} className="flex gap-4 bg-white border-2 border-black rounded-xl p-5 shadow-brutal-sm">
                <div className="text-2xl font-black text-lime-600 w-10 shrink-0">{s.step}</div>
                <div>
                  <div className="font-black mb-0.5">{s.title} <span className="text-xs font-medium text-gray-400 ml-2">{s.time}</span></div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tolerance */}
        <section className="bg-off-white border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h2 className="text-2xl font-black mb-4">🔄 Tolerance: Why You Need More Over Time</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            With regular cannabis use, your brain adapts to chronic CB1 stimulation through a process called
            <strong> receptor downregulation</strong> — CB1 receptors decrease in number and sensitivity.
            This is your brain protecting itself from overstimulation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The result: the same dose produces weaker effects. This is cannabis tolerance.
            Studies using PET scans have shown that heavy daily users have significantly fewer CB1 receptors
            compared to non-users — particularly in the prefrontal cortex and hippocampus.
          </p>
          <div className="bg-lime border-2 border-black rounded-xl p-4">
            <div className="font-black mb-2">⏱️ Tolerance Break Timeline</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div><strong>Day 2–3:</strong> CB1 receptors begin upregulating</div>
              <div><strong>Day 7:</strong> Noticeable improvement in receptor sensitivity</div>
              <div><strong>Day 14:</strong> Significant receptor recovery — effects noticeably stronger</div>
              <div><strong>Day 28:</strong> Near-baseline receptor levels restored in most brain regions</div>
            </div>
          </div>
        </section>

        {/* CBD modulation */}
        <section>
          <h2 className="text-3xl font-black mb-4">How CBD Changes the THC Experience</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            CBD doesn't block CB1 receptors directly, but it acts as a <strong>negative allosteric modulator</strong> —
            it changes the shape of the CB1 receptor in a way that makes THC bind less effectively.
            The practical result: CBD softens and calms the THC high.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { ratio: "High THC, Low CBD", feel: "Intense psychoactivity, more likely anxiety, stronger euphoria, more sedating", example: "OG Kush, Gorilla Glue" },
              { ratio: "Balanced THC:CBD (1:1)", feel: "Mellowed high, functional, reduced anxiety, longer-lasting but gentler effects", example: "Cannatonic, Harlequin" },
              { ratio: "Low THC, High CBD", feel: "Minimal psychoactivity, clear-headed relaxation, anxiety relief without impairment", example: "ACDC, Charlotte's Web" },
              { ratio: "High CBD only", feel: "No high, anti-inflammatory, anti-anxiety, anti-seizure effects only", example: "CBD isolate, hemp flower" },
            ].map(r => (
              <div key={r.ratio} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                <div className="font-black text-sm mb-1">{r.ratio}</div>
                <p className="text-xs text-gray-500 mb-2">{r.feel}</p>
                <span className="text-xs bg-lime border border-black px-2 py-0.5 rounded-full font-bold">{r.example}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "How does THC make you high?", a: "THC binds to CB1 receptors in the brain — especially in the limbic system, hippocampus, and prefrontal cortex — disrupting normal neurotransmitter signaling and triggering dopamine release in the reward pathway. This produces euphoria, altered time perception, increased appetite, and relaxation. The intensity depends on the dose, your tolerance, your genetics (specifically the FAAH gene), and the terpene profile of the strain." },
              { q: "Why do edibles hit differently than smoking?", a: "When you eat cannabis, your liver converts THC into 11-hydroxy-THC before it reaches your brain. 11-hydroxy-THC is more potent and crosses the blood-brain barrier more efficiently than regular THC. The delay (30–90 minutes) combined with stronger effects explains why edibles are more intense and longer-lasting. A common mistake is redosing edibles too early before feeling effects, leading to overconsumption." },
              { q: "Can you overdose on cannabis?", a: "A lethal overdose of cannabis is not possible — there are no CB1 receptors in the brainstem's respiratory center, so cannabis cannot cause respiratory depression (unlike opioids). However, a 'green out' (taking too much) can cause intense anxiety, panic, vomiting, and temporary psychosis-like symptoms that are extremely unpleasant but not medically dangerous. CBD and a calm environment are the best responses." },
              { q: "Can you build a tolerance to THC?", a: "Yes. Regular use causes CB1 receptor downregulation — fewer, less sensitive receptors. Taking a tolerance break (T-break) of 2–4 weeks allows receptors to recover. Studies show that even 2 days off can begin the recovery process, with near-full recovery after 28 days in most brain regions." },
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

        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h3 className="font-black text-lg mb-4">Continue Learning</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/learn/cannabinoids", label: "🔬 All Cannabinoids" },
              { href: "/learn/terpenes", label: "🌿 Terpene Library" },
              { href: "/learn/indica-vs-sativa", label: "⚡ Indica vs Sativa" },
              { href: "/learn/medical", label: "💊 Medical Index" },
              { href: "/strains", label: "Browse Strains →" },
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
