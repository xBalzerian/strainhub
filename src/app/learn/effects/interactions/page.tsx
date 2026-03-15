import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Drug Interactions & Contraindications | StrainHub Learn",
  description: "Critical guide to cannabis drug interactions — blood thinners, SSRIs, benzos, opioids, and the CYP450 enzyme system. What to know before combining cannabis with medication.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
          <span className="text-black font-semibold">Drug Interactions & Contraindications</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#15803d" }}>
            ⚠️ Effects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Drug Interactions & Contraindications</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis interacts with dozens of prescription medications through the CYP450 enzyme system and pharmacodynamic overlap. This is one of the most clinically important and under-discussed aspects of cannabis use.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The CYP450 Enzyme System</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The primary mechanism of cannabis drug interactions is through the cytochrome P450 (CYP450) enzyme family — the liver enzymes responsible for metabolizing approximately 60% of all clinical medications. CBD is a potent inhibitor of CYP3A4, CYP2C9, and CYP2C19 — enzymes that process blood thinners, antiepileptics, statins, immunosuppressants, and many other drugs. When CBD inhibits these enzymes, the drugs they metabolize accumulate to higher-than-expected blood levels, effectively increasing their dose and risk of side effects. THC similarly inhibits CYP1A2 and CYP2C9. This is not a theoretical risk — the Epidiolex clinical trials documented significant CBD-drug interactions requiring dose adjustments in patients also taking clobazam and valproate.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Warfarin & Blood Thinners</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The most clinically dangerous interaction is between CBD and warfarin (Coumadin), a narrow-therapeutic-index anticoagulant. CBD inhibits CYP2C9, the primary enzyme that breaks down warfarin, causing warfarin levels to rise significantly — increasing the risk of serious or fatal bleeding. Multiple case reports document INR levels doubling or tripling in warfarin patients who began using CBD. Anyone taking warfarin or other anticoagulants (rivaroxaban, apixaban — though these interact via CYP3A4) should consult their prescribing physician before using any cannabis product and have INR monitored closely if they choose to proceed.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CNS Depressants: Alcohol, Benzos & Opioids</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis has additive CNS depressant effects with alcohol, benzodiazepines, opioids, barbiturates, and sedating antihistamines. Combined with alcohol, cannabis significantly impairs driving more than either alone — multiple studies show additive cognitive and psychomotor impairment. Combined with opioids, the picture is complex: some research suggests cannabis allows opioid dose reduction (opioid-sparing effect), which is therapeutically useful, while other data shows combined use increases sedation and fall risk in older adults. Combined with benzodiazepines, cannabis can enhance sedation and respiratory depression. The general principle: any CNS depressant combination requires caution and medical discussion.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">SSRIs, SNRIs & Psychiatric Medications</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">CBD inhibits CYP2D6, the enzyme responsible for metabolizing many antidepressants and antipsychotics including fluoxetine (Prozac), paroxetine (Paxil), haloperidol, risperidone, and clozapine. This can increase their blood levels, enhancing both therapeutic effects and side effects. THC can induce mania in individuals with bipolar disorder and potentially reduce the effectiveness of antipsychotic medications by activating dopamine pathways these drugs are trying to suppress. Conversely, many patients with depression and anxiety use cannabis successfully alongside SSRIs with medical supervision. The key is open communication with prescribing physicians and monitoring for changes in medication effects.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Contraindications: When to Avoid Cannabis Entirely</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Absolute or strong contraindications based on current evidence include: personal or strong family history of schizophrenia or psychotic disorder (THC may precipitate onset), pregnancy and breastfeeding (THC crosses the placenta and blood-brain barrier; associated with low birth weight and neurodevelopmental effects), adolescent use under 18 (developing brain vulnerability), unstable cardiovascular disease or recent cardiac events (tachycardia risk), and concurrent use of any immunosuppressant (transplant patients — cannabis can harbor fungal pathogens dangerous to immunocompromised individuals). Always disclose cannabis use to healthcare providers — it directly affects medication management decisions.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "CBD inhibits CYP3A4, CYP2C9, CYP2C19 — affects 60% of medications",
                  "Most dangerous: CBD + warfarin (bleeding risk)",
                  "Additive CNS depression with alcohol, benzos, opioids",
                  "Avoid in pregnancy — THC crosses placenta",
                  "Avoid in personal/family history of psychosis",
                  "Always disclose to prescribing physicians",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 font-semibold">⚠️ This is educational information only. Always consult a healthcare provider before combining cannabis with any medication.</div>
            <Link href="/learn/effects" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Effects</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
