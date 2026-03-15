import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Inhalation Methods: Smoking & Vaporizing | StrainHub Learn",
  description: "Complete guide to cannabis inhalation — joints, pipes, bongs, dry herb vaporizers, and concentrate rigs. Onset times, bioavailability, and health comparisons.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/consumption" className="hover:text-black">Consumption</Link><span>/</span>
          <span className="text-black font-semibold">Inhalation Methods</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#eff6ff", color: "#1d4ed8" }}>
            💨 Consumption
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Inhalation Methods</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Inhalation is the fastest-acting and most controllable consumption method — delivering cannabinoids to the bloodstream via the lungs in minutes. Here&apos;s everything you need to know about doing it right.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">How Inhalation Works</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">When cannabis smoke or vapor is inhaled, cannabinoids cross the thin alveolar membranes in the lungs and enter the bloodstream directly — bypassing first-pass liver metabolism. This produces a rapid onset (2–10 minutes) and relatively predictable peak (20–45 minutes). Bioavailability via inhalation ranges from 10–35%, depending on inhalation technique (depth, breath-hold duration), device efficiency, and the form of cannabis. Because effects come on quickly, inhalation allows for precise dose titration — users can take one puff, wait 10 minutes, and assess before deciding to consume more. This &quot;start low, go slow&quot; approach is much easier with inhalation than with edibles.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Joints, Blunts & Spliffs</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The joint — cannabis rolled in paper — is the most widespread consumption method globally. It&apos;s simple, portable, and social. However, combustion at ~800°C produces over 100 toxins including carbon monoxide, benzene, and tar, with similar respiratory risks to cigarettes (though different cancer risk profile). A blunt uses a tobacco leaf or cigar wrap — adding nicotine, which is highly addictive and contributes to cardiovascular strain. A spliff mixes cannabis with tobacco — common in Europe, uncommon in North America. For regular users, the respiratory impact of daily smoking is meaningful — chronic bronchitis symptoms are well-documented. Filters (used commonly in Europe) reduce particulate intake but also reduce cannabinoid delivery.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Pipes & Bongs</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Pipes (spoons, one-hitters, chillums) combust cannabis similarly to joints but deliver smoke more directly without paper combustion products. Water pipes (bongs) filter smoke through water, cooling it and removing some particulates — though research shows they don&apos;t significantly reduce harmful gas-phase toxins like carbon monoxide. Bongs deliver larger volumes of smoke per hit, often producing stronger acute effects. Glass is the preferred material (borosilicate glass is chemically inert); avoid plastic, painted, or low-quality materials that can off-gas when heated. Proper cleaning of pipes is essential — biofilm and residue buildup can harbor pathogens.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Dry Herb Vaporizers</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Dry herb vaporizers heat cannabis to 160–220°C — well below the combustion point (~230°C) — producing vapor instead of smoke. This eliminates most combustion toxins while delivering cannabinoids and terpenes efficiently. Studies show vaporized cannabis contains 95%+ fewer toxic compounds than combusted smoke. Bioavailability is higher (15–25%), effects are cleaner, and the flavor profile is substantially better — terpenes come through fully instead of being destroyed by combustion. Temperature control matters: 160–180°C preserves terpenes and produces lighter effects; 185–210°C releases more THC for stronger effects. Leading devices: Storz & Bickel Volcano/Mighty, DynaVap, Arizer, PAX. Desktop vaporizers (Volcano, Herborizer) provide the most consistent, high-quality vapor.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Concentrate Rigs & Dabbing</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Dabbing involves vaporizing cannabis concentrates (wax, shatter, live resin, rosin, distillate) on a heated nail or banger — typically at 300–450°C. Concentrates range from 60–95%+ THC, making dose control critical. A single dab can deliver more THC than an entire joint. Onset is almost immediate, effects are intense and short-lived compared to flower. Cold-start dabs (loading concentrate then applying heat) preserve more terpenes and are smoother than traditional hot-nail methods. Low-temperature dabbing (300–350°C) produces better flavor and less harshness. For regular concentrate users, e-rigs (Puffco Peak, Focus V Carta) provide consistent temperature control without a torch.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Onset: 2–10 min (inhalation)",
                  "Peak: 20–45 min",
                  "Duration: 1.5–3 hours",
                  "Bioavailability: 10–35%",
                  "Vaporizing eliminates 95%+ of combustion toxins",
                  "Ideal vape temp: 170–210°C",
                  "Concentrates: 60–95%+ THC — dose carefully",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
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
