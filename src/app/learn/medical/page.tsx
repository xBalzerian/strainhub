import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Medical Use Index — Strains for Anxiety, Pain, Sleep & More | StrainHub",
  description: "Cannabis strains organized by condition: anxiety, chronic pain, insomnia, depression, PTSD, nausea, and inflammation. User-reported benefits with cannabinoid and terpene guidance.",
  alternates: { canonical: "https://strainhub.com/learn/medical" },
};

const CONDITIONS = [
  { condition:"Anxiety", icon:"🧘", color:"bg-blue-50 border-blue-200",
    overview:"Cannabis has a complex relationship with anxiety. High-THC strains can worsen anxiety in some users while providing relief in others. CBD-dominant strains are most reliably anxiolytic.",
    whatHelps:["High CBD content (5%+)","Low to moderate THC (under 15%)","Terpenes: Linalool, Limonene, Caryophyllene","1:1 or higher CBD:THC ratios","Micro-dosing THC (2–5mg)"],
    avoid:["Very high THC (20%+) without CBD","Stimulating sativa-dominant if sensitive","Edibles (harder to dose accurately)"],
    strains:["ACDC","Harlequin","Cannatonic","Charlotte's Web","Pennywise"],
    note:"User reports suggest benefits. Not a substitute for professional mental health treatment." },
  { condition:"Chronic Pain", icon:"💊", color:"bg-red-50 border-red-200",
    overview:"The #1 medical cannabis use. THC activates CB1 receptors that modulate pain, while CBD and caryophyllene reduce inflammation at the source.",
    whatHelps:["Balanced THC:CBD ratios","Indica-dominant for body pain","Terpenes: Caryophyllene, Myrcene, Humulene","Topicals for localized pain (CB2 receptors in skin)"],
    avoid:["Pure CBD alone may be insufficient for severe pain","Daytime high-THC affecting daily function"],
    strains:["ACDC","Harlequin","Blackberry Kush","Afghan Kush","Northern Lights","Blue Widow"],
    note:"Reports support use for neuropathic pain, arthritis, and fibromyalgia. Consult a physician for chronic conditions." },
  { condition:"Insomnia & Sleep", icon:"😴", color:"bg-indigo-50 border-indigo-200",
    overview:"Cannabis reduces sleep onset time. CBN (formed as THC ages) is strongly sedating. However, regular high-THC use suppresses REM sleep over time.",
    whatHelps:["High myrcene content","Indica-dominant strains","CBN-rich products","Terpenes: Myrcene, Linalool, Caryophyllene"],
    avoid:["Sativa-dominant strains","Stimulating terpene profiles (limonene, pinene)","Using nightly long-term — reduces REM sleep"],
    strains:["Granddaddy Purple","Purple Kush","Bubba Kush","Northern Lights","God's Gift","Tahoe OG"],
    note:"Best used situationally rather than nightly to preserve sleep quality and prevent tolerance." },
  { condition:"Depression", icon:"🌤️", color:"bg-yellow-50 border-yellow-200",
    overview:"Cannabis can provide temporary mood elevation but heavy daily use is associated with worsened depression over time. Strategic use of uplifting strains can help.",
    whatHelps:["Limonene-rich strains (uplifting)","Balanced or moderate THC","Pinene for mental clarity with mood lift","CBD for baseline mood support"],
    avoid:["Heavy daily use (may worsen long-term)","High-THC indicas (can increase sedation/low mood)"],
    strains:["Jack Herer","Super Lemon Haze","Pineapple Express","Durban Poison","Harlequin"],
    note:"Heavy regular use may worsen depression. Professional support strongly recommended." },
  { condition:"PTSD", icon:"🛡️", color:"bg-purple-50 border-purple-200",
    overview:"One of the most promising areas for medical cannabis. The endocannabinoid system regulates fear extinction. THC can suppress nightmares and reduce hyperarousal. Several US states list PTSD as a qualifying condition.",
    whatHelps:["Moderate THC for nightmare suppression","CBD for daytime anxiety component","Myrcene and linalool for calming hyperarousal"],
    avoid:["Very high THC that triggers paranoia (counterproductive)","Stimulating strains that increase hyperarousal"],
    strains:["Cannatonic","Blue Dream","OG Kush","Pineapple Express","Girl Scout Cookies"],
    note:"Growing clinical evidence supports cannabis for PTSD. Best used alongside evidence-based PTSD therapy." },
  { condition:"Nausea & Vomiting", icon:"🤢", color:"bg-green-50 border-green-200",
    overview:"THC's anti-nausea effects are so well-established that synthetic THC (Marinol) has been FDA-approved since 1985. Cannabis activates CB1 receptors in the brain's vomiting center.",
    whatHelps:["Any THC-containing strain","CBD enhances via 5-HT1A receptors","Fast-acting inhaled methods for acute nausea"],
    avoid:["Edibles for acute nausea (too slow)","Harsh smoke if nausea is already severe"],
    strains:["OG Kush","Blue Dream","Durban Poison","Girl Scout Cookies","Sour Diesel"],
    note:"One of the best-supported medical applications. FDA approved synthetic THC for this use in 1985." },
  { condition:"Inflammation", icon:"🔥", color:"bg-rose-50 border-rose-200",
    overview:"Multiple anti-inflammatory mechanisms: CBD reduces inflammatory cytokines, caryophyllene binds CB2 receptors, humulene acts similarly to dexamethasone (a steroid) in studies.",
    whatHelps:["High CBD for systemic inflammation","Caryophyllene-rich strains (CB2 activation)","Humulene terpene","CBG for IBD","Topicals for joint/localized inflammation"],
    avoid:["Smoking (introduces inflammatory compounds from combustion) — vaporize or use edibles/topicals"],
    strains:["ACDC","Cannatonic","Harlequin","Pennywise","Ringo's Gift"],
    note:"Strong anti-inflammatory evidence for CBD and caryophyllene. Topicals particularly effective for joints." },
];

export default function MedicalPage() {
  const faqJsonLd = {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity:[
      {"@type":"Question",name:"What cannabis strains are best for anxiety?",acceptedAnswer:{"@type":"Answer",text:"High-CBD low-THC strains are most reliable: ACDC, Harlequin, Cannatonic. Look for linalool and limonene terpenes. Avoid very high-THC strains without CBD."}},
      {"@type":"Question",name:"Does cannabis help with chronic pain?",acceptedAnswer:{"@type":"Answer",text:"Yes — chronic pain is the #1 reported medical use. THC activates pain-modulating CB1 receptors, CBD and caryophyllene reduce inflammation. Balanced THC:CBD ratios are often most effective."}},
      {"@type":"Question",name:"What strains are best for sleep?",acceptedAnswer:{"@type":"Answer",text:"Indica-dominant strains high in myrcene — Granddaddy Purple, Northern Lights, Bubba Kush. CBN from aged cannabis is strongly associated with sedation."}},
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Cannabis Medical Use Index</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">Strains and cannabinoids organized by condition — anxiety, pain, sleep, PTSD, nausea, and more. Based on user reports and available research.</p>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 mt-5 text-sm font-bold text-amber-800">
            ⚠️ This presents user-reported benefits and research findings. Cannabis is not FDA-approved to treat medical conditions. Always consult a qualified healthcare provider.
          </div>
          <div className="flex gap-2 mt-5 flex-wrap">
            {CONDITIONS.map(c => <a key={c.condition} href={`#${c.condition.replace(/\s+/g,"-").replace(/&/g,"").replace(/--/g,"-").toLowerCase()}`} className="text-xs font-black bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-brutal-sm hover:bg-lime transition-colors">{c.icon} {c.condition}</a>)}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-8">
        {CONDITIONS.map(c => (
          <div key={c.condition} id={c.condition.replace(/\s+/g,"-").replace(/&/g,"").replace(/--/g,"-").toLowerCase()} className={`${c.color} border-2 rounded-2xl p-6 shadow-brutal`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{c.icon}</span>
              <h2 className="text-2xl font-black">{c.condition}</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-5">{c.overview}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">✅ What Helps</div>
                <ul className="space-y-1">{c.whatHelps.map(w => <li key={w} className="text-xs text-gray-600 flex gap-1"><span className="text-green-500 shrink-0">✓</span>{w}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">⚠️ Avoid</div>
                <ul className="space-y-1">{c.avoid.map(w => <li key={w} className="text-xs text-gray-600 flex gap-1"><span className="text-red-400 shrink-0">×</span>{w}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">🌿 Reported Strains</div>
                <div className="flex flex-wrap gap-1">
                  {c.strains.map(s => <Link key={s} href={`/strains/${s.toLowerCase().replace(/ /g,"-").replace(/'/g,"").replace(/\./g,"")}`} className="text-xs bg-white border border-black px-2 py-0.5 rounded-full font-bold hover:bg-lime-pale transition-colors">{s}</Link>)}
                </div>
              </div>
            </div>
            <div className="bg-white border border-black rounded-xl px-4 py-3 text-xs"><span className="font-black">📋 Note: </span><span className="text-gray-600">{c.note}</span></div>
          </div>
        ))}
        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {q:"What cannabis strains are best for anxiety?",a:"High-CBD, low-THC strains are most reliable: ACDC, Harlequin, Cannatonic. Look for linalool and limonene terpenes. Avoid very high-THC strains without CBD — they can worsen anxiety. Micro-dosing (2–5mg THC) is also effective."},
              {q:"Does cannabis help with chronic pain?",a:"Chronic pain is the #1 reported medical use. THC activates CB1 receptors, CBD and caryophyllene reduce inflammation. Balanced THC:CBD ratios are often most effective. Topicals work on CB2 receptors for localized pain without psychoactive effects."},
              {q:"What strains are best for sleep?",a:"Indica-dominant strains high in myrcene: Granddaddy Purple, Northern Lights, Bubba Kush. CBN is strongly associated with sedation. Use situationally rather than nightly to preserve sleep quality and prevent tolerance."},
              {q:"Can cannabis help with PTSD?",a:"PTSD is one of the most researched medical cannabis applications. THC can suppress nightmares and reduce hyperarousal. Many US states list PTSD as a qualifying condition. Best combined with evidence-based PTSD therapy."},
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
            {[{href:"/learn/cannabinoids",label:"🔬 Cannabinoids"},{href:"/learn/terpenes",label:"🌿 Terpenes"},{href:"/learn/how-thc-works",label:"🧠 How THC Works"},{href:"/learn/indica-vs-sativa",label:"⚡ Indica vs Sativa"},{href:"/strains",label:"Browse Strains →"}].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">{l.label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
