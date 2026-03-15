import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Therapeutic & Medicinal Applications of Cannabis | StrainHub Learn",
  description: "Evidence-based guide to the medicinal applications of cannabis — pain, epilepsy, nausea, MS, PTSD, anxiety, and the conditions with the strongest clinical support.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/effects" className="hover:text-black">Effects</Link><span>/</span>
          <span className="text-black font-semibold">Therapeutic & Medicinal Applications</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0fdf4", color: "#15803d" }}>
            💊 Effects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Therapeutic & Medicinal Applications</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis medicine is real and growing. Here&apos;s an honest assessment of which conditions have strong clinical evidence, which are promising but preliminary, and what the approved pharmaceutical options are.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Strong Evidence: Pain</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Chronic pain is the most common reason people use medical cannabis, and it has the strongest clinical evidence base. A 2017 National Academies of Sciences meta-analysis concluded there is &quot;substantial evidence&quot; that cannabis is effective for treating chronic pain in adults. Multiple randomized controlled trials support THC and CBD for neuropathic pain (nerve damage), cancer-related pain, and musculoskeletal pain. The mechanism involves CB1/CB2 receptor modulation of pain signaling at spinal and supraspinal levels, plus TRPV1 channel modulation. Nabiximols (Sativex) — a 1:1 THC:CBD oromucosal spray — is approved in over 30 countries for cancer pain and MS-related spasticity.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Strong Evidence: Epilepsy</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Epilepsy has the gold standard of cannabis evidence — an FDA-approved drug. Epidiolex (pharmaceutical CBD) received FDA approval in 2018 for Dravet syndrome and Lennox-Gastaut syndrome, two treatment-resistant forms of childhood epilepsy. Clinical trials showed a 39–42% reduction in seizure frequency vs. placebo — a clinically meaningful result for patients who had failed multiple other medications. The anticonvulsant mechanism appears to involve CBD&apos;s modulation of sodium and potassium channels, GPR55 antagonism, and TRPV1 desensitization rather than CB1/CB2 pathways. Whole-plant cannabis extracts (high-CBD strains like Charlotte&apos;s Web) showed benefit in observational studies before the pharmaceutical version was developed.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Strong Evidence: Nausea & Appetite (Chemotherapy, HIV)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Dronabinol (synthetic THC) and nabilone (synthetic THC analog) have been FDA-approved since 1985 for chemotherapy-induced nausea and vomiting, and dronabinol for HIV/AIDS-related anorexia and weight loss. THC&apos;s antiemetic effects are mediated by CB1 receptors in the brainstem dorsal vagal complex and nucleus tractus solitarius — areas central to the vomiting reflex. Survey data consistently shows cancer patients prefer whole-plant cannabis to synthetic dronabinol for both efficacy and tolerability, though head-to-head RCTs are limited. Appetite stimulation in HIV wasting is clinically meaningful — associated with significant weight gain and improved quality of life in trials.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Good Evidence: Multiple Sclerosis Spasticity</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Muscle spasticity in multiple sclerosis is one of the best-evidenced medical indications outside of pain and epilepsy. Nabiximols (Sativex) is approved specifically for MS spasticity in over 25 countries. Multiple phase III RCTs showed significant reductions in patient-reported spasticity, spasm frequency, and sleep disturbance. The mechanism involves CB1 receptor-mediated modulation of GABA and glutamate release in spinal circuits. THC&apos;s muscle-relaxant properties also apply to spasticity from spinal cord injury and cerebral palsy, though evidence is less extensive.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Promising: PTSD, Anxiety & Sleep</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">PTSD is one of the most common medical cannabis indications and has a plausible biological basis — the endocannabinoid system is directly involved in fear memory extinction. Multiple observational studies and several small RCTs show cannabis reduces PTSD symptom severity, particularly nightmares (via CB1 receptor suppression of REM sleep). Nabilone has been studied for PTSD nightmares with positive results. For anxiety, CBD has demonstrated efficacy in single-dose studies and small trials for social anxiety disorder. However, long-term RCTs are lacking, and the picture is complicated by THC potentially worsening anxiety at higher doses. Sleep improvement is reported by many users, primarily through THC&apos;s sedating effects — though chronic use may suppress REM sleep and worsen sleep architecture long-term.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Evidence Level</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "✅ Strong: Chronic pain",
                  "✅ Strong: Epilepsy (FDA-approved)",
                  "✅ Strong: Chemo nausea (FDA-approved)",
                  "✅ Good: MS spasticity (approved in 25+ countries)",
                  "🔬 Promising: PTSD, anxiety, sleep",
                  "🔬 Preliminary: IBD, autism, Parkinson's",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs">
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
