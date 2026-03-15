import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emerging Cannabis Consumption Methods | StrainHub Learn",
  description: "Cannabis suppositories, inhalers, nasal sprays, capsules, beverages, and what's coming next in cannabis delivery technology.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/consumption" className="hover:text-black">Consumption</Link><span>/</span>
          <span className="text-black font-semibold">Emerging Methods</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
            🚀 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Emerging & Novel Methods</h1>
          <p className="text-gray-500 text-lg leading-relaxed">The legal cannabis industry is driving rapid innovation in delivery technology — from pharmaceutical-grade inhalers to cannabis beverages to suppositories. Here&apos;s what&apos;s available now and what&apos;s coming.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Cannabis Beverages</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis-infused beverages are one of the fastest-growing segments in the legal market. Traditional oil-in-water formulations had poor bioavailability and unpredictable onset — similar to edibles. Nanoemulsification technology changed this: by breaking cannabinoids into water-soluble nano-droplets (20–200nm), beverages can now achieve onset in 10–20 minutes with more predictable dose response. Companies like Cann, Keef, and Wunder have built significant markets around low-dose (2–5mg THC) sparkling drinks positioned as alcohol alternatives. Canada has become a testing ground for cannabis beverages — launched as a legal category in 2020. The social drinking occasion is the primary market driver.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Metered-Dose Inhalers (MDIs)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Pharmaceutical-style metered-dose inhalers deliver precise doses of cannabinoid formulation to the lungs — similar to asthma inhalers. Each actuation delivers a consistent, measurable dose (typically 0.5–1mg THC/CBD per puff) without combustion. Companies including Vapen, Aeroinhaler, and several pharmaceutical developers are advancing this technology. MDIs offer the fastest onset of any non-IV method (under 2 minutes), highest reproducibility, and no combustion or thermal degradation. They are particularly promising for medical applications requiring rapid, precise dosing — acute pain, anxiety, breakthrough symptoms. Currently available in limited markets; pharmaceutical-grade versions are in clinical development.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Suppositories</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Rectal and vaginal cannabis suppositories have significant legitimate medical applications despite the social stigma. Rectal bioavailability is estimated at 50–70% — substantially higher than oral — and bypasses first-pass metabolism. Onset is 15–30 minutes with 4–8 hour duration. They are primarily used for conditions where other methods are impractical: severe GI disorders that impair oral absorption, post-surgical patients who can&apos;t inhale, palliative care patients, and severe nausea/vomiting (when swallowing is impossible). Vaginal suppositories are used specifically for menstrual pain and pelvic inflammatory conditions — with cannabinoids acting locally on uterine and pelvic tissue CB receptors. Multiple medical cannabis companies now offer suppository formulations.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Capsules & Softgels</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis capsules and softgels are the most familiar pharmaceutical format and offer discretion, precise dosing, and convenience. Standard capsules behave like edibles — oil in a gelatin or HPMC shell, absorbed through the GI tract with similar bioavailability (4–20%) and onset (45–120 minutes). Softgels with lipid formulations (typically using MCT or sesame oil as carrier) have improved absorption profiles. Decarboxylated whole-plant extract capsules preserve the entourage effect. Time-release capsule formulations (designed to dissolve at different GI sites) are in development for extended overnight pain relief. For medical patients seeking a pharmaceutical feel without smoking or complex dosing, capsules are the most straightforward option.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">What&apos;s Coming: The Next Frontier</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Several technologies are in active development: <strong>Nasal sprays</strong> — intranasal delivery bypasses the blood-brain barrier via olfactory pathways, with extremely fast CNS onset (under 2 minutes) and high bioavailability; currently in clinical trials for pain and anxiety. <strong>Ocular drops</strong> — being researched for glaucoma, where THC&apos;s intraocular pressure-reducing effects are well-documented but current topical delivery to the eye is inefficient. <strong>Implantable slow-release devices</strong> — analogous to hormonal implants, for sustained release over weeks or months for chronic conditions. <strong>Personalized formulations</strong> — pharmacogenomic testing (CYP2C9, CYP3A4 genotyping) to predict individual metabolism and recommend optimized cannabinoid ratios and doses.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Nanoemulsion beverages onset: 10–20 min", "MDI inhalers: fastest onset, most precise dosing", "Rectal bioavailability: 50–70%", "Suppositories: onset 15–30 min, duration 4–8 hrs", "Capsules = edibles pharmacokinetically", "Nasal sprays in clinical trials for rapid CNS delivery"].map(f => (
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
