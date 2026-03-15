import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Cannabis Terpene Profiles & Their Effects | StrainHub Learn", description: "The major cannabis terpenes — myrcene, limonene, pinene, caryophyllene, linalool, terpinolene, humulene — what they smell like, where they're found, and how they shape your experience." };
export default function Page() {
  const terpenes = [
    { name: "Myrcene", smell: "Earthy, musky, herbal, mango", effect: "Sedating, relaxing, body-heavy. Enhances THC absorption across blood-brain barrier.", strains: "OG Kush, Granddaddy Purple, Blue Dream", color: "bg-green-50 border-green-200" },
    { name: "Limonene", smell: "Citrus, lemon, orange", effect: "Uplifting, mood-elevating, anti-anxiety. Stimulates serotonin and dopamine.", strains: "Super Lemon Haze, Zkittlez, Wedding Cake", color: "bg-yellow-50 border-yellow-200" },
    { name: "Pinene (α & β)", smell: "Pine, fresh forest, rosemary", effect: "Alert, clear-headed. Bronchodilator. May counteract THC-induced memory impairment.", strains: "Jack Herer, Blue Dream, Snoop's Dream", color: "bg-teal-50 border-teal-200" },
    { name: "Caryophyllene", smell: "Spicy, peppery, woody, clove", effect: "Anti-inflammatory, analgesic. Only terpene that directly binds CB2 receptors.", strains: "Girl Scout Cookies, Gelato, Sour Diesel", color: "bg-orange-50 border-orange-200" },
    { name: "Linalool", smell: "Floral, lavender, spice", effect: "Calming, anxiolytic, sedating. Modulates glutamate and GABA neurotransmission.", strains: "Lavender, Amnesia Haze, LA Confidential", color: "bg-purple-50 border-purple-200" },
    { name: "Terpinolene", smell: "Floral, piney, herbal, fresh", effect: "Uplifting, mildly sedating at high concentration. Antioxidant properties.", strains: "Jack Herer, Ghost Train Haze, Golden Pineapple", color: "bg-blue-50 border-blue-200" },
    { name: "Humulene", smell: "Hoppy, earthy, woody (hops)", effect: "Anti-inflammatory, appetite-suppressing, antibacterial.", strains: "Girl Scout Cookies, Sour Diesel, White Widow", color: "bg-amber-50 border-amber-200" },
    { name: "Ocimene", smell: "Sweet, herbal, woody, tropical", effect: "Uplifting, antiviral, anti-fungal. Common in high-THC sativa-dominant varieties.", strains: "Strawberry Cough, Dutch Treat, Clementine", color: "bg-rose-50 border-rose-200" },
  ];
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white"><div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-black">Home</Link><span>/</span><Link href="/learn" className="hover:text-black">Learn</Link><span>/</span><Link href="/learn/strains" className="hover:text-black">Strains</Link><span>/</span><span className="text-black font-semibold">Terpene Categories</span></div></div>
      <div className="bg-white border-b-2 border-black"><div className="max-w-4xl mx-auto px-6 py-14"><div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#faf5ff", color: "#7e22ce" }}>🌿 Strains</div><h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Terpene Profiles & Their Effects</h1><p className="text-gray-500 text-lg leading-relaxed">Terpenes are aromatic compounds that give each strain its unique smell, flavor, and effect profile. Over 200 have been identified in cannabis — but 8 dominate most commercial varieties and drive the most meaningful differences in experience.</p></div></div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <section className="mb-4"><h2 className="text-2xl font-black text-black mb-3">Why Terpenes Matter More Than Indica/Sativa</h2><p className="text-gray-600 leading-relaxed text-[17px]">Terpenes are responsible for the distinct effect differences between strains — far more reliably than the indica/sativa label. They modulate the effects of cannabinoids (the &quot;entourage effect&quot;), interact with their own receptors in the nervous system, and influence how quickly THC crosses the blood-brain barrier. A myrcene-dominant strain will feel different from a limonene-dominant strain at the same THC percentage. Learning to read terpene profiles is the single most effective upgrade you can make to your cannabis knowledge.</p></section>
        <div className="grid md:grid-cols-2 gap-4">
          {terpenes.map(t => (
            <div key={t.name} className={`border-2 rounded-2xl p-5 ${t.color}`}>
              <div className="font-black text-lg text-black mb-1">{t.name}</div>
              <div className="text-xs text-gray-500 mb-2 font-semibold">Aroma: {t.smell}</div>
              <p className="text-sm text-gray-700 mb-2">{t.effect}</p>
              <div className="text-xs text-gray-400 font-semibold">Found in: {t.strains}</div>
            </div>
          ))}
        </div>
        <section className="mt-8"><h2 className="text-2xl font-black text-black mb-3">The Entourage Effect</h2><p className="text-gray-600 leading-relaxed text-[17px]">The entourage effect describes the synergistic interaction between cannabinoids and terpenes — producing effects that neither compound achieves alone. Beta-caryophyllene activating CB2 receptors while THC activates CB1 produces stronger anti-inflammatory analgesia than THC alone. Myrcene increases cell membrane permeability, allowing more THC into the brain faster. Pinene inhibits acetylcholinesterase (like the memory drug donepezil), potentially counteracting THC-induced short-term memory impairment. Linalool modulates GABA — enhancing the anxiolytic properties of CBD. Full-spectrum products (whole-plant extracts) consistently outperform THC isolates in patient surveys and several clinical measures — this is the entourage effect in action.</p></section>
        <Link href="/learn/strains" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Strains</Link>
      </div>
    </div>
  );
}
