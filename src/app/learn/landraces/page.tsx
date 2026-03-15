import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Landrace Cannabis Strains — The Ancient Origins of Every Modern Strain | StrainHub",
  description:
    "Landrace cannabis strains are the ancient, geographically pure originals — Afghani, Thai, Colombian Gold, Hindu Kush, Durban Poison. Learn their history, traits, and which modern strains descended from them.",
  alternates: { canonical: "https://www.strainhub.org/learn/landraces" },
};

const LANDRACES = [
  {
    name: "Afghani",
    origin: "Afghanistan / Hindu Kush Mountains",
    flag: "🇦🇫",
    type: "Indica",
    typeColor: "text-indica",
    color: "bg-amber-50 border-amber-200",
    era: "Ancient — 3,000+ years of cultivation",
    traits: ["Short, stocky plant", "Dense, resinous buds", "Earthy, hash-like aroma", "High THC, heavy body effect", "Fast 7–8 week flower time"],
    terpenes: ["Myrcene", "Caryophyllene", "Pinene"],
    thc: "15–20%",
    descendants: ["OG Kush", "Blueberry", "Northern Lights", "Hash Plant", "Master Kush", "Bubba Kush"],
    history: "Afghani is arguably the most influential cannabis strain in history. Cultivated for thousands of years in the Hindu Kush mountain range, it was the primary source for the world's hashish trade — Afghan hash (charas) was consumed along the Silk Road for millennia. When Western breeders arrived in the 1960s–70s during the 'Hippie Trail' era, they brought Afghani seeds back and used them as the indica backbone for nearly every modern hybrid. Its exceptional resin production (evolved to protect against harsh mountain conditions) is why so many popular strains today are hash-heavy and dense.",
  },
  {
    name: "Hindu Kush",
    origin: "Pakistan / Afghanistan border region",
    flag: "🏔️",
    type: "Indica",
    typeColor: "text-indica",
    color: "bg-stone-50 border-stone-200",
    era: "Ancient",
    traits: ["Pure indica — compact and dense", "Thick coat of trichomes", "Sweet, earthy, sandalwood aroma", "Deep physical relaxation", "One of the few true pure indicas"],
    terpenes: ["Myrcene", "Caryophyllene", "Humulene"],
    thc: "15–20%",
    descendants: ["OG Kush", "Kush family strains", "Master Kush", "Purple Kush", "Critical Mass"],
    history: "Named for the mountain range spanning Pakistan and Afghanistan, Hindu Kush is one of the purest landrace indicas available. Unlike Afghani (which was extensively cross-bred), Hindu Kush genetics have been more carefully preserved. It was one of the first cannabis strains to be commercially distributed in seed form in the West, and the 'Kush' lineage it gave birth to — OG Kush, Purple Kush, Master Kush — has dominated the cannabis market for decades.",
  },
  {
    name: "Durban Poison",
    origin: "Durban, South Africa",
    flag: "🇿🇦",
    type: "Sativa",
    typeColor: "text-sativa",
    color: "bg-green-50 border-green-200",
    era: "Pre-colonial Africa",
    traits: ["Tall, fast-finishing for a sativa", "Unusually high THCV content", "Sweet, anise-like aroma", "Energetic, clear-headed high", "Exceptional trichome production"],
    terpenes: ["Terpinolene", "Myrcene", "Ocimene"],
    thc: "17–26%",
    descendants: ["Girl Scout Cookies", "Thin Mint GSC", "Sherbet", "Tropicana Cookies"],
    history: "Durban Poison comes from the port city of Durban on South Africa's east coast. It was brought to the US by cannabis activist Ed Rosenthal in the 1970s who recognized its exceptional properties. What makes Durban Poison unique among landraces is its naturally high THCV content — the rare cannabinoid associated with appetite suppression, energy, and faster, more clear-headed effects. Its genetics became the sativa backbone for the enormously popular GSC (Girl Scout Cookies) family of strains.",
  },
  {
    name: "Thai (Thai Stick)",
    origin: "Thailand",
    flag: "🇹🇭",
    type: "Sativa",
    typeColor: "text-sativa",
    color: "bg-yellow-50 border-yellow-200",
    era: "Centuries of cultivation",
    traits: ["Extremely tall (3–4m outdoors)", "Very long flowering time (14–16 weeks)", "Fruity, citrus, spicy aroma", "Intense cerebral, psychedelic high", "Thin, airy buds with enormous bags of trichomes"],
    terpenes: ["Limonene", "Terpinolene", "Caryophyllene"],
    thc: "18–22%",
    descendants: ["Voodoo", "Juicy Fruit", "Chocolope", "AK-47 (partial)", "Haze (partial)"],
    history: "Thai cannabis has been cultivated for centuries and 'Thai Stick' — buds tied to bamboo sticks — was one of the most prized cannabis imports to the US in the 1970s. Thai genetics contributed the soaring, trippy, psychedelic sativa character found in Haze strains and their many descendants. Thai landraces are notoriously difficult to grow outside tropical climates — their 14–16 week flowering time makes them impractical for most indoor growers, which is why Thai genetics are often blended with faster-flowering strains.",
  },
  {
    name: "Colombian Gold",
    origin: "Santa Marta Mountains, Colombia",
    flag: "🇨🇴",
    type: "Sativa",
    typeColor: "text-sativa",
    color: "bg-yellow-50 border-yellow-200",
    era: "1960s–70s export era",
    traits: ["Tall, branchy sativa structure", "Golden-yellow buds at maturity", "Citrus, skunk, earthy aroma", "Uplifting, euphoric high", "Long 14–16 week flower time"],
    terpenes: ["Limonene", "Myrcene", "Pinene"],
    thc: "14–19%",
    descendants: ["Skunk #1", "Chemdawg", "Haze family (partial)"],
    history: "Colombian Gold was one of the most popular imports during the American cannabis boom of the late 1960s and 1970s. Coming from the mountainous Santa Marta region, it was prized for its golden color and smooth, euphoric effects. Colombian genetics played a crucial role in creating Skunk #1 — one of the most important breeding strains in cannabis history — and through Skunk, influenced hundreds of modern strains. The aroma of early Skunk strains was described as Colombian Gold meets Afghani.",
  },
  {
    name: "Acapulco Gold",
    origin: "Guerrero, Mexico (near Acapulco)",
    flag: "🇲🇽",
    type: "Sativa",
    typeColor: "text-sativa",
    color: "bg-amber-50 border-amber-200",
    era: "1960s–70s, considered legendary",
    traits: ["Gold, orange, caramel bud coloration", "Toffee, earthy, woody aroma", "Balanced euphoria — uplifting but functional", "Considered one of the finest smokes historically"],
    terpenes: ["Myrcene", "Caryophyllene", "Limonene"],
    thc: "15–23%",
    descendants: ["Various Mexican sativa hybrids"],
    history: "Acapulco Gold is the stuff of legend — repeatedly cited in cannabis lore as one of the finest strains ever grown. Coming from the hills around Acapulco, Mexico, it was an import staple in the US before domestic cultivation took over. The caramel-colored buds, toffee-like aroma, and smooth functional high made it iconic. Authentic Acapulco Gold seeds are extremely rare today — most 'Acapulco Gold' sold is a recreation rather than the original landrace. It represents a lost piece of cannabis history.",
  },
  {
    name: "Panama Red",
    origin: "Panama",
    flag: "🇵🇦",
    type: "Sativa",
    typeColor: "text-sativa",
    color: "bg-red-50 border-red-200",
    era: "1960s–70s",
    traits: ["Deep red/orange pistils throughout", "Slow 11–12 week flower", "Earthy, red fruit, slight incense aroma", "Euphoric, psychedelic, creative high"],
    terpenes: ["Myrcene", "Limonene", "Pinene"],
    thc: "14–16%",
    descendants: ["Various Central American sativa hybrids"],
    history: "Panama Red was another celebrated 1970s import known for its distinctive deep red coloration and psychedelic, creative effects. Lower THC than modern strains but revered for the quality and character of its high — 'you get more done on Panama Red,' as the saying went. Like most Central American landraces, authentic genetics have become extremely difficult to source.",
  },
  {
    name: "Malawi Gold",
    origin: "Malawi, East Africa",
    flag: "🇲🇼",
    type: "Sativa",
    typeColor: "text-sativa",
    color: "bg-orange-50 border-orange-200",
    era: "Centuries of cultivation in East Africa",
    traits: ["Extremely long flowering time (16–18 weeks)", "One of the highest THCV strains known", "Sweet, fruity, floral aroma", "Intense, clear psychedelic high", "Very challenging to grow outside tropics"],
    terpenes: ["Terpinolene", "Limonene", "Ocimene"],
    thc: "18–25%",
    thcv: "High (up to 1–2%)",
    descendants: ["Various African sativa hybrids"],
    history: "Malawi Gold is one of the most potent landrace sativas ever documented. Grown on the shores of Lake Malawi by local farmers for generations, it was discovered by Western collectors in the 1980s–90s. Its extraordinary THCV content (alongside Durban Poison) makes it one of the most coveted landrace genetics for modern breeders interested in high-THCV strains. The extremely long flowering time makes it impractical for indoor cultivation but extraordinary outdoors in equatorial climates.",
  },
];

export default function LandracesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is a landrace cannabis strain?", acceptedAnswer: { "@type": "Answer", text: "A landrace strain is a cannabis variety that developed naturally in a specific geographic region over centuries or millennia without human selective breeding. They are genetically stable, adapted to their local climate, and are the ancestors of all modern hybrid strains. Examples include Afghani, Thai, Durban Poison, and Colombian Gold." } },
      { "@type": "Question", name: "What landrace strains still exist today?", acceptedAnswer: { "@type": "Answer", text: "True landrace strains are increasingly rare due to cross-breeding and habitat loss. The most preserved include Afghani, Hindu Kush, Durban Poison, and various Thai landraces. Organizations like the Landrace Team and individual collectors work to preserve original genetics. Most 'landrace' seeds sold commercially are recreations with some hybridization." } },
      { "@type": "Question", name: "What modern strains come from landrace genetics?", acceptedAnswer: { "@type": "Answer", text: "Nearly every modern strain traces back to landrace genetics. OG Kush, Northern Lights, and most Kush family strains derive from Afghani. Girl Scout Cookies traces to Durban Poison. Haze and its many descendants (Silver Haze, Amnesia) have Thai and Colombian genetics. Understanding landraces helps understand the genetic history of the entire cannabis world." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Landrace Cannabis Strains</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Before breeders and labs, cannabis evolved naturally across the world — each region producing a genetically distinct strain adapted to local conditions.
            These are the originals. Every modern strain traces back to them.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10">

        {/* What is a landrace */}
        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h2 className="text-xl font-black mb-3">🌍 What Is a Landrace Strain?</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            A landrace is a cannabis variety that developed over centuries in a specific geographic region without human selective breeding.
            They're genetically stable, perfectly adapted to local climate and altitude, and have been cultivated by indigenous communities for religious, medicinal, and recreational purposes for millennia.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            When Western breeders began collecting these strains in the 1960s–70s and crossing them together indoors, the modern cannabis industry was born.
            Every strain you've ever smoked carries landrace DNA — understanding them is understanding the entire genetic history of cannabis.
          </p>
        </section>

        {/* Landrace map overview */}
        <section>
          <h2 className="text-3xl font-black mb-5">World Map of Landrace Origins</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
            {[
              { region: "Hindu Kush", strains: "Afghani, Hindu Kush", type: "Indica", icon: "🏔️" },
              { region: "East Africa", strains: "Durban Poison, Malawi Gold", type: "Sativa", icon: "🌍" },
              { region: "Southeast Asia", strains: "Thai, Vietnamese", type: "Sativa", icon: "🌏" },
              { region: "Latin America", strains: "Colombian Gold, Acapulco Gold, Panama Red", type: "Sativa", icon: "🌎" },
            ].map(r => (
              <div key={r.region} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm text-center">
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-black text-sm">{r.region}</div>
                <div className={`text-xs font-bold mb-1 ${r.type === "Indica" ? "text-indica" : "text-sativa"}`}>{r.type}</div>
                <div className="text-xs text-gray-400">{r.strains}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Landrace cards */}
        {LANDRACES.map(l => (
          <div key={l.name} className={`${l.color} border-2 rounded-2xl p-6 shadow-brutal`}>
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{l.flag}</span>
                  <h2 className="text-2xl font-black">{l.name}</h2>
                  <span className={`text-sm font-black ${l.typeColor}`}>{l.type}</span>
                </div>
                <p className="text-sm text-gray-500">{l.origin}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-black bg-white border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">THC: {l.thc}</span>
                <span className="text-xs font-black bg-white border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">{l.era}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">{l.history}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Plant Traits</div>
                <ul className="space-y-1">
                  {l.traits.map(t => <li key={t} className="text-xs text-gray-600 flex gap-1"><span className="shrink-0">•</span>{t}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Key Terpenes</div>
                <div className="flex flex-wrap gap-1">
                  {l.terpenes.map(t => <span key={t} className="text-xs bg-white border border-black px-2 py-0.5 rounded-full font-bold">{t}</span>)}
                </div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Modern Descendants</div>
                <div className="flex flex-wrap gap-1">
                  {l.descendants.map(d => (
                    <Link key={d} href={`/strains/${d.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}`}
                      className="text-xs bg-white border border-black px-2 py-0.5 rounded-full font-bold hover:bg-lime-pale transition-colors">
                      {d}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q:"What is a landrace cannabis strain?", a:"A landrace is a cannabis variety that evolved naturally in a specific geographic region over centuries without human selective breeding. They're genetically stable, adapted to local climate and conditions, and are the genetic ancestors of all modern hybrids. Examples: Afghani, Thai, Durban Poison, Colombian Gold." },
              { q:"Are landrace strains still available today?", a:"True landraces are increasingly rare due to decades of crossbreeding and habitat disruption. Durban Poison is the most accessible and best-preserved. Afghani and Hindu Kush genetics exist in seed form though many commercial versions are slightly hybridized. Organizations like the Landrace Team and Ace Seeds work to preserve original genetics." },
              { q:"Are landrace strains more potent than modern hybrids?", a:"No — modern hybrids are significantly higher in THC (often 25–30%+) compared to most landraces (14–20%). Landraces are valued for genetic purity, specific regional terpene profiles, unique effects, and breeding potential — not raw THC percentage. Some landraces like Malawi Gold and Thai are highly potent, but primarily due to exceptional psychedelic quality rather than THC numbers." },
              { q:"Which modern strains have the most landrace genetics?", a:"Northern Lights is nearly pure Afghani. Hindu Kush is essentially a preserved landrace. Durban Poison itself is widely sold as a landrace. Most Kush strains (OG Kush, Purple Kush, Bubba Kush) heavily express Afghani traits. Haze family strains carry strong Thai and Colombian genetics." },
            ].map(faq => (
              <details key={faq.q} className="bg-white border-2 border-black rounded-xl shadow-brutal-sm group">
                <summary className="flex justify-between items-center p-5 font-black cursor-pointer list-none">
                  {faq.q}<span className="text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t-2 border-black pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h3 className="font-black text-lg mb-4">Continue Learning</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{href:"/learn/indica-vs-sativa",label:"🌿 Indica vs Sativa"},{href:"/learn/terpenes",label:"🧬 Terpene Library"},{href:"/learn/cannabinoids",label:"🔬 Cannabinoids"},{href:"/learn/grow-guide",label:"🌱 Grow Guide"},{href:"/strains",label:"Browse Strains →"}].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">{l.label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
