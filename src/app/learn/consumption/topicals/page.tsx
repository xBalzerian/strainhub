import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Topicals: Creams, Balms & Transdermal Patches | StrainHub Learn",
  description: "How cannabis topicals work, the difference between topical and transdermal, what conditions they help, and why they don't get you high.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/consumption" className="hover:text-black">Consumption</Link><span>/</span>
          <span className="text-black font-semibold">Topicals & Transdermal</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
            🧴 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Topicals & Transdermal</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis topicals deliver cannabinoids directly to skin and local tissue — without entering the bloodstream in meaningful amounts. They don&apos;t get you high, but they can be genuinely effective for localized pain, inflammation, and skin conditions.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Topical vs. Transdermal: A Critical Distinction</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">These terms are often used interchangeably but mean very different things. <strong>Topicals</strong> (creams, balms, lotions, salves) are designed to act locally in the skin and underlying tissue — they do not penetrate into the bloodstream in significant amounts. CB1 and CB2 receptors are present in the skin (keratinocytes, mast cells, sensory nerve fibers), which is why topicals can produce local anti-inflammatory and analgesic effects. <strong>Transdermal</strong> products (patches, some gels) are specifically formulated with penetration enhancers to push cannabinoids through the skin barrier into systemic circulation — they DO enter the bloodstream, can produce psychoactive effects (if THC-containing), and can cause a positive drug test. When choosing a product, confirm which type you&apos;re getting.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">What Topicals Can Help With</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Evidence and widespread anecdotal reports support topicals for: localized joint and muscle pain (arthritis, sports injuries, fibromyalgia trigger points), skin inflammation (eczema, psoriasis — CB2 receptor modulation reduces keratinocyte hyperproliferation), neuropathic pain in peripheral nerves close to the surface (peripheral neuropathy in hands and feet), headaches when applied to temples and neck muscles, and post-workout soreness. The CB2 receptors in skin tissue respond to both THC and CBD without requiring systemic absorption. Many topicals combine cannabinoids with other anti-inflammatory ingredients (menthol, arnica, camphor, turmeric) for additive local effects.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">CBD vs. THC Topicals</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Both CBD and THC interact with skin CB receptors, but their profiles differ. CBD is widely available in topicals due to hemp legality and its non-psychoactive profile. It has demonstrated anti-inflammatory effects in skin cell studies and clinical reports for eczema and psoriasis. THC-containing topicals are available in legal cannabis states and are favored by many users for deeper pain relief — THC activates CB1 receptors on peripheral sensory neurons, which CBD does not. Some practitioners recommend 1:1 THC:CBD topicals for optimal local analgesia. Neither type will cause intoxication when used as a standard topical (non-transdermal). Full-spectrum topicals include terpenes (menthol-like terpenes like terpineol and limonene have their own topical anti-inflammatory properties) for a potential entourage effect at the skin level.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Transdermal Patches</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Transdermal patches use chemical penetration enhancers (ethanol, propylene glycol, fatty acids) to drive cannabinoids through the skin into systemic circulation over 8–12 hours. They provide steady, consistent blood levels — making them attractive for chronic pain management where consistent plasma concentrations are therapeutic. Mary&apos;s Medicinals and other companies offer patches in THC-only, CBD-only, CBN (sleep), and 1:1 formulations. Because they deliver THC systemically, they will cause intoxication and can produce a positive drug test. Apply to venous areas (inner wrist, ankle, inner arm) for better absorption. Transdermal delivery avoids GI and respiratory exposure — potentially valuable for patients who can&apos;t smoke or have GI issues affecting edible absorption.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Topicals = local effect, no high, no drug test", "Transdermal = systemic, can cause high + positive test", "CB1 & CB2 receptors present throughout skin tissue", "Best for: joint pain, arthritis, skin inflammation, neuropathy", "Apply transdermal to venous inner wrist/ankle for best absorption", "Full-spectrum includes terpenes for additive topical effects"].map(f => (
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
