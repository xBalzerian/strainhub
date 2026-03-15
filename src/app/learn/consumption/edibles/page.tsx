import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Edibles & Oral Consumption Guide | StrainHub Learn",
  description: "Complete guide to cannabis edibles — why they hit differently, onset times, dosing strategy, 11-hydroxy-THC, and how to avoid overconsumption.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/consumption" className="hover:text-black">Consumption</Link><span>/</span>
          <span className="text-black font-semibold">Edibles & Oral Methods</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
            🍫 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Edibles & Oral Methods</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Edibles hit differently — and understanding why is the key to using them safely. The liver converts THC into a more potent compound, the onset is unpredictable, and the most common cannabis emergency room visits are edible-related.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Why Edibles Are Different: 11-Hydroxy-THC</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">When THC is consumed orally, it is absorbed through the GI tract and passes through the liver before reaching the bloodstream — a process called first-pass metabolism. The liver converts delta-9-THC into 11-hydroxy-THC (11-OH-THC), a metabolite that is 2–4 times more potent than THC itself and crosses the blood-brain barrier more efficiently. This is why the same amount of THC feels significantly stronger when eaten versus smoked. It also explains the longer onset (30–120 minutes depending on stomach contents, individual metabolism, and the food matrix) and longer duration (4–8 hours, sometimes up to 12 hours). Onset variability is the number one reason for accidental overconsumption — people don&apos;t feel it after 45 minutes and take more.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Dosing Guide</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Legal edibles are dosed in milligrams of THC. Colorado and California standards: 5mg per serving, 100mg per package maximum. Dosing guidelines by tolerance level: <strong>Microdose (1–2.5mg)</strong> — subtle mood lift, no impairment, suitable for anxiety relief and focus. <strong>Low dose (2.5–5mg)</strong> — light euphoria, mild relaxation, standard &quot;beginner&quot; dose. <strong>Moderate (5–15mg)</strong> — clear intoxication, strong relaxation, suitable for experienced users or medical use. <strong>High dose (15–30mg)</strong> — strong psychoactive effects, suitable only for high-tolerance users. <strong>Very high (50mg+)</strong> — intense effects that can be overwhelming even for experienced users. The golden rule: start with 5mg, wait a full 2 hours before redosing.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Fat Content & Absorption</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">THC and other cannabinoids are fat-soluble (lipophilic). Consuming edibles with or after a high-fat meal significantly increases absorption — studies show bioavailability increases 2.5–5x with fat compared to fasted state. This means the same 10mg edible can feel like 10mg on an empty stomach and 25–40mg equivalent after a fatty meal. Commercial edible manufacturers use various fat carriers (coconut oil, MCT oil, cocoa butter) to improve consistency. Water-soluble cannabis emulsions (nanoemulsions) have been developed specifically to improve onset predictability — these products can begin working in 15–30 minutes and are labeled as &quot;fast-acting&quot; on legal market shelves.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Sublingual & Oral Tinctures</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Tinctures — alcohol or oil-based cannabis extracts — can be absorbed sublingually (under the tongue) or swallowed. Sublingual absorption bypasses first-pass metabolism — cannabinoids are absorbed directly through the mucous membranes into the bloodstream, producing onset in 15–45 minutes with effects more similar to inhalation in character. Swallowed tinctures behave like edibles. Sublingual use allows for precise dosing with a dropper and is popular for medical use (pain, sleep, anxiety) where consistent, predictable effects are important. Alcohol-based tinctures absorb faster sublingually; oil-based absorb more slowly but are gentler for sensitive mouths.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">What To Do If You Take Too Much</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Acute THC overconsumption is not medically dangerous — there is no recorded lethal dose of cannabis — but it is deeply unpleasant. Symptoms include severe anxiety, paranoia, heart palpitations, dizziness, nausea, and dissociation. Key interventions: move to a calm, safe environment; lie down; focus on slow, deep breathing; have a trusted person present; eat something with black pepper (piperine has been reported to reduce acute THC anxiety — anecdotal but benign). CBD (high dose, 150–300mg) may counteract THC-induced anxiety. Time is the cure — effects will pass. Go to the ER only if symptoms include chest pain, altered consciousness, or you are genuinely unsure what was consumed. Hospitals can provide benzodiazepines for extreme anxiety if needed.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Onset: 30–120 min (highly variable)",
                  "Peak: 2–4 hours",
                  "Duration: 4–8+ hours",
                  "Liver converts THC → 11-OH-THC (2–4x more potent)",
                  "Bioavailability: 4–20% (fat content dependent)",
                  "Beginner dose: 5mg — wait FULL 2 hours before redosing",
                  "Fast-acting emulsions onset: 15–30 min",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/learn/consumption" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Consumption</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
