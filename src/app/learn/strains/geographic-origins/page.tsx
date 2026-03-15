import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Cannabis Geographic Origins & Landrace Strains | StrainHub Learn", description: "The world's great landrace cannabis regions — Hindu Kush, Jamaican, Thai, Durban, Colombian, Afghani — and how geography shaped cannabis genetics." };
export default function Page() {
  const landraces = [
    { region: "Hindu Kush / Afghanistan", strains: "Afghan Kush, Hindu Kush", traits: "Short, dense, heavy resin, earthy hash aroma, extremely relaxing. Adapted to harsh mountain climate. Foundation of most modern indicas.", color: "bg-amber-50 border-amber-200" },
    { region: "Southeast Asia (Thailand, Laos)", strains: "Thai, Chocolate Thai, Lao", traits: "Tall, narrow leaves, very long flowering (14–16 weeks), cerebral energetic high, spicy/chocolate aroma. Foundation of many Haze varieties.", color: "bg-orange-50 border-orange-200" },
    { region: "South Africa (Durban)", strains: "Durban Poison", traits: "Vigorous, fast-flowering for a sativa (9–10 weeks), naturally high THCV, sweet anise/licorice aroma, clear-headed energetic high.", color: "bg-green-50 border-green-200" },
    { region: "Jamaica", strains: "Lamb's Bread, Jamaican", traits: "Tall, bright green, citrus-heavy aroma, uplifting spiritual quality. Historically associated with Rastafari tradition.", color: "bg-yellow-50 border-yellow-200" },
    { region: "Colombia", strains: "Colombian Gold, Santa Marta Gold", traits: "Tropical sativa, golden harvest color, sweet/floral/earthy aroma, energetic cerebral high. Major US import in 1970s.", color: "bg-red-50 border-red-200" },
    { region: "Mexico (Oaxaca, Acapulco)", strains: "Acapulco Gold, Oaxacan Highland", traits: "Medium height, golden/amber coloring at maturity, earthy/toffee aroma, balanced uplifting effects.", color: "bg-rose-50 border-rose-200" },
    { region: "India (Kerala, Himalayan)", strains: "Kerala Gold, Malana Cream", traits: "Diverse — from Himalayan charas-producing plants (dense, resinous) to tall Kerala sativas. Used for both fiber and charas production.", color: "bg-purple-50 border-purple-200" },
    { region: "Morocco / Lebanon", strains: "Ketama (Morocco), Lebanese Red", traits: "Hash-producing varieties, moderate resin, warm climate adapted. Foundation of European hash trade for decades.", color: "bg-teal-50 border-teal-200" },
  ];
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white"><div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-black">Home</Link><span>/</span><Link href="/learn" className="hover:text-black">Learn</Link><span>/</span><Link href="/learn/strains" className="hover:text-black">Strains</Link><span>/</span><span className="text-black font-semibold">Geographic Origins</span></div></div>
      <div className="bg-white border-b-2 border-black"><div className="max-w-4xl mx-auto px-6 py-14"><div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#faf5ff", color: "#7e22ce" }}>🗺️ Strains</div><h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Geographic Origins & Landrace Strains</h1><p className="text-gray-500 text-lg leading-relaxed">Landrace strains are cannabis varieties that evolved over centuries in isolation, adapting to specific climates, altitudes, and soils. They are the genetic foundation of virtually every modern cultivar — understanding them reveals the DNA of your favorite strains.</p></div></div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section><h2 className="text-2xl font-black text-black mb-3">What is a Landrace?</h2><p className="text-gray-600 leading-relaxed text-[17px] max-w-2xl">A landrace is a domesticated plant variety that developed over generations in a specific geographic region, adapting to local climate, soil, and cultivation practices without deliberate controlled breeding. Cannabis landraces reflect their environments: mountain varieties (Hindu Kush, Himalayan) are short, dense, and heavily resinous — adaptations to cold, short growing seasons. Equatorial varieties (Thai, Jamaican, Colombian) are tall, long-flowering, and energetically stimulating — adapted to year-round tropical heat. Modern cannabis hybrids are almost all crosses of landrace genetics, often optimized for indoor production at the expense of the nuanced regional character of the originals.</p></section>
        <div className="grid md:grid-cols-2 gap-4">
          {landraces.map(l => (
            <div key={l.region} className={`border-2 rounded-2xl p-5 ${l.color}`}>
              <div className="font-black text-base text-black mb-1">📍 {l.region}</div>
              <div className="text-xs text-gray-500 mb-2 font-bold">Key strains: {l.strains}</div>
              <p className="text-sm text-gray-700">{l.traits}</p>
            </div>
          ))}
        </div>
        <section><h2 className="text-2xl font-black text-black mb-3">Why Landrace Genetics Matter Today</h2><p className="text-gray-600 leading-relaxed text-[17px]">The modern cannabis industry has produced extraordinary variety, but at a cost: decades of indoor breeding for yield, potency, and bag appeal has narrowed the genetic diversity of commercially available cannabis. Landrace preservation projects — by seed banks like Ace Seeds, Cannabiogen, and the Sensi Seed Bank — work to maintain original regional genetics before they disappear. These genetics matter for: breeding resilience and pest-resistance back into commercial varieties, recovering unique terpene and cannabinoid profiles lost in hybridization, pharmaceutical research requiring specific phytochemical profiles, and cultural preservation of plant traditions that indigenous communities have maintained for centuries.</p></section>
        <Link href="/learn/strains" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to Strains</Link>
      </div>
    </div>
  );
}
