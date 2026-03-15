import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Consumption Methods Guide — Bioavailability, Onset & Health Impact | StrainHub",
  description: "Every cannabis consumption method compared: smoking, vaporizing, edibles, tinctures, topicals. Bioavailability percentages, onset times, health impacts, and cost analysis.",
  alternates: { canonical: "https://www.strainhub.org/learn/consumption" },
};

const METHODS = [
  { method: "Vaporization", onset: "1–3 min", duration: "1–3 hr", bioavail: "40–70%", health: "Low risk", icon: "💨" },
  { method: "Smoking", onset: "1–3 min", duration: "1–3 hr", bioavail: "15–35%", health: "Moderate risk", icon: "🚬" },
  { method: "Edibles", onset: "30–90 min", duration: "4–8 hr", bioavail: "6–20%", health: "Very low risk", icon: "🍪" },
  { method: "Sublingual", onset: "10–20 min", duration: "2–4 hr", bioavail: "15–30%", health: "Very low risk", icon: "💧" },
  { method: "Topical", onset: "15–30 min", duration: "2–4 hr", bioavail: "~3–5%", health: "Very low risk", icon: "🧴" },
  { method: "Transdermal", onset: "1–2 hr", duration: "8–12 hr", bioavail: "~35–45%", health: "Very low risk", icon: "🩹" },
];

const SECTIONS = [
  { slug: "inhalation", title: "Inhalation Methods", desc: "Joints, blunts, pipes, bongs, vaporizers, dab rigs — complete comparison of combustion vs. vaporization, temperature science, and harm reduction.", tags: ["Practical", "Beginner"], readTime: "16 min" },
  { slug: "edibles", title: "Edibles & Oral Methods", desc: "Decarboxylation, fat-soluble infusions, nanoemulsions, onset variability, dosing protocols, and why edibles hit differently.", tags: ["Science", "Intermediate"], readTime: "14 min" },
  { slug: "topicals", title: "Topical & Transdermal Applications", desc: "Lotions, patches, bath products, massage oils — localized vs. systemic delivery and when each is appropriate.", tags: ["Medical", "Beginner"], readTime: "8 min" },
  { slug: "emerging", title: "Emerging Methods", desc: "Suppositories, nebulizers, metered-dose inhalers, sublingual strips, transdermal microdosing — the future of cannabis delivery.", tags: ["Advanced", "Expert"], readTime: "10 min" },
  { slug: "bioavailability", title: "Bioavailability Deep Dive", desc: "Why the same dose hits completely differently depending on method — first-pass metabolism, absorption rates, onset prediction, and optimization.", tags: ["Science", "Intermediate"], readTime: "12 min" },
  { slug: "method-selection", title: "Method Selection Framework", desc: "How to choose the right method based on onset needed, duration desired, health goals, discretion requirements, and cost constraints.", tags: ["Practical", "Beginner"], readTime: "8 min" },
];

export default function ConsumptionLearnPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <span className="text-black font-semibold">Consumption Methods</span>
        </div>
          {/* Hero Image */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learn/consumption.jpg"
              alt="Hero illustration"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#f0f9ff", color: "#0369a1" }}>💨 Consumption Methods</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">How to Consume<br />Cannabis</h1>          <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-6">Every method compared by bioavailability, onset time, duration, health impact, and cost — so you can make informed choices.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Quick comparison table */}
        <section>
          <h2 className="text-lg font-black text-black mb-4">Quick Comparison</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-6 gap-0 text-xs font-bold text-gray-400 uppercase tracking-widest px-5 py-3 border-b border-gray-100 bg-gray-50">
              <div className="col-span-1">Method</div>
              <div>Onset</div>
              <div>Duration</div>
              <div>Bioavail.</div>
              <div className="col-span-2">Health Risk</div>
            </div>
            {METHODS.map((m, i) => (
              <div key={m.method} className={`grid grid-cols-6 gap-0 px-5 py-3.5 text-sm ${i % 2 === 0 ? "" : "bg-gray-50/50"} border-b border-gray-100 last:border-0`}>
                <div className="col-span-1 font-bold text-black flex items-center gap-2"><span>{m.icon}</span>{m.method}</div>
                <div className="text-gray-600">{m.onset}</div>
                <div className="text-gray-600">{m.duration}</div>
                <div className="font-semibold" style={{ color: "#16a34a" }}>{m.bioavail}</div>
                <div className="col-span-2 text-gray-600">{m.health}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="space-y-3">
            {SECTIONS.map((s, i) => (
              <Link key={s.slug} href={`/learn/consumption/${s.slug}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-5 hover:border-black hover:shadow-[3px_3px_0px_#000] transition-all group block">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400 flex-shrink-0 mt-0.5">{String(i+1).padStart(2,"0")}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="font-black text-base text-black group-hover:underline">{s.title}</h2>
                    <span className="text-xs text-gray-400 flex-shrink-0">{s.readTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {s.tags.map(t => <span key={t} className="text-xs font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <div className="pt-4 border-t border-gray-200">
          <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-black flex items-center gap-2">← Back to Learning Hub</Link>
        </div>
      </div>
    </div>
  );
}
