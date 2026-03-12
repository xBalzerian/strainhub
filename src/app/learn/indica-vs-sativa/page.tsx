import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Indica vs Sativa vs Hybrid — The Full Scientific Truth | StrainHub",
  description: "Is indica vs sativa real? The science says the classic distinction is largely a myth for modern hybrids. Learn what actually determines your cannabis experience.",
  alternates: { canonical: "https://strainhub.com/learn/indica-vs-sativa" },
};

export default function IndicaVsSativaPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is indica vs sativa a real distinction?", acceptedAnswer: { "@type": "Answer", text: "Botanically yes — they describe different plant morphologies and origins. As a predictor of effects for modern hybrids, the science shows it is largely unreliable. Terpene profiles are far more accurate predictors." } },
      { "@type": "Question", name: "What actually makes cannabis relaxing or energizing?", acceptedAnswer: { "@type": "Answer", text: "Terpenes are the primary predictor. High myrcene = sedating. High limonene/pinene = energizing. The THC:CBD ratio also matters significantly." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Indica vs Sativa vs Hybrid</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">Every dispensary organizes cannabis this way. But the scientific truth is more complicated — and knowing it will change how you pick strains.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">
        <section className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-brutal">
          <h2 className="text-2xl font-black mb-3">⚠️ The Uncomfortable Truth</h2>
          <p className="text-gray-700 leading-relaxed mb-3">The idea that "indica = relaxing body high" and "sativa = energizing head high" is one of the most widespread beliefs in cannabis culture — and the science largely does not support it.</p>
          <p className="text-gray-700 leading-relaxed">Researcher Ethan Russo (former Medical Director at GW Pharmaceuticals) stated: <strong>"The terms indica and sativa are useless biochemically."</strong> Multiple peer-reviewed studies found no consistent correlation between the indica/sativa label and actual cannabinoid or terpene content in modern strains.</p>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-6">What They Actually Describe</h2>
          <p className="text-gray-600 leading-relaxed mb-6">The terms are real — they describe <strong>plant morphology and geographic origin</strong>, not chemical effects.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-indica-bg border-2 border-black rounded-2xl p-6 shadow-brutal">
              <h3 className="text-2xl font-black text-indica mb-4">🍇 Cannabis indica</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[["Origin","Hindu Kush mountains"],["Shape","Short, bushy, dense"],["Leaves","Wide, dark green"],["Flowering","6–9 weeks (fast)"],["Landraces","Afghani, Hindu Kush"]].map(([k,v]) => (
                  <li key={k} className="flex gap-2"><strong className="w-24 shrink-0">{k}:</strong><span>{v}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-sativa-bg border-2 border-black rounded-2xl p-6 shadow-brutal">
              <h3 className="text-2xl font-black text-sativa mb-4">☀️ Cannabis sativa</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[["Origin","Equatorial regions (Colombia, Thailand, Africa)"],["Shape","Tall, lanky, sparse"],["Leaves","Narrow, light green"],["Flowering","10–16 weeks (slow)"],["Landraces","Durban Poison, Thai, Colombian Gold"]].map(([k,v]) => (
                  <li key={k} className="flex gap-2"><strong className="w-24 shrink-0">{k}:</strong><span>{v}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-lime border-2 border-black rounded-2xl p-8 shadow-brutal">
          <h2 className="text-2xl font-black mb-5">✅ What Actually Determines Your Experience</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { rank:"#1", icon:"🌿", title:"Terpene Profile", desc:"High myrcene → sedating. High limonene/pinene → energizing. High linalool → calming. This is the most reliable predictor." },
              { rank:"#2", icon:"🔬", title:"THC:CBD Ratio", desc:"High THC alone → intense, potential anxiety. Balanced THC:CBD → mellower, more functional." },
              { rank:"#3", icon:"🧬", title:"Your Biology", desc:"Genetics affect how you metabolize cannabinoids. Two people consuming the same strain can have very different experiences." },
              { rank:"#4", icon:"⚖️", title:"Dose & Method", desc:"Micro-dosing produces functional effects regardless of strain type. Edibles = stronger, longer." },
            ].map(item => (
              <div key={item.rank} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                <div className="flex items-center gap-2 mb-2"><span className="text-2xl">{item.icon}</span><span className="font-black">{item.rank} {item.title}</span></div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-4">⚡ What Is a Hybrid?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">A hybrid has both indica and sativa genetic heritage — which today means nearly all commercial cannabis. They are classified as indica-dominant, sativa-dominant, or balanced. The hybrid label is the most honest because it acknowledges complexity.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{name:"Blue Dream",note:"Sativa-dom, often relaxing"},{name:"OG Kush",note:"Hybrid, heavy indica feel"},{name:"Girl Scout Cookies",note:"Balanced, creative euphoria"},{name:"Gelato",note:"Indica-dom, euphoric + relaxed"}].map(s => (
              <Link key={s.name} href={`/strains/${s.name.toLowerCase().replace(/ /g,"-")}`} className="bg-hybrid-bg border-2 border-black rounded-xl p-3 hover:bg-lime-pale transition-colors">
                <div className="font-black text-xs">{s.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.note}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-5">How to Actually Choose a Strain</h2>
          <div className="space-y-3">
            {[
              {n:"1",t:"Look at the terpene profile first",d:"High myrcene = likely sedating. High limonene or pinene = likely energizing. More reliable than the indica/sativa label."},
              {n:"2",t:"Check the THC:CBD ratio",d:"If you're anxiety-prone, look for at least 5% CBD. A 2:1 THC:CBD ratio dramatically changes the experience."},
              {n:"3",t:"Read the reported effects",d:"Every strain on StrainHub shows user-reported effects — real-world outcomes are more useful than botanical labels."},
              {n:"4",t:"Indica/sativa DOES matter for growing",d:"Indicas are shorter, faster-flowering, easier indoors. Sativas need more space, time, and experience."},
            ].map(item => (
              <div key={item.n} className="flex gap-4 bg-white border-2 border-black rounded-xl p-5 shadow-brutal-sm">
                <div className="text-2xl font-black text-lime-600 shrink-0 w-6">{item.n}</div>
                <div><div className="font-black mb-1">{item.t}</div><p className="text-sm text-gray-500 leading-relaxed">{item.d}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {q:"Is indica vs sativa real?",a:"Botanically yes — it describes plant morphology and geographic origin. As a predictor of effects for modern hybrids, the science shows it is largely unreliable. Terpene profiles and THC:CBD ratios are far better predictors."},
              {q:"Does indica always make you sleepy?",a:"Not inherently. Many indica-labeled strains have high myrcene — the sedation comes from myrcene, not from being an indica. You can find energizing indicas and sedating sativas."},
              {q:"What does a sativa high feel like?",a:"Strains with uplifting terpenes (limonene, pinene) typically produce cerebral, creative, energetic effects. Very high-THC sativas can cause anxiety in sensitive individuals."},
              {q:"What does indica-dominant mean?",a:"More indica genetic heritage — typically 60–70%+ indica ancestry. Often correlates with shorter plants and denser buds but does not guarantee any specific chemical profile."},
            ].map(faq => (
              <details key={faq.q} className="bg-white border-2 border-black rounded-xl shadow-brutal-sm group">
                <summary className="flex justify-between items-center p-5 font-black cursor-pointer list-none">{faq.q}<span className="text-xl group-open:rotate-45 transition-transform">+</span></summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t-2 border-black pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h3 className="font-black text-lg mb-4">Continue Learning</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{href:"/learn/terpenes",label:"🌿 Terpene Library"},{href:"/learn/cannabinoids",label:"🔬 Cannabinoids"},{href:"/learn/how-thc-works",label:"🧠 How THC Works"},{href:"/learn/landraces",label:"🌍 Landrace Strains"},{href:"/strains",label:"Browse Strains →"}].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">{l.label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
