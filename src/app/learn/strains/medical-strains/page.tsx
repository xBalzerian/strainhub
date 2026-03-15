import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Best Cannabis Strains for Medical Use | StrainHub Learn", description: "Evidence-informed guide to cannabis strains for specific medical conditions — chronic pain, insomnia, anxiety, epilepsy, nausea, PTSD, and inflammation." };
export default function Page() {
  const conditions = [
    { condition: "Chronic Pain", why: "High THC activates CB1 receptors on pain-signaling neurons. Myrcene and caryophyllene enhance anti-inflammatory effects.", strains: "ACDC (high CBD, mild), OG Kush, White Widow, Pennywise (1:1)", tip: "1:1 THC:CBD ratio provides pain relief with less anxiety than high-THC alone." },
    { condition: "Insomnia & Sleep", why: "Myrcene is sedating; CBN (in aged cannabis) mildly sedating; THC reduces REM sleep but increases total sleep time short-term.", strains: "Granddaddy Purple, Northern Lights, Bubba Kush, God's Gift", tip: "Use 2–3 hours before bed. Tolerance builds quickly — cycle off periodically." },
    { condition: "Anxiety", why: "CBD modulates serotonin 5-HT1A receptors. Linalool has GABA-modulating anxiolytic effects. Low-dose THC can reduce anxiety; high doses increase it.", strains: "ACDC, Harlequin, Cannatonic, Charlotte's Web, Remedy", tip: "High-CBD, low-THC strains are safest. Avoid high-THC products for anxiety disorders." },
    { condition: "PTSD", why: "Endocannabinoid system directly regulates fear memory extinction. THC suppresses nightmares via REM suppression. CBD reduces hyperarousal.", strains: "Pennywise, Harlequin, Blue Dream, Granddaddy Purple", tip: "Work with a cannabis-knowledgeable provider. Nabilone (synthetic THC) has clinical evidence for PTSD nightmares." },
    { condition: "Nausea / Chemotherapy", why: "THC is an FDA-approved antiemetic (dronabinol). CB1 receptors in brainstem suppress vomiting reflex. CBD reduces nausea without psychoactivity.", strains: "OG Kush, Sour Diesel, Durban Poison, ACDC", tip: "Inhalation has fastest onset for acute nausea. Sublingual tincture for sustained prevention." },
    { condition: "Epilepsy / Seizures", why: "CBD modulates sodium/potassium channels and GPR55 — anticonvulsant mechanisms independent of CB1/CB2. FDA-approved as Epidiolex.", strains: "Charlotte's Web, ACDC, Cannatonic, Ringo's Gift", tip: "Medical CBD for epilepsy requires pharmaceutical-grade product and physician oversight. Self-medicating is not appropriate for epilepsy." },
    { condition: "Inflammation / Arthritis", why: "Caryophyllene directly activates CB2 receptors on immune cells. CBD reduces inflammatory cytokines. THC modulates immune response via CB2.", strains: "Girl Scout Cookies, Gelato, Harlequin, White Widow", tip: "Topicals are effective for localized joint inflammation without systemic effects." },
    { condition: "Depression", why: "CBD acts on 5-HT1A serotonin receptors. THC increases dopamine short-term. CBC shows neurogenesis effects in hippocampus.", strains: "Jack Herer, Harlequin, Cinex, Pineapple Express", tip: "High-THC can worsen depression with heavy use. Low-to-moderate doses, limonene-dominant strains preferred." },
  ];
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white"><div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-black">Home</Link><span>/</span><Link href="/learn" className="hover:text-black">Learn</Link><span>/</span><Link href="/learn/strains" className="hover:text-black">Strains</Link><span>/</span><span className="text-black font-semibold">Medical Strains</span></div></div>
      <div className="bg-white border-b-2 border-black"><div className="max-w-4xl mx-auto px-6 py-14"><div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#faf5ff", color: "#7e22ce" }}>💊 Strains</div><h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Strains for Medical Use</h1><p className="text-gray-500 text-lg leading-relaxed">Different conditions benefit from different cannabinoid and terpene profiles. This guide explains the <em>why</em> behind each recommendation — not just a list of names, but the pharmacological reasoning so you can make informed decisions.</p></div></div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-semibold mb-6">⚠️ This is educational information only. Always consult a healthcare provider before using cannabis to treat a medical condition, especially if you take prescription medications.</div>
        <div className="grid md:grid-cols-2 gap-4">
          {conditions.map(c => (
            <div key={c.condition} className="bg-white border-2 border-gray-100 hover:border-black rounded-2xl p-5 transition-all">
              <div className="font-black text-base text-black mb-2">{c.condition}</div>
              <p className="text-xs text-gray-600 mb-2"><strong>Why it works:</strong> {c.why}</p>
              <p className="text-xs text-gray-700 mb-2"><strong>Recommended strains:</strong> {c.strains}</p>
              <div className="text-xs bg-green-50 border border-green-200 rounded-lg p-2 text-green-800 font-semibold">💡 {c.tip}</div>
            </div>
          ))}
        </div>
        <section className="mt-8"><h2 className="text-2xl font-black text-black mb-3">How to Use This Guide</h2><p className="text-gray-600 leading-relaxed text-[17px]">Use StrainHub&apos;s search and filter tools to find strains matching these profiles — filter by effect, terpene, CBD content, and condition. The strain names listed are starting points — your local dispensary may not carry all of them, but staff can recommend alternatives with similar cannabinoid and terpene profiles. For serious medical conditions (epilepsy, cancer-related symptoms, PTSD), seek out a physician who specializes in cannabis medicine — organizations like the Society of Cannabis Clinicians (SCC) and the American Academy of Cannabinoid Medicine (AACM) can help locate qualified providers.</p></section>
        <Link href="/learn/strains" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Strains</Link>
      </div>
    </div>
  );
}
