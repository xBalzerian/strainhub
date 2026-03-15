import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Choose the Right Cannabis Consumption Method | StrainHub Learn",
  description: "Which cannabis consumption method is right for you? A practical guide based on your goals, experience level, health considerations, and lifestyle.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/consumption" className="hover:text-black">Consumption</Link><span>/</span>
          <span className="text-black font-semibold">Choosing the Right Method</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
            🎯 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Choosing the Right Method</h1>
          <p className="text-gray-500 text-lg leading-relaxed">The best consumption method depends on your goals, health status, experience level, and lifestyle. This guide cuts through the noise and gives you a practical framework for making the right choice.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">By Goal: What Are You Trying to Achieve?</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]"><strong>Immediate relief (acute pain, nausea, anxiety attack):</strong> Inhalation (vaporizer) or sublingual tincture — fastest onset, easiest to titrate. <strong>Long-lasting relief (chronic pain, sleep, sustained relaxation):</strong> Edibles, capsules, or transdermal patch — 4–12 hour duration. <strong>Localized pain or inflammation:</strong> Topical cream or balm — no systemic effects, targeted delivery. <strong>Recreational social use:</strong> Inhalation (joint, vaporizer) — controllable, social, fast feedback for dosing. <strong>Microdosing for focus/mood:</strong> Low-dose edibles (2.5mg), sublingual tincture drops, or low-temp dry herb vaporizer. <strong>Medical conditions requiring consistent levels:</strong> Transdermal patch or timed-release capsules — most stable plasma levels.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">By Experience Level</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]"><strong>Complete beginner:</strong> Start with inhalation (dry herb vaporizer at low temperature) or a 2.5–5mg edible. Inhalation gives faster feedback so you can stop before taking too much. Avoid high-potency concentrates, blunts, and edibles over 5mg until you understand your tolerance. <strong>Intermediate:</strong> Expand your toolkit — try tinctures for sublingual precision, explore different strain profiles via vaporizer. Start experimenting with edibles using the 5mg/2-hour-wait rule. <strong>Experienced:</strong> Method selection based on context — inhalation for recreational/social, edibles for evenings, transdermal for consistent medical use. Concentrates require respect for potency even at high tolerance. <strong>Medical patient:</strong> Work with a cannabis-knowledgeable physician. Precision (capsules, tinctures, patches) beats convenience for medical use.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Health Considerations</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]"><strong>Respiratory conditions (asthma, COPD):</strong> Avoid all combustion — use vaporizer at low temp, edibles, tinctures, or transdermal. <strong>GI disorders (Crohn&apos;s, gastroparesis, severe nausea):</strong> Inhalation or transdermal — edible absorption is too unreliable. Suppositories are medically appropriate. <strong>Cardiovascular disease:</strong> Avoid high-dose inhalation (rapid HR increase) — prefer low-dose oral routes with gradual onset. Consult cardiologist. <strong>Liver disease:</strong> Edibles metabolized heavily by liver — prefer inhalation or sublingual. <strong>Pregnancy/breastfeeding:</strong> Avoid all methods — no safe route exists. <strong>Elderly patients:</strong> Start very low (1–2.5mg edible), prefer non-inhalation methods, watch for falls risk and drug interactions.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Practical & Lifestyle Factors</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]"><strong>Discretion required:</strong> Capsules, edibles, tinctures, or topicals — no smell, no smoke, indistinguishable from other supplements. <strong>Drug testing concern:</strong> Topicals (non-transdermal) only — all systemic methods will cause a positive THC test. CBD isolate products (verified 0% THC) carry lower risk but are not zero-risk. <strong>Traveling:</strong> Edibles or capsules — easiest to transport, no paraphernalia. Check destination laws. <strong>Cost sensitivity:</strong> Dry flower vaporized is the most cost-efficient per milligram of cannabinoid delivered. Concentrates are potent but expensive per gram. Edibles have high markup per mg THC. <strong>Convenience:</strong> Pre-filled vape pens and edibles require no preparation. Dry herb vaporizers require loading and maintenance.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Quick Selector</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Fast relief → Vaporizer or sublingual", "Long duration → Edibles or patch", "Local pain → Topical balm", "No smell → Capsules or tincture", "Respiratory issues → Never combust", "Beginners → Vaporizer or 5mg edible", "Drug test concern → Non-transdermal topicals only"].map(f => (
                  <li key={f} className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">→</span><span>{f}</span></li>
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
