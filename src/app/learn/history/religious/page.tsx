import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis in Religious & Spiritual Traditions | StrainHub Learn",
  description: "Cannabis has served as a spiritual sacrament across Hindu, Rastafari, ancient Judaic, and Scythian traditions for thousands of years.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Religious & Spiritual Traditions</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            🕊️ History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Religious & Spiritual Traditions</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis has been used as a spiritual sacrament across at least a dozen major religious and cultural traditions over 4,000 years — a record no other psychoactive plant can match.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Hinduism & the Vedic Tradition</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis is one of five sacred plants named in the <em>Atharvaveda</em> (~1500 BCE), described as a &quot;source of happiness, joy-giver, liberator,&quot; and a gift from the god Indra. Three preparations are recognized: <strong>bhang</strong> (leaves and seeds ground into a paste or drink), <strong>ganja</strong> (dried flowers, smoked), and <strong>charas</strong> (hand-rolled resin from live plants). Lord Shiva, one of Hinduism&apos;s principal deities, is traditionally depicted with cannabis and is said to have discovered it. Bhang lassi — a spiced yogurt drink with ground cannabis — is sold legally at government shops across India during Holi and Shivaratri festivals. Shaiva ascetics (Sadhus) have smoked charas ritually for centuries.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Rastafarianism</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Founded in Jamaica in the 1930s, the Rastafari movement considers cannabis — &quot;the herb,&quot; &quot;ganja,&quot; &quot;holy weed&quot; — a divine sacrament facilitating meditation, spiritual reasoning, and connection to Jah (God). Rastafarians cite Genesis 1:29 (&quot;I give you every seed-bearing plant&quot;) and Psalm 104:14 as Biblical foundation. The movement rejects it as mere recreation — ritual use is communal, intentional, and preceded by prayer. Bob Marley became the global face of this tradition, spreading it to audiences on every continent. Legal recognition of Rastafari cannabis use remains contested in the US and Jamaica.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Ancient Judaism</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">In 2020, researchers published confirmation of cannabis resin on an altar at Tel Arad — an 8th-century BCE Israelite shrine — alongside frankincense, suggesting deliberate use in religious ceremonies. The Hebrew term <em>kaneh-bosm</em>, appearing in Exodus 30:23 as an ingredient in the sacred anointing oil, has been argued by some scholars to refer to cannabis — a claim supported by linguistic analysis but contested by others who favor a calamus reading. Cannabis pollen was found in the tomb of Ramesses II (d. 1213 BCE). While firm conclusions remain debated, the archaeological evidence of ritual cannabis use in ancient Israel is now well-established.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Scythian Vapor Rituals</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">As documented in the Ancient Origins section, the Scythian nomads of Central Asia (~600–400 BCE) used cannabis in elaborate ritualistic steam baths — entering small tents, throwing cannabis onto heated stones, and inhaling deeply. Herodotus described it as surpassing any Greek steam bath. Archaeological excavation of Scythian burial mounds (Pazyryk kurgans) confirmed the practice exactly as described: bronze cauldrons, hemp seeds, and leather inhalation bags were found in burial sites. Cannabis use was central to Scythian funerary rites and appeared to serve both spiritual and grief-processing functions.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Modern Religious Movements</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Several contemporary religious movements claim cannabis as a protected sacrament under religious freedom law. The <strong>Ethiopian Zion Coptic Church</strong> (founded 1975, US) has fought ongoing legal battles for protection. The <strong>Church of Cannabis</strong> (Indiana) was founded the day Indiana&apos;s Religious Freedom Restoration Act took effect in 2015. The <strong>THC Ministry</strong> (Hawaii) operated for years before legal challenges. US courts have issued inconsistent rulings — some granting protection, others denying it. The legal question of whether the Religious Freedom Restoration Act (RFRA) protects cannabis sacraments remains unresolved at the federal level.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Vedic scripture reference: Atharvaveda ~1500 BCE",
                  "Shiva tradition: active to present day",
                  "Bhang sold legally at Indian government shops",
                  "Israeli altar residue confirmed: 8th century BCE",
                  "Rastafari founded: Jamaica 1930s",
                  "Scythian vapor rituals: ~600 BCE, archaeologically confirmed",
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
