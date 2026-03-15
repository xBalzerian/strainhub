import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scientific & Medical History of Cannabis | StrainHub Learn",
  description: "From Raphael Mechoulam's isolation of THC to the discovery of the endocannabinoid system — the complete scientific history of cannabis research.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Scientific & Medical History</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            🔬 History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Scientific & Medical History</h1>
          <p className="text-gray-500 text-lg leading-relaxed">The science of cannabis has a surprisingly rich history — from ancient pharmacopeias to the 1964 isolation of THC, to the discovery of the endocannabinoid system, one of the most significant findings in 20th-century biology.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Early Pharmacology (Ancient – 1800s)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The <em>Shennong Bencao Jing</em> (Divine Farmer&apos;s Materia Medica, ~200 CE) recommends cannabis for pain, gout, rheumatism, constipation, and malaria. The Egyptian Ebers Papyrus (~1550 BCE) mentions it for inflammation. In 1839, Irish physician William Brooke O&apos;Shaughnessy published a landmark paper after studying cannabis medicine in India — demonstrating efficacy for pain, muscle spasms, and cholera-induced convulsions. This introduced cannabis to Western medicine. By 1850, the US Pharmacopeia listed cannabis as a recognized treatment, and major pharmaceutical companies sold cannabis tinctures commercially until the 1937 prohibition.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Isolation of THC (1964)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The modern scientific era began when Israeli chemist <strong>Raphael Mechoulam</strong> and colleague Yechiel Gaoni at the Hebrew University of Jerusalem isolated, identified, and synthesized delta-9-tetrahydrocannabinol (THC) in 1964 — the primary psychoactive compound in cannabis. This was a monumental breakthrough: for the first time, researchers could study a pure, known compound rather than the whole plant. Mechoulam had earlier isolated CBD in 1963. He would go on to make three more landmark discoveries, earning the title &quot;father of cannabis research&quot; before his death in 2023 at age 92.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Discovery of the Endocannabinoid System (1988–1993)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The most consequential discovery in cannabis science — and arguably in neuroscience — was the endocannabinoid system (ECS). In 1988, Allyn Howlett and William Devane discovered CB1 receptors in rat brains — specific binding sites for THC. This implied the brain had its own cannabis-like system. In 1992, Mechoulam&apos;s team isolated <strong>anandamide</strong> (from the Sanskrit <em>ananda</em>, meaning bliss) — the first endogenous cannabinoid, the brain&apos;s own THC equivalent. CB2 receptors were identified in 1993. The ECS — regulating mood, pain, appetite, memory, immune function, and sleep — is now recognized as one of the most widespread receptor systems in the human body, present in virtually every organ.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CBD Research & the First FDA Approval (1990s–2018)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">CBD was first isolated in 1940 by Roger Adams at the University of Illinois, but its full significance wasn&apos;t understood for decades. Research in the 1990s began revealing its anticonvulsant, anti-inflammatory, and anxiolytic properties without psychoactivity. GW Pharmaceuticals (UK) began developing Epidiolex — a purified CBD oral solution for treatment-resistant childhood epilepsy (Dravet syndrome and Lennox-Gastaut syndrome) — in the early 2000s. In 2018, Epidiolex became the first FDA-approved cannabis-derived pharmaceutical. Its approval was a watershed moment, legitimizing cannabis as medicine in the eyes of federal regulators for the first time since 1942.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Research Gap & What Comes Next</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Schedule I classification made rigorous cannabis research in the US nearly impossible for 50 years. Researchers needed DEA licenses, could only access cannabis from a single federally licensed farm at the University of Mississippi (notorious for producing poor-quality material unlike anything sold in dispensaries), and struggled to obtain institutional approval. This created a massive evidence gap. The DEA expanded licensed cultivators in 2021. The proposed rescheduling to Schedule III (2024) would transform research access — allowing pharmaceutical-grade studies, clinical trials, and eventually a new generation of cannabis-derived medicines.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "O'Shaughnessy introduced cannabis to Western medicine: 1839",
                  "CBD isolated: Roger Adams, 1940",
                  "THC isolated: Mechoulam & Gaoni, 1964",
                  "CB1 receptors discovered: Howlett, 1988",
                  "Anandamide discovered: Mechoulam, 1992",
                  "First FDA cannabis drug (Epidiolex): 2018",
                  "DEA expanded cultivator licenses: 2021",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/learn/history" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to History</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
