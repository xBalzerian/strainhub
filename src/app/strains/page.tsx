import type { Metadata } from "next";
import Link from "next/link";
import { getAllStrains } from "@/lib/strains";
import StrainCard from "@/components/StrainCard";

export const metadata: Metadata = {
  title: "Cannabis Strain Database — Browse 100+ Strains",
  description: "Browse and filter 100+ cannabis strains by type, effects, terpenes, and grow difficulty. Find your perfect Indica, Sativa, or Hybrid strain.",
};

export default async function StrainsPage({
  searchParams,
}: {
  searchParams: { type?: string; effect?: string; sort?: string };
}) {
  const allStrains = await getAllStrains();

  // Filter
  let filtered = [...allStrains];
  if (searchParams.type) filtered = filtered.filter((s) => s.type === searchParams.type);
  if (searchParams.effect) filtered = filtered.filter((s) => s.effects?.includes(searchParams.effect!));

  // Sort
  if (searchParams.sort === "thc_high") filtered.sort((a, b) => b.thc_max - a.thc_max);
  else if (searchParams.sort === "thc_low") filtered.sort((a, b) => a.thc_max - b.thc_max);
  else if (searchParams.sort === "az") filtered.sort((a, b) => a.name.localeCompare(b.name));
  else filtered.sort((a, b) => a.rank_popularity - b.rank_popularity);

  const allEffects = [...new Set(allStrains.flatMap((s) => s.effects || []))].sort();

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-0">
          <h1 className="text-4xl font-black tracking-tight mb-1">Cannabis Strain Database</h1>
          <p className="text-gray-500 text-sm mb-6">Browse, filter, and find your perfect strain</p>

          {/* Type tabs */}
          <div className="flex gap-0 border-t-2 border-black overflow-x-auto">
            {[
              { label: "🌿 All Strains", value: "" },
              { label: "🍇 Indica", value: "Indica" },
              { label: "☀️ Sativa", value: "Sativa" },
              { label: "⚡ Hybrid", value: "Hybrid" },
            ].map((tab) => (
              <Link
                key={tab.value}
                href={tab.value ? `/strains?type=${tab.value}` : "/strains"}
                className={`px-5 py-3 text-sm font-bold border-r-2 border-black whitespace-nowrap transition-colors ${
                  (searchParams.type || "") === tab.value
                    ? "bg-lime text-brand"
                    : "text-gray-500 hover:bg-lime-pale hover:text-brand"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-gray-100 border-b-2 border-black px-6 py-3 flex gap-3 flex-wrap items-center">
        <div className="max-w-7xl mx-auto w-full flex gap-3 flex-wrap items-center">
          {/* Effect filter */}
          <Link href={`/strains?${new URLSearchParams({ ...(searchParams.type ? { type: searchParams.type } : {}), ...(searchParams.sort ? { sort: searchParams.sort } : {}) }).toString()}`}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${!searchParams.effect ? "bg-lime" : "bg-white hover:bg-lime-pale"}`}>
            All Effects
          </Link>
          {["Happy", "Relaxed", "Euphoric", "Creative", "Energetic", "Sleepy"].map((e) => (
            <Link
              key={e}
              href={`/strains?${new URLSearchParams({ ...(searchParams.type ? { type: searchParams.type } : {}), effect: e, ...(searchParams.sort ? { sort: searchParams.sort } : {}) }).toString()}`}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${searchParams.effect === e ? "bg-lime" : "bg-white hover:bg-lime-pale"}`}
            >
              {e}
            </Link>
          ))}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-3">
            <div className="flex gap-2">
              {[
                { label: "Popular", value: "" },
                { label: "Highest THC", value: "thc_high" },
                { label: "A–Z", value: "az" },
              ].map((s) => (
                <Link
                  key={s.value}
                  href={`/strains?${new URLSearchParams({ ...(searchParams.type ? { type: searchParams.type } : {}), ...(searchParams.effect ? { effect: searchParams.effect } : {}), ...(s.value ? { sort: s.value } : {}) }).toString()}`}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${(searchParams.sort || "") === s.value ? "bg-brand text-white" : "bg-white hover:bg-gray-50"}`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <span className="text-xs font-black bg-lime border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">
              {filtered.length} strains
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🌿</div>
            <div className="font-black text-xl mb-2">No strains found</div>
            <Link href="/strains" className="text-sm font-bold text-brand underline">Clear filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((s) => (
              <StrainCard key={s.slug} strain={s} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
