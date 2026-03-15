import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Spread of Cannabis: Colonial Era | StrainHub Learn",
  description: "How cannabis traveled the world along trade routes, Silk Road caravans, and colonial empires — reaching every inhabited continent over 3,000 years.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Global Spread & Colonial Era</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            🗺️ History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Global Spread & the Colonial Era</h1>
          <p className="text-gray-500 text-lg leading-relaxed">From Central Asia, cannabis spread across the globe over three millennia — carried by nomadic traders, Islamic merchants, colonial empires, and enslaved African peoples. Each culture it reached adapted it to its own needs.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Silk Road (500 BCE – 1500 CE)</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis traveled westward from Central Asia along Silk Road trade routes, reaching Persia, the Arab world, and eventually southern Europe. Arab physicians including Ibn Sina (Avicenna, ~1000 CE) documented cannabis extensively in medical texts — prescribing it for pain, inflammation, and earache. The word &quot;hashish&quot; derives from Arabic. By 900 CE hashish production was well-established in Persia and North Africa, where it was consumed as a paste, smoked with pipes, and eaten in confections. The Arabian Nights references it in multiple stories.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Africa</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis arrived in East Africa via Indian Ocean trade routes between 1000–1400 CE, likely introduced by Indian and Arab traders at port cities like Mombasa and Zanzibar. The Bantu migration subsequently spread it across sub-Saharan Africa. Cannabis — called dagga, njamba, or bangi depending on the region — became deeply embedded in the spiritual and social practices of the Zulu, Sotho, Xhosa, and Khoisan peoples. South Africa developed iconic landrace strains uniquely adapted to its climate, the most famous being Durban Poison. Ethiopia and the Congo basin also developed distinct cannabis traditions that survive today.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Europe</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Hemp cultivation spread into Europe from Central Asia around 500–200 BCE, primarily for fiber. The Vikings grew hemp for rope and sails. Medieval Europeans used it for textile production across the continent. Cannabis as medicine entered European awareness through Arabic translations of Greek and Persian texts, and through returning Crusaders in the 12th–13th centuries. By the 16th century, hemp cultivation was legally mandated in England, France, and the German states for naval purposes. Recreational hashish use in Europe began in earnest after Napoleon&apos;s Egyptian campaign (1798–1801) returned soldiers familiar with it.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Americas</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis did not exist in the Americas before European colonization — there are no pre-Columbian records of it. The Spanish brought hemp to Chile in 1545 for rope and fiber. The British Crown mandated hemp cultivation at Jamestown, Virginia, from 1611. Hemp was so critical to colonial economies that Virginia, Massachusetts, and Connecticut all passed laws requiring farmers to grow it. Recreational cannabis use entered the Americas much later: via Caribbean and South American workers in the early 1900s, and via Mexican immigrants in the US Southwest after 1910.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The British Colonial Network</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Britain spread hemp cultivation throughout its empire — India, Canada, Australia, South Africa, New Zealand — primarily to supply the Royal Navy with rope and sailcloth. The British East India Company monopolized cannabis trade in India, cataloging its medical and recreational uses extensively. The landmark Indian Hemp Drugs Commission (1894), commissioned by the British colonial government, produced a 3,000-page report concluding that moderate cannabis use caused little harm and that prohibition would be both impractical and unjust — a finding ignored for the next century.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Reached Middle East via Silk Road: ~500 BCE",
                  "Ibn Sina documented medical use: ~1000 CE",
                  "Arrived in East Africa: 1000–1400 CE",
                  "First Americas hemp: Chile 1545",
                  "Jamestown hemp mandate: 1611",
                  "Indian Hemp Drugs Commission: 1894 — recommended against prohibition",
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
