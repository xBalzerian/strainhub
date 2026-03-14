import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cannabis Education Hub — Learn Everything About Marijuana | StrainHub",
  description:
    "The most comprehensive cannabis learning resource online. Strains, effects, pharmacology, growing, seeds, legal guides, history, and culture. Free forever.",
  alternates: { canonical: "https://strainhub.vercel.app/learn" },
  openGraph: {
    title: "Cannabis Education Hub — Learn Everything About Marijuana | StrainHub",
    description: "Free cannabis education covering strains, terpenes, cannabinoids, growing, effects, legal status, history and culture. Built for beginners to experts.",
    url: "https://strainhub.vercel.app/learn",
    type: "website",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "StrainHub Learn",
      url: "https://strainhub.vercel.app/learn",
      description: "Comprehensive cannabis education platform covering strains, effects, growing, legal status, history, and pharmacology.",
      knowsAbout: [
        "Cannabis Strains","Terpenes","Cannabinoids","Cannabis Cultivation",
        "Cannabis Pharmacology","Cannabis Law","Cannabis History",
      ],
    }),
  },
};

const CATEGORIES = [
  {
    id: "strains",
    icon: "🌿",
    label: "Strains",
    title: "Marijuana Strains",
    desc: "Taxonomy, genetics, effects, cultivation traits, and regional origins of thousands of varieties.",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#86efac",
    count: "7 sections",
    href: "/learn/strains",
    featured: [
      { title: "Indica vs. Sativa: The Science", href: "/learn/strains/indica-vs-sativa" },
      { title: "Terpene-Driven Strain Categories", href: "/learn/strains/terpene-categories" },
      { title: "Effect-Based Classification Guide", href: "/learn/strains/effects" },
    ],
  },
  {
    id: "seeds",
    icon: "🫘",
    label: "Seeds",
    title: "Marijuana Seeds",
    desc: "Seed biology, germination science, storage, breeding programs, and legal procurement.",
    color: "#92400e",
    bg: "#fffbeb",
    border: "#fcd34d",
    count: "6 sections",
    href: "/learn/seeds",
    featured: [
      { title: "Feminized vs. Regular vs. Auto", href: "/learn/seeds/types" },
      { title: "Germination Methods Compared", href: "/learn/seeds/germination" },
      { title: "Long-Term Seed Storage Guide", href: "/learn/seeds/storage" },
    ],
  },
  {
    id: "effects",
    icon: "🔬",
    label: "Effects",
    title: "Effects & Pharmacology",
    desc: "Cannabinoid pharmacology, terpene science, acute effects, therapeutic uses, drug interactions.",
    color: "#6d28d9",
    bg: "#faf5ff",
    border: "#c4b5fd",
    count: "6 sections",
    href: "/learn/effects",
    featured: [
      { title: "Complete Cannabinoid Guide (THC, CBD, CBG+)", href: "/learn/effects/cannabinoids" },
      { title: "Terpene Pharmacology Library", href: "/learn/effects/terpenes" },
      { title: "Drug Interactions & Contraindications", href: "/learn/effects/interactions" },
    ],
  },
  {
    id: "consumption",
    icon: "💨",
    label: "Consumption",
    title: "Consumption Methods",
    desc: "Every method compared — bioavailability, onset time, health impact, discretion, and cost.",
    color: "#0369a1",
    bg: "#f0f9ff",
    border: "#7dd3fc",
    count: "5 sections",
    href: "/learn/consumption",
    featured: [
      { title: "Bioavailability Across All Methods", href: "/learn/consumption/bioavailability" },
      { title: "Edibles: Onset, Dosing & Science", href: "/learn/consumption/edibles" },
      { title: "Vaporization vs. Smoking", href: "/learn/consumption/vaporization" },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    label: "Legal",
    title: "Legal & Regulatory",
    desc: "US federal law, state-by-state status, international systems, consumer rights and responsibilities.",
    color: "#b45309",
    bg: "#fff7ed",
    border: "#fcd34d",
    count: "5 sections",
    href: "/learn/legal",
    featured: [
      { title: "State-by-State Legal Map", href: "/learn/legal/states" },
      { title: "Federal Law & CSA Scheduling", href: "/learn/legal/federal" },
      { title: "International Cannabis Laws", href: "/learn/legal/international" },
    ],
  },
  {
    id: "history",
    icon: "📜",
    label: "History",
    title: "History & Culture",
    desc: "10,000 years of cannabis — ancient origins, colonial spread, prohibition history, and cultural movements.",
    color: "#be123c",
    bg: "#fff1f2",
    border: "#fca5a5",
    count: "8 sections",
    href: "/learn/history",
    featured: [
      { title: "Ancient Origins: 10,000 BCE to Now", href: "/learn/history/origins" },
      { title: "Prohibition: The Real History", href: "/learn/history/prohibition" },
      { title: "Social Justice & the Drug War", href: "/learn/history/social-justice" },
    ],
  },
];

const POPULAR_TOPICS = [
  { title: "What is the Entourage Effect?", href: "/learn/effects/entourage-effect", tag: "Pharmacology" },
  { title: "Indica vs. Sativa: Does it Matter?", href: "/learn/strains/indica-vs-sativa", tag: "Strains" },
  { title: "How Long Do Edibles Last?", href: "/learn/consumption/edibles", tag: "Consumption" },
  { title: "What Does THC Actually Do to Your Brain?", href: "/learn/effects/cannabinoids", tag: "Science" },
  { title: "Best Strains for Anxiety Without Paranoia", href: "/learn/strains/effects", tag: "Effects" },
  { title: "Is CBD Legal Everywhere?", href: "/learn/legal/federal", tag: "Legal" },
  { title: "How to Germinate Seeds Successfully", href: "/learn/seeds/germination", tag: "Seeds" },
  { title: "Terpenes: Complete Reference Guide", href: "/learn/effects/terpenes", tag: "Science" },
];

const TOPIC_TAGS: Record<string, string> = {
  Pharmacology: "#6d28d9",
  Strains: "#16a34a",
  Consumption: "#0369a1",
  Science: "#0e7490",
  Effects: "#be123c",
  Legal: "#b45309",
  Seeds: "#92400e",
};

const FAQ = [
  {
    q: "What is the difference between indica and sativa?",
    a: "Indica and sativa describe the plant's morphology and regional origin, not its effects. Modern research shows effects are better predicted by cannabinoid and terpene profiles than by indica/sativa classification. Most commercial cannabis today is a hybrid.",
  },
  {
    q: "What are terpenes and do they affect your high?",
    a: "Terpenes are aromatic compounds that give cannabis its distinctive smell. They interact with cannabinoids through the entourage effect, modulating the overall experience. For example, myrcene promotes sedation while limonene elevates mood.",
  },
  {
    q: "How long do edibles take to kick in?",
    a: "Edibles typically take 30–90 minutes to take effect, with peak effects at 2–3 hours and duration of 4–8 hours. Onset varies based on body weight, metabolism, stomach contents, and the specific product's formulation.",
  },
  {
    q: "Is cannabis legal in the United States?",
    a: "Cannabis remains federally illegal in the United States under Schedule I of the Controlled Substances Act. However, 24+ states have legalized adult use, and most states have some form of medical program. State and federal law can conflict.",
  },
  {
    q: "What is the endocannabinoid system?",
    a: "The endocannabinoid system (ECS) is a biological system found in humans and all vertebrates. It consists of endocannabinoid receptors (CB1, CB2), endogenous ligands (anandamide, 2-AG), and metabolic enzymes. THC mimics the body's natural endocannabinoids.",
  },
  {
    q: "What is the difference between THC and CBD?",
    a: "THC (tetrahydrocannabinol) is the primary psychoactive compound in cannabis, producing the 'high' via CB1 receptor activation. CBD (cannabidiol) is non-intoxicating and modulates the ECS through multiple mechanisms including CB1 negative allosteric modulation.",
  },
];

export default function LearnPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Cannabis Education Hub",
              description: "Comprehensive cannabis learning resource covering strains, effects, pharmacology, growing, legal status, history and culture.",
              url: "https://strainhub.vercel.app/learn",
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://strainhub.vercel.app" },
                  { "@type": "ListItem", position: 2, name: "Learn", item: "https://strainhub.vercel.app/learn" },
                ],
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ]),
        }}
      />

      <div className="min-h-screen bg-[#F8F8F0]">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="border-b-2 border-black bg-white">
          <div className="max-w-5xl mx-auto px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
              Free Forever · No Account Required
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black mb-5 leading-[1.05]">
              The Cannabis<br />
              <span style={{ background: "#AAFF00", paddingLeft: 8, paddingRight: 8, borderRadius: 8 }}>
                Learning Hub
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
              Science-backed cannabis education for everyone — from first-time curious to expert cultivator.
              Six comprehensive topic areas, hundreds of detailed guides.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-gray-400">
              {["600+ Topics Covered", "Peer-Reviewed Sources", "Updated Monthly", "Expert-Written"].map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <span style={{ color: "#AAFF00", fontSize: 16 }}>✓</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

          {/* ── MAIN CATEGORIES ──────────────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Explore by Topic</p>
                <h2 className="text-2xl font-black text-black">Six Core Disciplines</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={cat.href}
                  className="group bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black transition-all duration-200 hover:shadow-[4px_4px_0px_#000]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: cat.bg, border: `1.5px solid ${cat.border}` }}>
                        {cat.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.color }}>{cat.label}</span>
                        <h3 className="font-black text-base text-black leading-tight">{cat.title}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-400 mt-1">{cat.count}</span>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{cat.desc}</p>

                  <div className="space-y-1.5 border-t border-gray-100 pt-4">
                    {cat.featured.map(f => (
                      <div key={f.href} className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-black transition-colors">
                        <span className="text-gray-300">→</span>
                        <span>{f.title}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── POPULAR TOPICS ───────────────────────────────────────────── */}
          <section>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Most Searched</p>
            <h2 className="text-2xl font-black text-black mb-6">Popular Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {POPULAR_TOPICS.map((t) => (
                <Link key={t.href} href={t.href}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center justify-between hover:border-black hover:shadow-[2px_2px_0px_#000] transition-all group">
                  <span className="text-sm font-semibold text-black group-hover:underline">{t.title}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full ml-3 flex-shrink-0"
                    style={{ color: TOPIC_TAGS[t.tag] || "#666", background: (TOPIC_TAGS[t.tag] || "#666") + "15" }}>
                    {t.tag}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── TOPIC DEEP DIVES ─────────────────────────────────────────── */}
          <section>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Quick Reference</p>
            <h2 className="text-2xl font-black text-black mb-6">Topic Deep Dives</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🧬",
                  title: "Terpene Library",
                  sub: "20+ terpenes",
                  desc: "Myrcene, Limonene, Caryophyllene, Linalool, Pinene — effects, aromas, strains, boiling points.",
                  href: "/learn/effects/terpenes",
                  color: "#16a34a",
                },
                {
                  icon: "💊",
                  title: "Cannabinoid Guide",
                  sub: "THC · CBD · CBG · CBN · THCV",
                  desc: "How each cannabinoid works, receptor binding, medical applications, and synergies.",
                  href: "/learn/effects/cannabinoids",
                  color: "#6d28d9",
                },
                {
                  icon: "🌱",
                  title: "Grow Guide",
                  sub: "Week-by-week",
                  desc: "Germination to harvest — lighting, nutrients, training, VPD, drying, curing.",
                  href: "/learn/strains/grow-guide",
                  color: "#0369a1",
                },
                {
                  icon: "⚖️",
                  title: "Legal Status Map",
                  sub: "All 50 states + international",
                  desc: "Current legal status, possession limits, medical programs, and pending legislation.",
                  href: "/learn/legal/states",
                  color: "#b45309",
                },
                {
                  icon: "🩺",
                  title: "Medical Use Index",
                  sub: "15+ conditions",
                  desc: "Evidence quality for anxiety, pain, epilepsy, PTSD, MS, cancer and more.",
                  href: "/learn/effects/medical",
                  color: "#be123c",
                },
                {
                  icon: "🏺",
                  title: "History Timeline",
                  sub: "10,000 BCE → Today",
                  desc: "Ancient origins, colonial spread, prohibition, and modern legalization movement.",
                  href: "/learn/history/origins",
                  color: "#7c3aed",
                },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-black hover:shadow-[3px_3px_0px_#000] transition-all group">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.sub}</div>
                  <h3 className="font-black text-sm text-black mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── FAQ / SCHEMA ─────────────────────────────────────────────── */}
          <section>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Common Questions</p>
            <h2 className="text-2xl font-black text-black mb-6">Cannabis FAQ</h2>
            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                      <h3 className="font-bold text-sm text-black pr-4">{item.q}</h3>
                      <span className="text-gray-400 text-sm flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </section>

          {/* ── ABOUT THIS HUB ───────────────────────────────────────────── */}
          <section className="bg-black rounded-2xl p-8 md:p-10 text-white">
            <div className="max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#AAFF00" }}>
                Our Promise
              </div>
              <h2 className="text-2xl font-black mb-4 leading-tight">
                Built to be the world's most accurate cannabis education resource.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Every article cites peer-reviewed research or primary sources. Medical claims are graded by evidence quality.
                Legal information is updated monthly. We separate marketing claims from scientific fact.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { num: "600+", label: "Topics covered" },
                  { num: "100%", label: "Free forever" },
                  { num: "6", label: "Core disciplines" },
                  { num: "Monthly", label: "Updates" },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-black" style={{ color: "#AAFF00" }}>{s.num}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
