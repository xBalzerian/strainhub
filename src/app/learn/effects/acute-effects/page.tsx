import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acute Psychoactive Effects of Cannabis | StrainHub Learn",
  description: "A science-based guide to the short-term psychoactive effects of cannabis — euphoria, altered perception, appetite, anxiety, and how set and setting matter.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
          <span className="text-black font-semibold">Acute Psychoactive Effects</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#15803d" }}>
            🧠 Effects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Acute Psychoactive Effects</h1>
          <p className="text-gray-500 text-lg leading-relaxed">What actually happens in your brain and body when you consume cannabis — the neuroscience of euphoria, altered perception, appetite stimulation, anxiety, and everything in between.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Mechanism: THC & the CB1 Receptor</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">THC (delta-9-tetrahydrocannabinol) produces its effects by binding to CB1 receptors — G protein-coupled receptors densely concentrated in the cerebral cortex, hippocampus, basal ganglia, cerebellum, and limbic system. CB1 receptors are part of the endocannabinoid system (ECS), which normally receives signals from the brain&apos;s own cannabinoids (anandamide and 2-AG). THC mimics these molecules but binds more strongly and for much longer, producing an amplified, prolonged response. CB1 activation modulates the release of other neurotransmitters — dopamine, serotonin, GABA, glutamate — which explains why cannabis affects mood, perception, memory, and motor control simultaneously.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Euphoria & Mood Effects</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The most commonly sought effect is euphoria — a sense of well-being, relaxation, and elevated mood driven by THC&apos;s stimulation of dopamine release in the nucleus accumbens (the brain&apos;s reward center). Sociability, laughter, and heightened appreciation for music, food, and conversation are typical. These effects vary significantly by strain (terpene and cannabinoid profile), dose, tolerance, and individual neurochemistry. High doses, especially for inexperienced users, can flip from euphoria to dysphoria — anxiety, paranoia, and disorientation — particularly with high-THC strains low in CBD and terpenes like linalool or myrcene.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Altered Perception & Cognition</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis alters the perception of time (it typically feels slowed), sharpens sensory input (colors may appear more vivid, music more immersive), and can produce mild synesthesia at higher doses. Short-term memory is impaired during acute intoxication — THC disrupts hippocampal encoding of new memories, though existing memories are unaffected. Working memory and executive function are temporarily reduced, making complex tasks, driving, and fine motor work more difficult. These cognitive effects are fully reversible and resolve as THC is metabolized — typically within 2–4 hours for inhalation, longer for edibles.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Munchies: Appetite Stimulation</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis-induced appetite stimulation (&quot;the munchies&quot;) is well-documented and has legitimate medical applications (HIV wasting, cancer chemotherapy nausea). THC activates CB1 receptors in the hypothalamus, triggering ghrelin release (the hunger hormone) and enhancing olfactory sensitivity — food smells and tastes more intense. Research from 2015 (Nature Neuroscience) showed that THC activates pro-opiomelanocortin (POMC) neurons that normally suppress appetite — essentially hijacking a satiety circuit to drive hunger. CBD and THCV may counteract appetite stimulation, which explains why some strains produce stronger munchies than others.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Anxiety, Paranoia & Set/Setting</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis-induced anxiety is the most common adverse acute effect, particularly with high-THC products, sativa-dominant strains, and in inexperienced or anxious users. THC activates the amygdala (threat-detection center), which can amplify existing anxiety or trigger paranoia. Research shows CBD counteracts THC-induced anxiety — one reason full-spectrum cannabis with balanced THC:CBD ratios tends to produce less anxiety than high-THC isolates. <strong>Set</strong> (mindset, expectations, existing emotional state) and <strong>setting</strong> (environment, social context) are the most powerful predictors of acute anxiety — factors first identified by psychedelic researcher Timothy Leary and consistently confirmed by cannabis research.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Physical Effects</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Acute physical effects include: increased heart rate (tachycardia, typically 20–50 bpm above baseline for the first hour), vasodilation causing red eyes and mild blood pressure drop, dry mouth (cottonmouth) from CB1 receptor suppression of salivary glands, muscle relaxation, and reduced nausea. Cannabis is a bronchodilator in the short term (though chronic heavy smoking reverses this). Coordination is mildly impaired, particularly at higher doses — driving is demonstrably dangerous while acutely intoxicated. These physical effects are generally well-tolerated by healthy adults and resolve fully as intoxication wears off.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "THC binds CB1 receptors — densest in cortex & hippocampus",
                  "Euphoria driven by dopamine in nucleus accumbens",
                  "Short-term memory impaired during intoxication",
                  "CBD counteracts THC-induced anxiety",
                  "Appetite driven by hypothalamic CB1 + ghrelin",
                  "Inhalation onset: 2–10 min, peak 30–60 min",
                  "Edible onset: 30–120 min, peak 2–4 hours",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/learn/effects" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Effects</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
