import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabinoid Pharmacology: THC, CBD & Beyond | StrainHub Learn",
  description: "Deep dive into cannabinoid pharmacology — how THC, CBD, CBG, CBN, THCV, and CBC interact with the endocannabinoid system and produce their effects.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
          <span className="text-black font-semibold">Cannabinoid Pharmacology</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#15803d" }}>
            🧬 Effects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Cannabinoid Pharmacology</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Over 100 cannabinoids have been identified in cannabis. Each has a distinct pharmacological profile — binding different receptors, with different potencies, producing different effects. Here&apos;s what the science says about the most important ones.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">THC (Delta-9-Tetrahydrocannabinol)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">THC is the primary psychoactive cannabinoid, present in most cannabis strains at 15–30%+ in modern cultivars. It is a partial agonist at both CB1 and CB2 receptors — meaning it activates them but not to the maximum possible extent, which limits its therapeutic ceiling compared to a full agonist. CB1 activation produces euphoria, altered perception, appetite stimulation, analgesia, and antiemesis. CB2 activation (primarily in immune tissue) contributes anti-inflammatory effects. THC is also a weak agonist at GPR55 and TRP channels, contributing to pain modulation. Medical applications include pain, nausea, appetite loss, muscle spasticity (MS), and PTSD.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CBD (Cannabidiol)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">CBD is non-intoxicating and has a complex pharmacology — unlike THC, it does not directly activate CB1 or CB2 receptors. Instead, it acts as a negative allosteric modulator of CB1 (reducing THC&apos;s binding efficiency — the mechanism behind CBD counteracting THC-induced anxiety), an agonist at serotonin 5-HT1A receptors (anxiolytic, antidepressant effects), a modulator of TRPV1 channels (pain and inflammation), and an inhibitor of adenosine reuptake (anti-inflammatory, neuroprotective). CBD also inhibits the enzyme FAAH, which breaks down anandamide — effectively raising the brain&apos;s own endocannabinoid levels. The only FDA-approved CBD drug, Epidiolex, is used for treatment-resistant epilepsy.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CBG (Cannabigerol)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">CBG is the &quot;mother cannabinoid&quot; — CBGA (its acidic precursor) is the biosynthetic parent of THC, CBD, and CBC. It&apos;s typically present at low concentrations (under 1%) in mature cannabis but high in early-harvest and purpose-bred plants. CBG is a partial agonist at CB1 and CB2 receptors and an alpha-2 adrenergic agonist. Research indicates potential as an antibacterial (particularly against MRSA), neuroprotectant (Huntington&apos;s disease animal models), anti-inflammatory (IBD models), and appetite stimulant independent of CB1. Its low psychoactivity makes it attractive for daytime formulations.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CBN (Cannabinol)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">CBN is a degradation product of THC — it forms as cannabis ages and THC oxidizes. It is mildly psychoactive (approximately 25% the potency of THC) and primarily a CB1 partial agonist. CBN has been marketed heavily as a sleep aid, but the evidence for a direct sedative effect is thin — most studies suggesting sleep effects used CBN in combination with THC. Its best-documented properties are as an antibacterial agent (active against MRSA) and a mild analgesic. High CBN levels in a product typically indicate aged or improperly stored cannabis rather than intentional formulation, though dedicated CBN products are now being produced from hemp.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">THCV (Tetrahydrocannabivarin)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">THCV has a fascinating pharmacological profile that changes with dose. At low doses it acts as a CB1 antagonist — blocking rather than activating the receptor, which suppresses appetite (the opposite of THC) and may reduce anxiety. At high doses it becomes a CB1 agonist, producing mild psychoactivity. It is also a CB2 agonist at all doses, contributing anti-inflammatory effects. THCV is naturally present at higher concentrations in African landrace strains (particularly South African Durban Poison lines). Research has explored its potential for diabetes (glucose regulation), Parkinson&apos;s (neuroprotection), and weight management. Sometimes called the &quot;sports car of cannabinoids&quot; for its clear-headed, energetic, appetite-suppressing profile.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CBC (Cannabichromene)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">CBC is non-psychoactive and typically the third most abundant cannabinoid in cannabis, though it receives far less attention than THC or CBD. It does not bind efficiently to CB1 or CB2 receptors but instead interacts with TRPA1 and TRPV1 channels (pain and inflammation) and inhibits endocannabinoid uptake. CBC has demonstrated potent anti-inflammatory effects (comparable to non-steroidal anti-inflammatory drugs in animal models), antidepressant properties, and neurogenesis-promoting effects in adult hippocampal stem cells. It is also synergistic with THC and CBD in the entourage effect, potentially enhancing their analgesic activity.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "100+ cannabinoids identified in cannabis",
                  "THC: partial CB1/CB2 agonist — psychoactive",
                  "CBD: non-psychoactive, modulates CB1 allosterically",
                  "CBG: precursor to THC, CBD & CBC",
                  "CBN: THC oxidation product, mildly psychoactive",
                  "THCV: CB1 antagonist at low dose, agonist at high dose",
                  "CBC: non-psychoactive, strong anti-inflammatory",
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
