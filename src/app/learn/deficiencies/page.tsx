import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Deficiency Guide — Yellow Leaves, Brown Spots, Curling Tips | StrainHub",
  description: "Diagnose cannabis nutrient deficiencies, toxicities, and environmental stress. Yellow leaves, brown spots, purple stems, curling tips — find the cause and fix it fast.",
  alternates: { canonical: "https://strainhub.com/learn/deficiencies" },
};

const ISSUES = [
  { name:"Nitrogen Deficiency", icon:"🍃", color:"bg-yellow-50 border-yellow-200", severity:"Very Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Yellowing starts on bottom/oldest leaves first","Progresses upward over days","Leaves turn fully yellow then drop","Plant looks washed out overall"],
    cause:"Insufficient nitrogen, pH lockout (most common), overwatering preventing uptake",
    fix:"Check pH first (6.0–7.0 soil). If correct, add nitrogen-rich fertilizer: fish meal, blood meal, or N-heavy base nutrient.",
    lookAlike:"Normal end-of-life leaf yellowing in last 2 weeks of flower — completely normal, do not add nitrogen." },
  { name:"Phosphorus Deficiency", icon:"💜", color:"bg-purple-50 border-purple-200", severity:"Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Dark green leaves developing purple/red underneath","Purple or red stems and petioles","Bronze or brown spots on older leaves","Delayed flowering and poor bud development"],
    cause:"pH too low (below 6.0 locks out P), cold temperatures below 15°C, overwatering",
    fix:"Raise pH to 6.2–7.0 in soil. Warm root zone. Add P supplement: bat guano, bone meal, or P-heavy bloom nutrient.",
    lookAlike:"Purple genetics — some strains naturally turn purple without any deficiency. If plant is healthy and fast-growing, it is genetics." },
  { name:"Potassium Deficiency", icon:"🔥", color:"bg-orange-50 border-orange-200", severity:"Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Brown burnt-looking leaf tips and edges","Yellowing between veins on older leaves","Leaves curl upward at edges","Weakened stems and branches"],
    cause:"pH imbalance, competing nutrients blocking K uptake, low-quality soil",
    fix:"Correct pH first. Add K-rich supplement: kelp meal, greensand, or K-heavy base nutrient.",
    lookAlike:"Windburn from fans (similar curling), light burn (only on top leaves), nutrient burn (crispy tips across whole plant)." },
  { name:"Calcium Deficiency", icon:"🦴", color:"bg-gray-50 border-gray-200", severity:"Very Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Brown spots with yellow halos on newer leaves","Spots appear random, not along veins","New growth curls and distorts","Bud sites show brown dead areas"],
    cause:"pH too low, using RO/distilled water without cal-mag, coco coir without calcium supplement",
    fix:"Add cal-mag product. Raise pH slightly. Coco growers: cal-mag is non-optional every watering.",
    lookAlike:"Magnesium deficiency (shows between veins on old leaves), light burn (only affects top of canopy)." },
  { name:"Magnesium Deficiency", icon:"☀️", color:"bg-lime-50 border-lime-200", severity:"Very Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Yellow areas between green leaf veins on older leaves","Interveinal chlorosis — veins stay green, leaf turns yellow","Progresses to complete yellowing then death"],
    cause:"Low pH, calcium competing with Mg uptake, flushing without replacing cal-mag, RO water",
    fix:"Foliar spray Epsom salt (1 tsp per litre) for fast correction. Add cal-mag to feed. Raise pH to 6.0–6.5.",
    lookAlike:"Iron deficiency (starts on newest growth, not oldest). Sulfur deficiency (uniform yellowing of new growth)." },
  { name:"Overwatering", icon:"💧", color:"bg-blue-50 border-blue-200", severity:"Most Common Problem", sevColor:"bg-red-100 text-red-800",
    symptoms:["Leaves droop downward (not just tips)","Leaves feel heavy and swollen","Soil stays wet for extended periods","Yellowing similar to nitrogen deficiency"],
    cause:"Watering too frequently, pots without drainage, oversized pots relative to plant size",
    fix:"Let medium dry out significantly between waterings — lift pots to judge weight. Only water when pot feels light.",
    lookAlike:"Underwatering (leaves droop but feel paper-thin and dry, not swollen). Root rot in severe cases." },
  { name:"Light Burn", icon:"🔆", color:"bg-yellow-50 border-yellow-200", severity:"Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Yellowing or bleaching only on leaves closest to light","Bleached white buds at very top of canopy","Lower leaves look completely healthy"],
    cause:"Light too close to canopy. LED lights especially can burn without much heat.",
    fix:"Increase distance between light and canopy. LED: minimum 30–45cm for most quantum boards.",
    lookAlike:"Nutrient burn (affects whole plant not just top). Potassium deficiency (whole canopy)." },
  { name:"Nutrient Burn", icon:"🌶️", color:"bg-red-50 border-red-200", severity:"Common", sevColor:"bg-red-100 text-red-800",
    symptoms:["Brown crispy tips across the whole plant","Tips look scorched","Dark green leaf color before tips burn","Affects many leaves throughout canopy"],
    cause:"Overfeeding — too many nutrients. More is not better. Cannabis has a saturation point.",
    fix:"Flush with 3x pot volume in plain pH-adjusted water. Reduce nutrient concentration by 25–50%.",
    lookAlike:"Potassium deficiency (similar edges). Windburn (only near fans)." },
  { name:"Powdery Mildew", icon:"⬜", color:"bg-slate-50 border-slate-200", severity:"Serious — spreads fast", sevColor:"bg-red-100 text-red-800",
    symptoms:["White powdery coating on leaves and stems","Starts as small circular white spots","Spreads rapidly if unchecked","Musty smell in grow room"],
    cause:"Humidity above 60% in flower, poor airflow, plants touching each other",
    fix:"Isolate affected plants. Spray diluted hydrogen peroxide (3%) or potassium bicarbonate. Reduce humidity below 50%.",
    lookAlike:"Trichomes (only on buds and sugar leaves, not fan leaves). Crystal residue from foliar sprays." },
];

export default function DeficienciesPage() {
  const faqJsonLd = {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity:[
      {"@type":"Question",name:"Why are my cannabis leaves turning yellow?",acceptedAnswer:{"@type":"Answer",text:"Most commonly: nitrogen deficiency, pH lockout, overwatering, or magnesium deficiency. Check pH first (6.0–7.0 soil) — the majority of yellowing is pH-related, not actual nutrient absence."}},
      {"@type":"Question",name:"Why do cannabis leaves have brown spots?",acceptedAnswer:{"@type":"Answer",text:"Brown spots typically indicate calcium deficiency (spots with yellow halos on new growth) or magnesium deficiency (yellowing between veins on older leaves). Check pH and add cal-mag."}},
      {"@type":"Question",name:"What causes cannabis leaves to curl?",acceptedAnswer:{"@type":"Answer",text:"Upward curl = heat stress, potassium deficiency, or light burn. Downward curl = overwatering (most common), nitrogen toxicity, or windburn from fans."}},
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="bg-off-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-brand mb-4 inline-block">← Learning Hub</Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">Cannabis Deficiency Diagnosis</h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">Yellow leaves? Brown spots? Curling tips? Find the cause and the fix — with look-alikes to avoid misdiagnosis.</p>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 mt-5 text-sm font-bold text-amber-800">
            ⚠️ Check pH before anything else. 80%+ of deficiencies are actually pH lockout — nutrients present but unavailable. Soil: 6.0–7.0. Coco/Hydro: 5.5–6.5.
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        {ISSUES.map(d => (
          <div key={d.name} className={`${d.color} border-2 rounded-2xl p-6 shadow-brutal`}>
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{d.icon}</span>
                <h2 className="text-xl font-black">{d.name}</h2>
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-full border-2 border-black ${d.sevColor}`}>{d.severity}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">👁️ Symptoms</div>
                <ul className="space-y-1">{d.symptoms.map(s => <li key={s} className="text-xs text-gray-700 flex gap-1"><span className="shrink-0">•</span>{s}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">🔍 Cause</div>
                <p className="text-xs text-gray-600 leading-relaxed">{d.cause}</p>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">🔧 Fix</div>
                <p className="text-xs text-gray-600 leading-relaxed">{d.fix}</p>
              </div>
            </div>
            <div className="bg-white border border-black rounded-xl px-4 py-3 text-xs">
              <span className="font-black">⚠️ Look-alike: </span><span className="text-gray-600">{d.lookAlike}</span>
            </div>
          </div>
        ))}

        <section className="pt-4">
          <h2 className="text-3xl font-black mb-5">Quick Diagnosis Cheat Sheet</h2>
          <div className="space-y-3">
            {[
              {s:"Yellowing starts on BOTTOM leaves",l:"Nitrogen deficiency or pH lockout",a:"Check pH, then add nitrogen"},
              {s:"Yellowing starts on TOP/NEW leaves",l:"Iron deficiency or high pH",a:"Lower pH to 6.0–6.5"},
              {s:"Yellow between veins (veins stay green)",l:"Magnesium deficiency",a:"Epsom salt foliar spray, add cal-mag"},
              {s:"Brown spots with yellow halos",l:"Calcium deficiency",a:"Add cal-mag, check pH"},
              {s:"Burnt brown tips across whole plant",l:"Nutrient burn",a:"Flush and halve nutrient dose"},
              {s:"Burnt tips only on TOP leaves",l:"Light burn",a:"Raise light higher"},
              {s:"Drooping heavy-feeling leaves",l:"Overwatering",a:"Let dry out fully, water less often"},
              {s:"White powdery coating on leaves",l:"Powdery mildew",a:"Isolate, reduce humidity, treat immediately"},
            ].map(row => (
              <div key={row.s} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div className="font-bold text-gray-700">&ldquo;{row.s}&rdquo;</div>
                <div className="text-orange-600 font-bold">→ {row.l}</div>
                <div className="text-green-700">✓ {row.a}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {q:"Why are my cannabis leaves turning yellow?",a:"Most commonly: nitrogen deficiency, pH lockout, overwatering, or magnesium deficiency. Check pH first — most yellowing is pH-related. Soil: 6.0–7.0. Coco/hydro: 5.5–6.5."},
              {q:"Are yellow leaves in late flower normal?",a:"Yes — yellowing in the final 2 weeks of flower is completely normal and desired. The plant is redirecting nutrients from leaves into buds. Do not add nitrogen at this stage."},
              {q:"What does overwatering look like?",a:"Overwatered plants droop with heavy, swollen-feeling leaves — the whole leaf droops. Underwatered plants droop but leaves feel light and papery. Overwatering is the most common beginner mistake."},
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
            {[{href:"/learn/grow-guide",label:"🌱 Full Grow Guide"},{href:"/learn/training",label:"✂️ Training Techniques"},{href:"/learn/cannabinoids",label:"🔬 Cannabinoids"},{href:"/learn/terpenes",label:"🌿 Terpenes"},{href:"/strains",label:"Browse Strains →"}].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">{l.label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
