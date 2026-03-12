import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStrainSlugs, getStrainBySlug, getSimilarStrains } from "@/lib/strains";
import { strainMetadata, strainJsonLd } from "@/lib/seo";
import StrainCard from "@/components/StrainCard";

// Pre-generate all strain pages at build time (SSG = fast + SEO)
export async function generateStaticParams() {
  const slugs = await getAllStrainSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const strain = await getStrainBySlug(params.slug);
  if (!strain) return { title: "Strain Not Found" };
  return strainMetadata(strain);
}

const TERPENE_INFO: Record<string, { emoji: string; desc: string }> = {
  Myrcene: { emoji: "🫚", desc: "Earthy, musky. The most abundant terpene in cannabis. Promotes relaxation and sedation. Also found in mangoes and hops — eating mango before consuming cannabis may intensify effects." },
  Caryophyllene: { emoji: "🌶️", desc: "Spicy, peppery. The only terpene that also acts as a cannabinoid, binding directly to CB2 receptors. Strong anti-inflammatory properties. Also found in black pepper and cloves." },
  Limonene: { emoji: "🍋", desc: "Citrusy, fresh. Uplifting and mood-elevating. May reduce stress and anxiety. Commonly found in citrus peels. Known to enhance the absorption of other terpenes." },
  Linalool: { emoji: "💜", desc: "Floral, lavender. Calming and sedating. May help with anxiety, depression, and insomnia. The same terpene responsible for lavender's relaxing properties." },
  Pinene: { emoji: "🌲", desc: "Pine, fresh, earthy. May promote alertness and memory retention. Acts as a bronchodilator (opens airways). Found in pine needles, rosemary, and basil." },
  Ocimene: { emoji: "🌸", desc: "Sweet, herbal, woody. Uplifting and has decongestant properties. Common in tropical strains. Found in mint, parsley, and orchids." },
  Terpinolene: { emoji: "🍏", desc: "Floral, piney, fresh, slightly herbal. Mildly sedating with antioxidant properties. Particularly common in sativa-dominant strains. Found in apples, cumin, and lilacs." },
  Humulene: { emoji: "🍺", desc: "Earthy, woody, hoppy. May suppress appetite — rare among cannabis compounds. Anti-inflammatory. The same terpene that gives beer its hoppy aroma." },
};

const EFFECT_DESC: Record<string, string> = {
  Relaxed: "Deep physical and mental relaxation. Perfect for unwinding after a stressful day or easing muscle tension.",
  Happy: "Elevates mood and promotes feelings of joy, contentment, and overall wellbeing.",
  Euphoric: "Intense feelings of happiness and wellbeing. One of the most sought-after cannabis effects.",
  Creative: "Unlocks creative thinking, free association, and artistic inspiration. Great for creative projects.",
  Energetic: "Boosts energy, motivation, and physical activity. Great for daytime use and exercise.",
  Sleepy: "Promotes drowsiness and helps you fall asleep faster and stay asleep longer.",
  Uplifted: "Lifts your spirits and leaves you feeling positive, optimistic, and sociable.",
  Focused: "Sharpens mental clarity and concentration. Helps you stay on task without distraction.",
  Hungry: "Stimulates appetite strongly. Also known as 'the munchies.' Great for appetite loss.",
  Giggly: "Induces laughter and a lighthearted, playful, social mood.",
  Tingly: "Creates a pleasant tingling sensation that spreads through the body.",
};

const MOOD_EMOJI: Record<string, string> = {
  Relaxed: "😌", Happy: "😄", Euphoric: "🤩", Creative: "🎨",
  Energetic: "⚡", Sleepy: "😴", Uplifted: "🚀", Focused: "🎯",
  Giggly: "😂", Hungry: "🍔", Tingly: "✨",
};

export default async function StrainPage({ params }: { params: { slug: string } }) {
  const [strain, similarStrains] = await Promise.all([
    getStrainBySlug(params.slug),
    getSimilarStrains("", params.slug, 4),
  ]);

  if (!strain) notFound();

  const similar = await getSimilarStrains(strain.type, strain.slug, 4);
  const jsonLd = strainJsonLd(strain);
  const thcPct = Math.min(100, (strain.thc_max / 35) * 100);
  const cbdPct = Math.min(100, (strain.cbd_max / 25) * 100);
  const potency = strain.thc_max >= 28 ? "🔴 Very High" : strain.thc_max >= 22 ? "🟠 High" : strain.thc_max >= 16 ? "🟡 Moderate" : "🟢 Mild";
  const typeColor = strain.type === "Indica" ? "text-indica bg-indica-bg border-indica-border" : strain.type === "Sativa" ? "text-sativa bg-sativa-bg border-sativa-border" : "text-hybrid bg-hybrid-bg border-hybrid-border";

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-xs font-semibold text-gray-400 mb-6">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <Link href="/strains" className="hover:text-brand">Strains</Link>
          <span>/</span>
          <span className="text-brand">{strain.name}</span>
        </nav>

        {/* Back button */}
        <Link href="/strains" className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-xl text-sm font-bold shadow-brutal-sm hover:bg-lime transition-all mb-8">
          ← Back to Strains
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 mb-12">
          {/* LEFT — Image + Quick Info */}
          <div className="lg:sticky lg:top-24 self-start">
            {strain.image_url ? (
              <img src={strain.image_url} alt={`${strain.name} cannabis strain`} className="w-full aspect-square object-cover rounded-2xl border-2 border-black shadow-brutal-lg mb-4" />
            ) : (
              <div className="w-full aspect-square bg-gray-100 rounded-2xl border-2 border-black flex items-center justify-center text-8xl mb-4">🌿</div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-brutal-sm ${typeColor}`}>
                {strain.type === "Indica" ? "🍇" : strain.type === "Sativa" ? "☀️" : "⚡"} {strain.type}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-brutal-sm bg-lime">
                🔥 THC {strain.thc_min}–{strain.thc_max}%
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black shadow-brutal-sm bg-white">
                {potency} Potency
              </span>
            </div>

            {/* THC / CBD Bars */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm mb-4">
              <div className="mb-3">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>⚡ THC</span>
                  <span className="text-lime-dark font-black">{strain.thc_max}%</span>
                </div>
                <div className="bg-gray-200 rounded h-2.5 border border-black overflow-hidden">
                  <div className="bg-lime h-full rounded" style={{ width: `${thcPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>💙 CBD</span>
                  <span className="font-black">{strain.cbd_max}%</span>
                </div>
                <div className="bg-gray-200 rounded h-2.5 border border-black overflow-hidden">
                  <div className="bg-blue-400 h-full rounded" style={{ width: `${cbdPct}%` }} />
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-lime-pale border-2 border-black rounded-xl p-4 shadow-brutal-sm">
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3">Quick Facts</div>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  ["Type", strain.type],
                  ["THC Range", `${strain.thc_min}–${strain.thc_max}%`],
                  ["CBD", `${strain.cbd_max}%`],
                  ["Flowering", `${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks`],
                  ["Difficulty", strain.grow_difficulty],
                  ["Yield", strain.grow_yield],
                  ["Height", strain.grow_height],
                  ...(strain.parents?.length ? [["Parents", strain.parents.slice(0, 2).join(" × ")]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <strong className="font-black">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Full Info */}
          <div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-3">{strain.name}</h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 pb-8 border-b-2 border-dashed border-gray-200">
              {strain.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "THC Range", value: `${strain.thc_min}–${strain.thc_max}%`, color: "text-lime-dark" },
                { label: "CBD", value: `${strain.cbd_max}%`, color: "" },
                { label: "Flowering", value: `${strain.flowering_weeks_min}–${strain.flowering_weeks_max}w`, color: "" },
              ].map((s) => (
                <div key={s.label} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm text-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Effects */}
            <div className="mb-8">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-3 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-200">✨ Effects</h2>
              <div className="flex flex-col gap-3">
                {strain.effects?.map((e) => (
                  <div key={e} className="flex items-center gap-4 bg-lime-pale border-2 border-black rounded-xl px-4 py-3">
                    <span className="text-2xl">{MOOD_EMOJI[e] || "✨"}</span>
                    <div>
                      <div className="font-black text-sm">{e}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{EFFECT_DESC[e] || "A commonly reported effect of this strain."}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flavors */}
            <div className="mb-8">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-3 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-200">👅 Flavor & Aroma</h2>
              <div className="flex flex-wrap gap-2">
                {strain.flavors?.map((f) => (
                  <span key={f} className="font-bold text-sm px-4 py-2 rounded-full border-2 border-black shadow-brutal-sm bg-amber-50 text-amber-700 border-amber-200">
                    🍋 {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Helps With */}
            <div className="mb-8">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-3 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-200">💊 Reported to Help With</h2>
              <div className="grid grid-cols-2 gap-2">
                {strain.helps_with?.map((h) => (
                  <div key={h} className="bg-sativa-bg border border-sativa-border rounded-xl px-4 py-2.5 text-sm font-bold text-sativa">
                    ✅ {h}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                ⚠️ These are user-reported effects, not medical advice. Always consult a healthcare provider.
              </p>
            </div>

            {/* Genetics */}
            {strain.parents?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-3 after:content-[''] after:flex-1 after:h-0.5 after:bg-gray-200">🌱 Genetics & Lineage</h2>
                <div className="bg-white border-2 border-black rounded-xl p-5 shadow-brutal-sm">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    {strain.name} was created by crossing {strain.parents.join(" and ")}, combining the best traits of both parent strains.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {strain.parents.map((p) => (
                      <Link key={p} href={`/strains/${p.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                        className="font-bold text-sm px-4 py-2 rounded-xl border-2 border-black shadow-brutal-sm bg-white hover:bg-lime transition-all">
                        {p} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Terpene Deep Dive */}
        <div className="bg-white border-2 border-black rounded-2xl p-7 shadow-brutal mb-6">
          <h2 className="text-xl font-black mb-2">🧬 Terpene Profile</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Terpenes give {strain.name} its distinctive aroma and contribute to its effects through the entourage effect — the synergy between cannabinoids and terpenes.
          </p>
          <div className="flex flex-col gap-4">
            {strain.terpenes?.map((t) => {
              const info = TERPENE_INFO[t] || { emoji: "🌿", desc: "A terpene contributing to this strain's unique aroma and effect profile." };
              return (
                <div key={t} className="flex gap-4 bg-indica-bg border border-indica-border rounded-xl px-5 py-4">
                  <span className="text-2xl mt-0.5">{info.emoji}</span>
                  <div>
                    <div className="font-black text-indica mb-1">{t}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{info.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grow Guide */}
        <div className="bg-white border-2 border-black rounded-2xl p-7 shadow-brutal mb-6">
          <h2 className="text-xl font-black mb-2">🌿 Growing {strain.name}</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {strain.name} is a <strong>{strain.grow_difficulty.toLowerCase()}</strong>-to-grow {strain.type.toLowerCase()} that flowers in {strain.flowering_weeks_min}–{strain.flowering_weeks_max} weeks.
            Plants reach a <strong>{strain.grow_height.toLowerCase()}</strong> height with a <strong>{strain.grow_yield.toLowerCase()}</strong> yield.
            {strain.grow_difficulty === "Easy" ? " Perfect for beginners — forgiving and resilient." : strain.grow_difficulty === "Moderate" ? " Best for intermediate growers." : " Recommended for experienced cultivators only."}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Difficulty", val: strain.grow_difficulty, icon: strain.grow_difficulty === "Easy" ? "🟢" : strain.grow_difficulty === "Moderate" ? "🟡" : "🔴" },
              { label: "Yield", val: strain.grow_yield, icon: strain.grow_yield === "High" ? "🤑" : "💰" },
              { label: "Height", val: strain.grow_height, icon: "📏" },
              { label: "Flowering Time", val: `${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks`, icon: "⏱" },
            ].map((item) => (
              <div key={item.label} className="bg-off-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{item.label}</div>
                <div className="text-lg font-black">{item.icon} {item.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ — SEO Gold */}
        <div className="bg-lime-pale border-2 border-black rounded-2xl p-7 shadow-brutal mb-10">
          <h2 className="text-xl font-black mb-6">❓ People Also Ask About {strain.name}</h2>
          <div className="flex flex-col gap-0 divide-y-2 divide-gray-200">
            {[
              { q: `What are the effects of ${strain.name}?`, a: `${strain.name} is commonly reported to produce ${strain.effects?.join(", ")} effects. As a ${strain.type} strain, it's ${strain.type === "Indica" ? "best used in the evening for relaxation" : strain.type === "Sativa" ? "popular for daytime use and creativity" : "versatile for day or evening use"}.` },
              { q: `How strong is ${strain.name}?`, a: `${strain.name} contains ${strain.thc_min}–${strain.thc_max}% THC — rated ${strain.thc_max >= 28 ? "very high" : strain.thc_max >= 22 ? "high" : "moderate"} potency. ${strain.thc_max >= 25 ? "Beginners should start with a very small amount and wait." : "Suitable for most experience levels."}` },
              { q: `What does ${strain.name} taste like?`, a: `${strain.name} features a ${strain.flavors?.join(", ")} flavor profile. The dominant terpene ${strain.terpenes?.[0]} contributes its signature aroma, alongside ${strain.terpenes?.slice(1).join(" and ")}.` },
              { q: `Is ${strain.name} good for beginners?`, a: `${strain.name} is ${strain.grow_difficulty === "Easy" ? "an excellent choice for beginners — it's forgiving and resilient." : strain.grow_difficulty === "Moderate" ? "suitable for growers with some basic experience." : "better suited for experienced growers who can handle its demanding requirements."}` },
              { q: `What is ${strain.name} good for?`, a: `Users report ${strain.name} helps with ${strain.helps_with?.join(", ")}. It's commonly used ${strain.type === "Indica" ? "in the evening for relaxation and sleep" : strain.type === "Sativa" ? "during the day for energy and focus" : "throughout the day depending on the desired effect"}.` },
            ].map((faq, i) => (
              <div key={i} className="py-5">
                <h3 className="font-black text-sm mb-2">🔍 {faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Strains */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-6">🌿 Similar {strain.type} Strains</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similar.map((s) => (
                <StrainCard key={s.slug} strain={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
