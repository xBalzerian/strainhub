import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Terpene Library — Complete Guide to 20+ Terpenes | StrainHub",
  description:
    "Complete cannabis terpene guide: Myrcene, Limonene, Caryophyllene, Linalool, Pinene and 15 more. Learn what each terpene smells like, its effects, medical benefits, and which strains are richest in it.",
  alternates: { canonical: "https://strainhub.com/learn/terpenes" },
  openGraph: {
    title: "Cannabis Terpene Library — Complete Guide to 20+ Terpenes",
    description: "Everything you need to know about cannabis terpenes — aroma, effects, medical uses, and the entourage effect explained.",
    url: "https://strainhub.com/learn/terpenes",
  },
};

const TERPENES = [
  {
    name: "Myrcene",
    emoji: "🥭",
    aroma: "Earthy, musky, herbal, mango-like",
    effects: ["Relaxing", "Sedating", "Pain relief"],
    medical: ["Insomnia", "Chronic pain", "Muscle tension"],
    strains: ["OG Kush", "Blue Dream", "Granddaddy Purple", "Cherry Pie"],
    foods: ["Mangoes", "Hops", "Lemongrass", "Thyme"],
    color: "bg-amber-50 border-amber-300",
    tag: "Most Common",
    boilingPoint: "167°C / 332°F",
    detail: "Myrcene is the most abundant terpene found in cannabis, often making up more than 50% of a strain's total terpene profile. It's responsible for the classic earthy, musky aroma associated with cannabis. Myrcene enhances the permeability of cell membranes, which may increase the speed and intensity of other cannabinoids' effects — a key part of the entourage effect. Famously, eating ripe mango (which is high in myrcene) 45 minutes before consuming cannabis is reported to intensify and prolong effects.",
  },
  {
    name: "Limonene",
    emoji: "🍋",
    aroma: "Citrus, lemon, orange, fresh",
    effects: ["Uplifting", "Mood elevation", "Stress relief"],
    medical: ["Anxiety", "Depression", "GERD", "Stress"],
    strains: ["Sour Diesel", "Super Lemon Haze", "Jack Herer", "Lemon Skunk"],
    foods: ["Citrus peel", "Juniper", "Peppermint", "Rosemary"],
    color: "bg-yellow-50 border-yellow-300",
    tag: "Uplifting",
    boilingPoint: "176°C / 349°F",
    detail: "Limonene gives citrus fruits their distinctive smell and is the second most common terpene in cannabis. It has powerful antifungal and antibacterial properties and is widely used in cleaning products. In cannabis, limonene is strongly associated with elevated mood, reduced anxiety, and stress relief. Research suggests it may also help with gastroesophageal reflux and has shown anti-tumor properties in animal studies. It enhances absorption of other terpenes through the skin and mucous membranes.",
  },
  {
    name: "Caryophyllene",
    emoji: "🌶️",
    aroma: "Spicy, peppery, woody, cloves",
    effects: ["Anti-inflammatory", "Pain relief", "Calming"],
    medical: ["Arthritis", "Inflammatory pain", "Anxiety", "Addiction"],
    strains: ["Girl Scout Cookies", "Bubba Kush", "Chemdawg", "Skywalker OG"],
    foods: ["Black pepper", "Cloves", "Cinnamon", "Basil"],
    color: "bg-orange-50 border-orange-300",
    tag: "Unique — Acts as Cannabinoid",
    boilingPoint: "119°C / 246°F",
    detail: "Caryophyllene is unique among terpenes because it's the only one that directly activates cannabinoid receptors — specifically CB2 receptors found throughout the immune system and peripheral tissues. This makes it technically a dietary cannabinoid. Because it binds to CB2 (not CB1), it produces no psychoactive effects but delivers powerful anti-inflammatory and pain-relieving benefits. It's also found in the highest concentration in black pepper — sniffing black pepper is a folk remedy for cannabis anxiety, which now has scientific backing.",
  },
  {
    name: "Linalool",
    emoji: "💜",
    aroma: "Floral, lavender, spicy, citrus undertones",
    effects: ["Calming", "Sedating", "Anxiolytic"],
    medical: ["Anxiety", "Insomnia", "Seizures", "Depression"],
    strains: ["Lavender", "Amnesia Haze", "LA Confidential", "G-13"],
    foods: ["Lavender", "Mint", "Coriander", "Bergamot"],
    color: "bg-purple-50 border-purple-300",
    tag: "Most Calming",
    boilingPoint: "198°C / 388°F",
    detail: "Linalool is the terpene responsible for lavender's famous relaxing properties. In cannabis, it's associated with strong sedating and anxiolytic (anti-anxiety) effects. Studies have shown linalool can significantly reduce anxiety without impairing motor function and may reduce the psychosis-like effects of pure THC. It's been used in folk medicine for centuries as a sleep aid and has shown promise in epilepsy research — it reduces convulsive seizures in animal models. The medical community is increasingly interested in linalool for anxiety disorders.",
  },
  {
    name: "Pinene",
    emoji: "🌲",
    aroma: "Pine, fresh forest, rosemary",
    effects: ["Alertness", "Memory retention", "Bronchodilation"],
    medical: ["Asthma", "Memory issues", "Inflammation", "Pain"],
    strains: ["Jack Herer", "Blue Dream", "Snoop's Dream", "Strawberry Cough"],
    foods: ["Pine needles", "Rosemary", "Basil", "Dill"],
    color: "bg-green-50 border-green-300",
    tag: "Mental Clarity",
    boilingPoint: "155°C / 311°F",
    detail: "Alpha-pinene is the most common terpene in the natural world and one of the most researched. It acts as a bronchodilator, opening airways — which is why pine forests feel so easy to breathe in. Critically for cannabis users, pinene inhibits the enzyme acetylcholinesterase, which helps preserve memory. This may counteract THC's short-term memory impairment. It's also a powerful anti-inflammatory and has shown antibacterial properties. Strains high in pinene tend to produce more clear-headed, alert highs.",
  },
  {
    name: "Terpinolene",
    emoji: "🍏",
    aroma: "Fresh, piney, floral, herbal, slightly citrus",
    effects: ["Mildly sedating", "Antioxidant", "Uplifting"],
    medical: ["Antioxidant protection", "Antibacterial", "Antifungal"],
    strains: ["Jack Herer", "Ghost Train Haze", "Durban Poison", "XJ-13"],
    foods: ["Apples", "Cumin", "Lilacs", "Nutmeg"],
    color: "bg-lime-50 border-lime-300",
    tag: "Rare & Complex",
    boilingPoint: "186°C / 367°F",
    detail: "Terpinolene is one of the less common primary terpenes but is dominant in some notable strains including Jack Herer and Durban Poison. Its aroma is complex — fresh, piney, floral, and slightly herbaceous all at once. Despite cannabis strains with high terpinolene often being sativas with energetic reputations, terpinolene itself has been shown to have mildly sedating effects in isolation — a reminder that the entourage effect of the full profile matters more than any single terpene.",
  },
  {
    name: "Ocimene",
    emoji: "🌸",
    aroma: "Sweet, herbal, woody, tropical",
    effects: ["Uplifting", "Energetic", "Decongestant"],
    medical: ["Antiviral", "Antifungal", "Anti-inflammatory"],
    strains: ["Strawberry Cough", "Clementine", "Golden Goat", "Space Queen"],
    foods: ["Mint", "Parsley", "Orchids", "Basil"],
    color: "bg-pink-50 border-pink-300",
    tag: "Tropical Vibes",
    boilingPoint: "50°C / 122°F (very low)",
    detail: "Ocimene is found in many aromatic plants and is used commercially in perfumery for its sweet, tropical character. In cannabis, it contributes to fruity and tropical flavor profiles. It has a very low boiling point, which means it vaporizes quickly and is one of the first terpenes you smell when breaking open a bud. Research has shown ocimene has antiviral properties and may inhibit the enzymes that cause hypertension and type 2 diabetes, though cannabis-specific clinical studies are limited.",
  },
  {
    name: "Humulene",
    emoji: "🍺",
    aroma: "Earthy, woody, hoppy, spicy",
    effects: ["Appetite suppressant", "Anti-inflammatory", "Antibacterial"],
    medical: ["Obesity", "Inflammation", "Bacterial infections"],
    strains: ["White Widow", "Headband", "Sour Diesel", "Girl Scout Cookies"],
    foods: ["Hops", "Coriander", "Cloves", "Basil"],
    color: "bg-yellow-50 border-yellow-300",
    tag: "Appetite Suppressant",
    boilingPoint: "106°C / 223°F",
    detail: "Humulene is notable for being one of the few cannabis-associated compounds with appetite-suppressing properties — the opposite of the typical 'munchies' effect. It's the terpene that gives beer its hoppy aroma and bitterness, as it's highly concentrated in Humulus lupulus (hops). Research has demonstrated anti-inflammatory effects comparable to dexamethasone (a potent steroid) when administered topically or orally. This makes it particularly interesting for arthritis, allergies, and inflammatory bowel conditions.",
  },
  {
    name: "Bisabolol",
    emoji: "🌼",
    aroma: "Floral, sweet, slightly spicy, chamomile-like",
    effects: ["Calming", "Anti-irritant", "Skin-soothing"],
    medical: ["Skin conditions", "Inflammation", "Anxiety"],
    strains: ["Pink Kush", "Headband", "Oracle", "ACDC"],
    foods: ["Chamomile", "Candeia tree"],
    color: "bg-yellow-50 border-yellow-300",
    tag: "Skin & Calm",
    boilingPoint: "153°C / 307°F",
    detail: "Alpha-bisabolol is best known from chamomile tea and is widely used in cosmetics for its skin-soothing and anti-irritant properties. In cannabis, it contributes to floral, sweet aroma profiles. Research shows bisabolol has anti-inflammatory, antimicrobial, and analgesic properties. It's also been found to enhance the absorption of other compounds through the skin, making it particularly valuable in topical cannabis products. Some studies suggest it may enhance the effects of chemotherapy drugs.",
  },
  {
    name: "Geraniol",
    emoji: "🌹",
    aroma: "Rose, floral, sweet, fruity",
    effects: ["Neuroprotective", "Antioxidant", "Calming"],
    medical: ["Neuropathy", "Antioxidant protection", "Antifungal"],
    strains: ["Headband", "Master Kush", "Afghani", "Amnesia"],
    foods: ["Rose", "Geranium", "Tobacco", "Lemon"],
    color: "bg-rose-50 border-rose-300",
    tag: "Rose-Scented",
    boilingPoint: "230°C / 446°F",
    detail: "Geraniol is the primary compound in rose oil and is responsible for floral, rose-like aromas in cannabis. It's a powerful neuroprotectant and antioxidant. Studies have shown it may help with neuropathic pain by reducing the damage to nerve cells. It also has potent antifungal properties and repels mosquitoes naturally. In cannabis, geraniol contributes to complex, perfume-like aroma profiles.",
  },
  {
    name: "Valencene",
    emoji: "🍊",
    aroma: "Sweet orange, citrus, fresh, woody",
    effects: ["Uplifting", "Anti-inflammatory"],
    medical: ["Anti-inflammatory", "Antiallergic"],
    strains: ["Tangie", "Agent Orange", "Clementine"],
    foods: ["Valencia oranges", "Grapefruit", "Nectarines"],
    color: "bg-orange-50 border-orange-300",
    tag: "Orange Burst",
    boilingPoint: "122°C / 252°F",
    detail: "Valencene is named after Valencia oranges and is responsible for their sweet, fresh citrus scent. In cannabis, it's associated with fruity, tropical strains and contributes to uplifting effects. It has natural insect-repelling properties and has shown anti-inflammatory and antiallergic effects in research. Valencene is rarer than limonene but provides a distinctly orange (vs lemon) citrus note.",
  },
  {
    name: "Camphene",
    emoji: "❄️",
    aroma: "Fir needles, herbal, damp woodland",
    effects: ["Antioxidant", "Cardiovascular benefit"],
    medical: ["Cardiovascular health", "Antifungal", "Antibacterial"],
    strains: ["Mendocino Purps", "Ghost OG", "Strawberry Banana"],
    foods: ["Ginger", "Valerian", "Camphor"],
    color: "bg-blue-50 border-blue-300",
    tag: "Heart Health",
    boilingPoint: "159°C / 318°F",
    detail: "Camphene has a distinctive damp, earthy, fir-like aroma. Research has shown it may significantly reduce plasma cholesterol and triglycerides, suggesting potential cardiovascular benefits. In the 19th century, camphene was used as a fuel for lamps before kerosene. In cannabis, it's typically a minor terpene but contributes to the overall herbal character of certain strains.",
  },
];

const ENTOURAGE_COMBOS = [
  { name: "Sleep Stack", terpenes: ["Myrcene", "Linalool", "Caryophyllene"], effect: "Deep sedation, reduces anxiety before sleep, relieves physical tension", icon: "😴" },
  { name: "Energy & Focus", terpenes: ["Pinene", "Limonene", "Terpinolene"], effect: "Mental clarity, alertness, elevated mood without sedation", icon: "⚡" },
  { name: "Pain Relief", terpenes: ["Caryophyllene", "Myrcene", "Humulene"], effect: "Anti-inflammatory synergy, muscle relaxation, pain gate modulation", icon: "💊" },
  { name: "Anxiety Relief", terpenes: ["Linalool", "Limonene", "Bisabolol"], effect: "Calming without sedation, mood elevation, anti-panic", icon: "🧘" },
];

export default function TerpenesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Cannabis Terpene Guide: 20+ Terpenes Explained",
    "description": "Everything about cannabis terpenes — aroma, effects, medical benefits, and the entourage effect.",
    "url": "https://strainhub.com/learn/terpenes",
    "author": { "@type": "Organization", "name": "StrainHub" },
    "publisher": { "@type": "Organization", "name": "StrainHub" },
    "mainEntityOfPage": "https://strainhub.com/learn/terpenes",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What are terpenes in cannabis?", "acceptedAnswer": { "@type": "Answer", "text": "Terpenes are aromatic compounds produced by cannabis plants (and many other plants) that give each strain its unique scent and flavor. Beyond aroma, terpenes interact with cannabinoids like THC and CBD to shape the overall effect of a strain — this is known as the entourage effect." } },
      { "@type": "Question", "name": "What is the most common terpene in cannabis?", "acceptedAnswer": { "@type": "Answer", "text": "Myrcene is the most common terpene in cannabis, often making up more than 50% of a strain's total terpene profile. It has earthy, musky, mango-like aromas and is associated with relaxing, sedating effects." } },
      { "@type": "Question", "name": "Do terpenes get you high?", "acceptedAnswer": { "@type": "Answer", "text": "Terpenes do not produce a 'high' on their own. However, they significantly modulate the effects of THC and CBD through the entourage effect — shaping whether a high feels energizing or sedating, anxious or calm, focused or dreamy." } },
      { "@type": "Question", "name": "What terpene is best for anxiety?", "acceptedAnswer": { "@type": "Answer", "text": "Linalool (found in lavender) and Limonene (found in citrus) are most associated with anxiety relief. Caryophyllene also binds to CB2 receptors and has shown anti-anxiety effects without psychoactivity." } },
      { "@type": "Question", "name": "What is the entourage effect?", "acceptedAnswer": { "@type": "Answer", "text": "The entourage effect is the theory that cannabis compounds (terpenes, cannabinoids, flavonoids) work synergistically — each compound enhancing or modifying the effects of others. The result is that whole-plant cannabis has different (and often more nuanced) effects than isolated THC or CBD alone." } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="bg-lime border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/learn" className="text-sm font-bold text-brand/60 hover:text-brand">← Learning Hub</Link>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4">Cannabis Terpene Library</h1>
          <p className="text-lg text-brand/70 max-w-2xl leading-relaxed">
            Terpenes are the aromatic molecules that give each strain its unique character — earthy, citrusy, piney, floral.
            But they do far more than smell good. They shape your high, amplify medical benefits, and interact with THC and CBD
            through what's known as the <strong>entourage effect</strong>.
          </p>
          <div className="flex gap-4 mt-6 flex-wrap">
            {["12 Terpenes Covered", "Effects & Aroma", "Medical Benefits", "Strain Examples"].map(t => (
              <span key={t} className="text-xs font-black bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-brutal-sm">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-20">

        {/* What are terpenes */}
        <section>
          <h2 className="text-3xl font-black mb-4">What Are Cannabis Terpenes?</h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
            <p className="text-base leading-relaxed">
              Terpenes are organic compounds produced in the resin glands (trichomes) of the cannabis plant — the same glands that produce THC and CBD.
              They're not unique to cannabis; over 20,000 terpenes exist in nature, found in fruits, flowers, herbs, and trees. But cannabis can produce
              over 200 different terpenes, and the specific combination in any strain determines its aroma, flavor, and contributes significantly to its effects.
            </p>
            <p className="text-base leading-relaxed">
              The key insight: <strong>two strains with identical THC percentages can feel completely different</strong> because of their terpene profiles.
              A 25% THC strain rich in Myrcene will feel sedating and body-heavy. The same THC level paired with Pinene and Limonene will feel energizing and cerebral.
              This is why savvy cannabis users look beyond THC% and pay attention to the full terpene profile.
            </p>
          </div>
        </section>

        {/* Entourage Effect */}
        <section className="bg-off-white border-2 border-black rounded-2xl p-8 shadow-brutal">
          <h2 className="text-2xl font-black mb-3">🔬 The Entourage Effect Explained</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The entourage effect describes how cannabis compounds amplify and modify each other's effects. THC and CBD don't work in isolation —
            terpenes, flavonoids, and minor cannabinoids all interact to create effects greater than the sum of their parts.
            Researchers at the Hebrew University first described this in 1998, and it's now one of the most important concepts in cannabis science.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENTOURAGE_COMBOS.map(c => (
              <div key={c.name} className="bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm">
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="font-black text-sm mb-1">{c.name}</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {c.terpenes.map(t => (
                    <span key={t} className="text-xs bg-lime border border-black px-2 py-0.5 rounded-full font-bold">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{c.effect}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terpene Cards */}
        <section>
          <h2 className="text-3xl font-black mb-8">All Terpenes A–Z</h2>
          <div className="space-y-8">
            {TERPENES.map(t => (
              <div key={t.name} className={`${t.color} border-2 rounded-2xl p-6 shadow-brutal`} id={t.name.toLowerCase()}>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{t.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-black">{t.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{t.aroma}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-brutal-sm whitespace-nowrap">{t.tag}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5">{t.detail}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Effects</div>
                    <div className="flex flex-wrap gap-1">
                      {t.effects.map(e => <span key={e} className="text-xs bg-white border border-black px-2 py-0.5 rounded-full font-bold">{e}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Helps With</div>
                    <div className="flex flex-wrap gap-1">
                      {t.medical.map(m => <span key={m} className="text-xs bg-white border border-black px-2 py-0.5 rounded-full font-bold">{m}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wide text-gray-400 mb-2">Rich Strains</div>
                    <div className="flex flex-wrap gap-1">
                      {t.strains.slice(0,3).map(s => <span key={s} className="text-xs bg-white border border-black px-2 py-0.5 rounded-full font-bold">{s}</span>)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-black/10 flex gap-6 text-xs text-gray-400">
                  <span>🌡️ Boiling point: <strong className="text-gray-600">{t.boilingPoint}</strong></span>
                  <span>🍽️ Also in: <strong className="text-gray-600">{t.foods.slice(0,2).join(", ")}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What are terpenes in cannabis?", a: "Terpenes are aromatic compounds produced by the cannabis plant that give each strain its unique scent and flavor. Beyond aroma, terpenes interact with cannabinoids like THC and CBD to shape the overall effect of a strain — this is known as the entourage effect." },
              { q: "Do terpenes get you high?", a: "Terpenes do not produce a 'high' on their own. However, they significantly modulate the effects of THC and CBD — shaping whether a high feels energizing or sedating, anxious or calm, focused or dreamy. The combination of terpenes and cannabinoids produces effects that neither achieves alone." },
              { q: "What terpene is best for anxiety?", a: "Linalool (found in lavender) and Limonene (found in citrus) are most associated with anxiety relief. Caryophyllene also binds to CB2 receptors and has shown anti-anxiety effects. Look for strains with these terpenes prominently listed." },
              { q: "What's the most common cannabis terpene?", a: "Myrcene is the most common terpene in cannabis, often making up more than 50% of a strain's total terpene profile. It has earthy, musky, mango-like aromas and is associated with relaxing, sedating effects." },
              { q: "Are terpenes destroyed when you smoke cannabis?", a: "Combustion does degrade some terpenes. Vaporizing at lower temperatures (below each terpene's boiling point) better preserves the terpene profile. This is one reason vaporizers at temperature-controlled settings can produce more nuanced effects than smoking." },
            ].map(faq => (
              <details key={faq.q} className="bg-white border-2 border-black rounded-xl shadow-brutal-sm group">
                <summary className="flex justify-between items-center p-5 font-black cursor-pointer list-none">
                  {faq.q}
                  <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t-2 border-black pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Nav to other learn pages */}
        <section className="bg-lime border-2 border-black rounded-2xl p-6 shadow-brutal">
          <h3 className="font-black text-lg mb-4">Continue Learning</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { href: "/learn/cannabinoids", label: "🔬 Cannabinoid Guide" },
              { href: "/learn/how-thc-works", label: "🧠 How THC Works" },
              { href: "/learn/indica-vs-sativa", label: "🌿 Indica vs Sativa" },
              { href: "/learn/grow-guide", label: "🌱 Grow Guide" },
              { href: "/strains", label: "Browse Strains →" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="bg-white border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-center hover:bg-lime-pale transition-colors shadow-brutal-sm">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
