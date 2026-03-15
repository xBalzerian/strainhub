import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis & Cultural Movements | StrainHub Learn",
  description: "From the Jazz Age to the counterculture revolution to today's legalization movement — how cannabis shaped and was shaped by culture.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Cultural Movements</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            ✊ History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Cannabis & Cultural Movements</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis has been inseparable from the most significant cultural shifts of the past century — from Jazz Age Harlem to the Summer of Love, from reggae to the modern legalization movement.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Jazz Age (1920s–1940s)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis — called &quot;reefer,&quot; &quot;muggles,&quot; &quot;tea,&quot; or &quot;gauge&quot; — was central to the jazz scene in New Orleans, Chicago, and Harlem. Louis Armstrong was an open, lifelong advocate who wrote about it extensively and was arrested for possession in 1930 (charges dropped). Cab Calloway&apos;s <em>Reefer Man</em> (1932), Benny Goodman&apos;s <em>Sweet Marijuana Brown</em>, and dozens of other jazz standards celebrated it openly. The &quot;viper&quot; subculture — musicians who smoked — had its own vocabulary, rituals, and social codes. Anslinger specifically targeted Black jazz musicians in his campaign, which historians now recognize as racially motivated suppression of Black cultural spaces.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Beat Generation (1950s)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Jack Kerouac, Allen Ginsberg, William S. Burroughs, and the broader Beat movement openly celebrated cannabis as a tool for expanding consciousness, dissolving conformity, and accessing authentic experience. <em>On the Road</em>, <em>Howl</em>, and <em>Naked Lunch</em> portrayed its use sympathetically at a time when possession could mean serious prison time. The Beats normalized cannabis for a generation of American intellectuals, artists, and eventually the mainstream — planting seeds for the cultural explosion of the 1960s.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The 1960s Counterculture</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis became the defining symbol of 1960s antiwar and civil rights counterculture. The Summer of Love (San Francisco, 1967), the March on Washington, and Woodstock (1969) all featured cannabis prominently — not as mere recreation but as a political and philosophical statement against the establishment. NORML (National Organization for the Reform of Marijuana Laws) was founded in 1970. The cultural visibility of cannabis made prohibition increasingly difficult to justify — but also directly triggered Nixon&apos;s retaliatory War on Drugs crackdown targeting the exact communities that used it.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Reggae & the Rastafari Movement</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Bob Marley, Peter Tosh, and the Rastafari movement gave cannabis a global spiritual identity. Rastafarians consider ganja a sacrament — the &quot;wisdom weed&quot; — rooted in Old Testament passages (Genesis 1:29, Psalm 104:14). Reggae music carried this philosophy worldwide through the 1970s and 80s, introducing cannabis culture to audiences across Europe, Africa, Latin America, and Asia. Marley&apos;s global reach was arguably the single most powerful force in normalizing cannabis internationally before legalization campaigns began.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Modern Legalization Movement (1990s–Present)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The modern movement began with patient advocates — HIV/AIDS patients in San Francisco in the early 1990s openly using cannabis for appetite and pain, demanding legal protection. California&apos;s Proposition 215 (1996) created the first legal medical market. Colorado and Washington legalized recreation in 2012. The cultural shift accelerated as mainstream celebrities, athletes, and politicians began openly discussing use. By 2024, 24 US states have full adult-use legalization, and polling consistently shows 70%+ public support — a complete reversal from the 1960s.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Jazz viper culture: 1920s–40s Harlem & Chicago",
                  "Beat Generation normalized use: 1950s",
                  "NORML founded: 1970",
                  "Woodstock & Summer of Love: 1967–1969",
                  "CA Prop 215 (first medical): 1996",
                  "First recreational states: CO & WA, 2012",
                  "Public support 2024: ~70%+",
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
