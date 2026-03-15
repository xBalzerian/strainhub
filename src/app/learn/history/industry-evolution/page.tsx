import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Industry & Economic Evolution | StrainHub Learn",
  description: "From medical dispensaries to Wall Street listings to a $50B global market — the complete economic history of the legal cannabis industry.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Industry & Economic Evolution</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            📈 History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Industry & Economic Evolution</h1>
          <p className="text-gray-500 text-lg leading-relaxed">The legal cannabis industry went from zero to $50+ billion in under a decade — one of the fastest industry formations in history. This is how it happened, and where it&apos;s going.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Medical Era (1996–2012)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">California&apos;s Proposition 215 (1996) created the first legal cannabis market — dispensaries operating in a legal gray zone, relying on physician recommendations to sidestep the federal ban. Colorado, Oregon, Nevada, and eventually 18 other states followed with medical programs through the 2000s. The industry was small-scale, dominated by cultivators and dispensary owners operating under constant federal threat. DEA raids were common. Banking was nearly impossible — most businesses operated cash-only. But the foundations of a professional industry were being built: testing labs, compliance frameworks, and consumer retail experiences.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Recreational Legalization & the Green Rush (2012–2018)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Colorado Amendment 64 and Washington I-502 (both passed November 2012) created the first regulated adult-use markets. The economic argument proved decisive: Colorado collected $135 million in cannabis taxes in its first full year, funding schools and infrastructure. Oregon, Alaska, Nevada, Massachusetts, California, Maine, and Vermont followed by 2018. Canada became the first G7 nation to federalize recreational cannabis in October 2018, creating a national market and triggering an international investment frenzy. The term &quot;green rush&quot; — evoking the Gold Rush — entered mainstream business vocabulary.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Wall Street Arrives (2018–2020)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Canadian legalization triggered a stock market boom. Companies like Canopy Growth, Tilray, Aurora Cannabis, and Aphria listed on the NYSE and NASDAQ, raising billions from institutional investors. Constellation Brands (Corona beer) invested $4 billion in Canopy Growth in 2018. Altria (Marlboro) invested $1.8 billion in Cronos Group. The valuations were euphoric and largely disconnected from fundamentals. By 2019–2020, the bubble burst: oversupply, regulatory delays, persistent illicit market competition, and operational mismanagement caused catastrophic stock crashes. Many Canadian LPs lost 90%+ of their peak value.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Modern US Market (2020–Present)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The US market matured around vertically integrated multi-state operators (MSOs): Curaleaf, Green Thumb Industries (GTI), Trulieve, Verano, and Cresco Labs. Annual US legal sales exceeded $30 billion in 2023. The craft cannabis movement — small-batch, sun-grown, terroir-driven, direct-to-consumer — grew alongside it, modeled on the craft beer and artisanal wine industries. Hemp-derived cannabinoids (CBD, delta-8 THC, THCA flower) created a separate multi-billion dollar market operating in federal gray zones following the 2018 Farm Bill, which legalized hemp with under 0.3% THC.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">What&apos;s Next</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The proposed rescheduling of cannabis from Schedule I to Schedule III (announced 2024) would allow interstate commerce, unlock banking access via the SAFE Banking Act, and enable pharmaceutical research — transforming the economics of the industry. Germany legalized recreational cannabis in April 2024 — the first major EU nation to do so. Mexico, Thailand (which then partially reversed), and several Southeast Asian countries are in various stages of reform. Global market analysts project $100B+ worldwide by 2030. The industry faces ongoing challenges: illicit market competition, high state tax rates, banking restrictions, and the unresolved tension between corporate consolidation and social equity.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "First legal market: California 1996 (medical)",
                  "First recreational: Colorado & Washington 2012",
                  "Colorado Year 1 tax revenue: $135M",
                  "Canada federally legal: October 2018",
                  "US legal sales 2023: $30B+",
                  "Global market 2024: ~$50B",
                  "Germany legalized recreation: April 2024",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/learn/history" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-all">← Back to History</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
