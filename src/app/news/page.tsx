import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import NewsListing from "@/components/NewsListing";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Cannabis News, Laws & Events | StrainHub" },
  description: "The latest cannabis news, legalization updates, business trends, events, and entertainment. Published daily by Angelica M. at StrainHub.",
  keywords: ["cannabis news","marijuana news","weed legalization","cannabis business","marijuana laws","cannabis events","hemp news"],
  alternates: { canonical: "https://www.strainhub.org/news" },
  openGraph: {
    title: "Cannabis News & Articles | StrainHub",
    description: "Daily cannabis news — legalization, business, events, and entertainment.",
    url: "https://www.strainhub.org/news",
    type: "website",
  },
};

const CATEGORIES = ["All", "News", "Laws", "Business", "Events", "Entertainment"];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const cat = searchParams.category || "All";
  const articles = await getArticles(30, cat);

  return (
    <main className="min-h-screen bg-off-white">
      {/* HERO HEADER */}
      <section className="bg-brand border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-lime/20 border border-lime/40 px-3 py-1 rounded-full text-lime text-[11px] font-black uppercase tracking-widest mb-4">
            📰 Updated Daily
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Cannabis <span className="text-lime">News</span> &amp; Articles
          </h1>
          <p className="text-white/60 text-base max-w-xl">
            Laws, business, events, entertainment — everything happening in the cannabis world, curated and written daily by Angelica M.
          </p>
          <div className="flex gap-2 mt-8 flex-wrap">
            {CATEGORIES.map((c) => (
              <a
                key={c}
                href={c === "All" ? "/news" : `/news?category=${c}`}
                className={`px-4 py-1.5 rounded-full text-sm font-black border-2 transition-all ${
                  cat === c
                    ? "bg-lime border-lime text-brand"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <NewsListing articles={articles} />
      </section>
    </main>
  );
}
