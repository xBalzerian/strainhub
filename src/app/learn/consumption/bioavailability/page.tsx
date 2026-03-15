import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Bioavailability by Method | StrainHub Learn",
  description: "How much THC actually reaches your bloodstream? Bioavailability comparison across inhalation, edibles, sublingual, and topical methods — with the science behind the numbers.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/consumption" className="hover:text-black">Consumption</Link><span>/</span>
          <span className="text-black font-semibold">Bioavailability Guide</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
            📊 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Bioavailability by Method</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Bioavailability is the percentage of cannabinoids that actually reach systemic circulation. It varies dramatically by method — from under 10% to over 80% — and understanding it is fundamental to consistent dosing.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Inhalation: 10–35%</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Smoking cannabis has a bioavailability of approximately 10–25%, vaporization 15–35%. The wide range is due to inhalation technique — breath-hold duration, puff volume, and depth of inhalation all significantly affect absorption. Holding vapor for more than 2–3 seconds provides minimal additional absorption (the lung extracts cannabinoids rapidly in the first 1–2 seconds). Combustion destroys a significant portion of cannabinoids through pyrolysis — vaporization at optimal temperatures preserves more. Despite lower bioavailability compared to IV administration, inhalation is the fastest route to peak plasma levels (2–10 min), making it the easiest method for precise acute dose control.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Oral/Edibles: 4–20%</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Oral bioavailability is the lowest and most variable of all routes — ranging from as little as 4% in a fasted state to 20%+ with a high-fat meal. First-pass liver metabolism metabolizes a large fraction of THC before it reaches systemic circulation, and GI absorption itself is incomplete and inconsistent. The metabolite 11-hydroxy-THC produced during first-pass is more potent than THC itself, partially compensating for the reduced delivery. Factors that increase oral bioavailability: consuming with fatty food, using lipid-based formulations (MCT oil, coconut oil), and using nanoemulsified &quot;fast-acting&quot; products that increase surface area and solubility.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Sublingual: 20–35%</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Sublingual absorption (under the tongue) bypasses first-pass metabolism — cannabinoids are absorbed directly through the oral mucosa into capillaries. Bioavailability is substantially higher than oral ingestion (20–35%) and onset is faster (15–45 minutes). The key requirement: the product must be held under the tongue for at least 60–90 seconds before swallowing for meaningful sublingual absorption. Alcohol-based tinctures absorb faster sublingually due to ethanol&apos;s membrane-permeabilizing effect. Oil-based tinctures absorb more slowly but are better tolerated. If swallowed immediately, sublingual products are essentially just oral edibles.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Transdermal: 45–80%</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Properly formulated transdermal patches have the highest bioavailability of any non-IV route — 45–80% — because they deliver cannabinoids directly into the bloodstream via the dermis, completely bypassing GI and pulmonary losses. However, this only applies to true transdermal formulations with penetration enhancers. Most cannabis &quot;topicals&quot; marketed as creams or balms are NOT transdermal and have minimal systemic bioavailability. Transdermal patches also produce the most consistent plasma levels over time (8–12 hour steady state), making them pharmacologically superior for conditions requiring stable therapeutic levels (chronic pain, sleep disorders).</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Why This Matters for Dosing</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Understanding bioavailability explains why the same &quot;amount&quot; of cannabis produces vastly different effects by route. A 10mg THC edible taken fasted (4% bioavailability) delivers ~0.4mg to your bloodstream. The same 10mg in a fatty edible (15%) delivers ~1.5mg — nearly 4x more. A 10mg inhalation dose at 20% bioavailability delivers ~2mg. These differences compound with the additional factor that oral THC is converted to the more potent 11-OH-THC. This pharmacokinetic complexity is why experienced cannabis users often find their tolerance from one method doesn&apos;t fully translate to another, and why starting low when switching consumption methods is always the right approach.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Bioavailability Summary</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Smoking: 10–25%", "Vaporizing: 15–35%", "Edibles (fasted): 4–8%", "Edibles (with fat): 10–20%", "Sublingual: 20–35%", "Transdermal patch: 45–80%", "IV (research only): ~100%"].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span><span>{f}</span></li>
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
