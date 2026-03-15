import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ancient Origins of Cannabis: 10,000 BCE | StrainHub Learn",
  description: "Explore the ancient origins of cannabis dating back to 10,000 BCE — from Central Asian domestication to Vedic scripture and Scythian rituals. Science-backed history.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F8F0]">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-black">Home</Link><span>/</span>
          <Link href="/learn" className="hover:text-black">Learn</Link><span>/</span>
          <Link href="/learn/history" className="hover:text-black">History</Link><span>/</span>
          <span className="text-black font-semibold">Ancient Origins</span>
        </div>
      </div>
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ background: "#fff1f2", color: "#be123c" }}>
            🌏 History
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">Ancient Origins: 10,000 BCE</h1>
          <p className="text-gray-500 text-lg leading-relaxed">Cannabis is one of humanity&apos;s oldest cultivated plants. Archaeological and genetic evidence places its domestication in Central Asia as far back as 10,000 BCE — predating the written word, the wheel, and most organized civilizations.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Earliest Archaeological Evidence</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">A landmark 2021 study published in <em>Science Advances</em> analyzed over 110 whole genomes of cannabis and traced all domesticated varieties back to a single origin event in East Asia approximately 12,000 years ago. The Tibetan Plateau and surrounding Altai-Himalayan region is the most likely cradle. Hemp cord impressions found in pottery shards at Xianrendong Cave, China (~10,000 BCE) represent some of the earliest physical evidence. Separately, hemp seeds found at a burial site in Romania date to around 5,500 BCE. By 4,000 BCE, Chinese Neolithic sites routinely contain hemp fibers, seeds, and textiles.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">Ancient China: The Longest Documented Use</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">China&apos;s relationship with cannabis spans at least 6,000 years. The <em>Shennong Bencao Jing</em> (Divine Farmer&apos;s Classic of Materia Medica, compiled ~200 CE but attributed to Emperor Shen Nung, ~2737 BCE) describes cannabis as a treatment for over 100 ailments including gout, rheumatism, malaria, and absent-mindedness. The Chinese character for hemp (麻, <em>má</em>) is among the oldest written characters, appearing in Shang Dynasty oracle bone script (~1600 BCE). Hemp was so central to Chinese civilization that the country was referred to as the &quot;land of mulberry and hemp&quot; in ancient texts.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">India & the Vedic Tradition</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Cannabis appears in the <em>Atharvaveda</em> (~1500 BCE) as one of five sacred plants, described as a &quot;source of happiness, joy-giver, and liberator.&quot; Three preparations are mentioned: bhang (leaves and seeds ground into a drink), ganja (flowering tops), and charas (resin). The god Shiva is strongly associated with cannabis in the Shaiva tradition — devotees offer it at temples during Shivaratri and Holi. This is one of the world&apos;s oldest continuous religious-cannabis traditions, still practiced today.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Scythians Carry It West</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">The Greek historian Herodotus (~440 BCE) documented Scythian nomads entering small tents, throwing cannabis onto hot stones, and inhaling the vapor — calling it a &quot;vapor bath that no Grecian vapour-bath can surpass.&quot; Archaeological confirmation came in 1929 when Rudenko excavated Scythian burial mounds (Pazyryk kurgans, ~500 BCE) in the Altai Mountains containing bronze cauldrons, hemp seeds, and leather pouches — precisely matching Herodotus&apos;s account. The Scythians, ranging across the Eurasian steppe from Central Asia to Eastern Europe, acted as the primary vector carrying cannabis westward into the Persian Empire, the Middle East, and eventually the Mediterranean world.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black mb-3">The Middle East & Early Medical Use</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">Assyrian texts (~900 BCE) reference &quot;qunnabu&quot; used in religious rituals and as medicine for depression and impotence. In 2020, researchers confirmed cannabis resin on an altar at Tel Arad, an 8th-century BCE Israelite shrine — suggesting psychoactive use in religious ceremonies. The Egyptian Ebers Papyrus (~1550 BCE) mentions cannabis for inflammation, with pollen found in the tomb of Ramesses II (died 1213 BCE). Across the ancient Middle East, the plant was known simultaneously as fiber source, food, medicine, and spiritual tool.</p>
            </section>
          </div>
          <div className="space-y-6">
            <div className="bg-white border-2 border-black rounded-2xl p-5">
              <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Facts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Earliest hemp cord: ~10,000 BCE, Taiwan",
                  "Genetic origin: Single event, East Asia ~12,000 years ago",
                  "First written record: Shen Nung, ~2737 BCE",
                  "Vedic scripture: Atharvaveda ~1500 BCE",
                  "Scythian spread west: ~600–400 BCE",
                  "Israeli altar residue confirmed: 8th century BCE",
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
