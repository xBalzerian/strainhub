import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Training Techniques — LST, Topping, ScrOG, FIM, Lollipopping | StrainHub",
  description: "Complete guide to cannabis training techniques: LST, topping, FIMming, ScrOG, mainlining, and lollipopping. Step-by-step instructions with expected yield increases.",
  alternates: { canonical: "https://strainhub.com/learn/training" },
};

const TECHNIQUES = [
  { abbr:"LST", name:"Low Stress Training", icon:"📎", stress:"Low", stressColor:"bg-green-100 text-green-800", yieldGain:"+20–40%", difficulty:"Beginner", diffColor:"bg-blue-100 text-blue-800", autoflower:true,
    summary:"Bending and tying branches to create a flat, even canopy. No cutting required — the lowest-risk training method.",
    steps:["Bend the main stem away from center when young and flexible","Use soft ties or pipe cleaners to anchor to pot rim","New growth reaches up — bend again as it grows","Goal: flat, even canopy where all bud sites get equal light","Continue through first 2 weeks of flower stretch"],
    pros:["No recovery time","Safe for autoflowers","Beginner-friendly","Keep adjusting as plant grows"],
    cons:["Requires daily attention","Less dramatic than other methods"],
    bestFor:"Autoflowers, beginners, small spaces" },
  { abbr:"TOP", name:"Topping", icon:"✂️", stress:"Medium", stressColor:"bg-yellow-100 text-yellow-800", yieldGain:"+30–50%", difficulty:"Beginner–Intermediate", diffColor:"bg-yellow-100 text-yellow-800", autoflower:false,
    summary:"Cutting off the main growing tip to split one dominant cola into two equal tops. Stack it for 4, 8, 16 tops.",
    steps:["Wait until plant has 4–6 nodes and is growing vigorously","Sterilize scissors or razor with alcohol","Cut main stem just above the 4th or 5th node","Two new shoots emerge from the node below the cut","Top the new tops after 2 weeks for exponential growth","Allow 1 week recovery before any other stress"],
    pros:["Creates multiple main colas","Reliable and well-documented","Stackable"],
    cons:["5–7 days recovery time","Not for autoflowers","Extends veg time"],
    bestFor:"Photoperiod strains with long veg time" },
  { abbr:"FIM", name:"FIM (F**k I Missed)", icon:"🤏", stress:"Medium", stressColor:"bg-yellow-100 text-yellow-800", yieldGain:"+30–60%", difficulty:"Intermediate", diffColor:"bg-yellow-100 text-yellow-800", autoflower:false,
    summary:"Pinching only 75% of the new growing tip — leaving the bottom 25%. Can create 4 new tops vs topping's 2.",
    steps:["Locate the newest growth tip at the very top","Pinch or cut approximately 75% — leave the bottom quarter","Remaining tissue typically splits into 4 new growing points","Results are less predictable than topping","Combine with LST after recovery"],
    pros:["Can create 4+ tops from one cut","Slightly less stress than full top"],
    cons:["Less predictable than topping","Requires practice"],
    bestFor:"Growers wanting more tops than topping provides" },
  { abbr:"ScrOG", name:"Screen of Green", icon:"🔲", stress:"Low", stressColor:"bg-green-100 text-green-800", yieldGain:"+40–80%", difficulty:"Intermediate", diffColor:"bg-yellow-100 text-yellow-800", autoflower:false,
    summary:"A horizontal screen that branches are woven through to create a perfectly flat canopy at equal distance from the light.",
    steps:["Set up horizontal screen 20–40cm above the pot","Weave branches horizontally as they grow through screen","Fill every square with growth before flipping","Flip to 12/12 only when 80–90% of screen is filled","Remove all lower growth below the screen (lollipop)"],
    pros:["Maximum light efficiency","Massive yield potential","Great for 1–2 plants"],
    cons:["Long veg time to fill screen","Hard to move plants once set up"],
    bestFor:"Indoor grows, maximizing single-plant yield" },
  { abbr:"LOLLI", name:"Lollipopping", icon:"🍭", stress:"Low", stressColor:"bg-green-100 text-green-800", yieldGain:"+15–30%", difficulty:"Beginner", diffColor:"bg-blue-100 text-blue-800", autoflower:true,
    summary:"Removing all lower growth that won't receive direct light — forces all energy to top colas.",
    steps:["Identify the lower 1/3 of the plant","Remove all small bud sites, leaves, and branches in this zone","These popcorn buds waste energy and never develop in low-light zones","Perform 2 weeks before flower flip and again at day 21 of flower"],
    pros:["Simple and safe","Better airflow reduces mold","Concentrates yield in larger top buds"],
    cons:["Removes some potential yield","Overdoing it stresses plant"],
    bestFor:"Every indoor grow — pair with any other technique" },
  { abbr:"DEFOL", name:"Defoliation", icon:"🍂", stress:"Medium", stressColor:"bg-yellow-100 text-yellow-800", yieldGain:"+10–25%", difficulty:"Intermediate", diffColor:"bg-yellow-100 text-yellow-800", autoflower:false,
    summary:"Strategically removing fan leaves to improve light penetration and airflow to bud sites.",
    steps:["Remove only leaves directly shading bud sites","Never remove more than 20–30% at once","Wait 3–5 days recovery before defoliating again","Stop all defoliation after week 6 of flower"],
    pros:["Improved light penetration","Better airflow = lower mold risk"],
    cons:["Controversial — some studies show no benefit","Over-defoliation severely stresses plants"],
    bestFor:"Dense, leafy strains with heavy foliage blocking bud sites" },
];

export default function TrainingPage() {
  const faqJsonLd = {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity:[
      {  "@type":"Question", name:"What is the best training technique for beginners?", acceptedAnswer:{"@type":"Answer",text:"LST (Low Stress Training) is best for beginners — no cutting, no recovery time, safe for autoflowers. Simply bend and tie branches outward for a flat canopy."}},
      {"@type":"Question",name:"Can you train autoflowering cannabis?",acceptedAnswer:{"@type":"Answer",text:"Only with low-stress techniques like LST and lollipopping. Autoflowers cannot be topped or FIMmed — high-stress techniques require recovery time that autoflowers cannot afford."}},
      {"@type":"Question",name:"Does topping really increase yield?",acceptedAnswer:{"@type":"Answer",text:"Yes — topping typically increases yield by 30–50% by converting one main cola into two equal tops. Combined with LST and ScrOG, a single topped plant can produce multiple times more than an untrained plant."}},
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Cannabis Training Techniques</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">Training maximizes light absorption and yield. Done right, these techniques can double or triple your harvest from the same genetics.</p>
          <div className="flex gap-2 mt-6 flex-wrap">
            {TECHNIQUES.map(t => <a key={t.abbr} href={`#${t.abbr}`} className="text-xs font-black bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-brutal-sm hover:bg-lime transition-colors">{t.icon} {t.abbr}</a>)}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-8">
        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h2 className="text-xl font-black mb-3">🌞 Why Train Cannabis?</h2>
          <p className="text-sm text-gray-700 leading-relaxed">Untrained cannabis grows in a Christmas tree shape — one dominant cola at the top, smaller branches below. Training breaks <strong>apical dominance</strong> and redirects energy into multiple equal colas. More even canopy = more buds at maximum light intensity = more grams per watt.</p>
        </section>
        {TECHNIQUES.map(t => (
          <div key={t.abbr} id={t.abbr} className="bg-white border-2 border-black rounded-2xl shadow-brutal overflow-hidden">
            <div className="bg-off-white border-b-2 border-black p-5 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{t.icon}</span>
                <div><h2 className="text-xl font-black">{t.name}</h2></div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className={`text-xs font-black px-3 py-1 rounded-full border-2 border-black ${t.stressColor}`}>Stress: {t.stress}</span>
                <span className={`text-xs font-black px-3 py-1 rounded-full border-2 border-black ${t.diffColor}`}>{t.difficulty}</span>
                <span className="text-xs font-black bg-lime px-3 py-1 rounded-full border-2 border-black">Yield: {t.yieldGain}</span>
                <span className={`text-xs font-black px-3 py-1 rounded-full border-2 border-black ${t.autoflower ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{t.autoflower ? "✅ Autoflower OK" : "❌ Photo only"}</span>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-gray-700 font-medium leading-relaxed">{t.summary}</p>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Step-by-Step</div>
                <ol className="space-y-1.5">
                  {t.steps.map((step,i) => <li key={i} className="flex gap-2 text-sm text-gray-600"><span className="font-black text-brand shrink-0">{i+1}.</span>{step}</li>)}
                </ol>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">✅ Pros</div>
                  <ul className="space-y-1">{t.pros.map(p => <li key={p} className="text-xs text-gray-600 flex gap-1"><span className="text-green-500 font-black">+</span>{p}</li>)}</ul>
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">⚠️ Cons</div>
                  <ul className="space-y-1">{t.cons.map(c => <li key={c} className="text-xs text-gray-600 flex gap-1"><span className="text-red-400 font-black">−</span>{c}</li>)}</ul>
                </div>
              </div>
              <div className="bg-black text-lime text-xs font-bold rounded-xl px-4 py-3">🎯 Best for: {t.bestFor}</div>
            </div>
          </div>
        ))}
        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {q:"What is the best training technique for beginners?",a:"LST is ideal — no cutting, no recovery time, works on autoflowers. Pair with lollipopping for solid results without risk."},
              {q:"Can you train autoflowering cannabis?",a:"Only with low-stress techniques like LST and lollipopping. Autoflowers cannot recover from topping, FIM, or mainlining — high-stress training on autos typically reduces yield."},
              {q:"When should I stop training?",a:"Stop high-stress training before the switch to 12/12. Stop LST adjustments after the first 2 weeks of flower. Never defoliate after week 6 of flower."},
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
            {[{href:"/learn/grow-guide",label:"🌱 Full Grow Guide"},{href:"/learn/deficiencies",label:"🍂 Deficiency Guide"},{href:"/learn/cannabinoids",label:"🔬 Cannabinoids"},{href:"/learn/terpenes",label:"🌿 Terpenes"},{href:"/strains",label:"Browse Strains →"}].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">{l.label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
