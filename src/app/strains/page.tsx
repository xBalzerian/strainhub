import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import StrainCard from "@/components/StrainCard";
import type { Strain } from "@/lib/types";

export const metadata: Metadata = {
  title: "Cannabis Strain Database — Browse 100+ Strains | StrainHub",
  description:
    "Browse and filter 100+ cannabis strains by type, effects, terpenes, and grow difficulty. Find your perfect Indica, Sativa, or Hybrid strain.",
};

// Revalidate every 1 hour (ISR) — keeps data fresh without full SSR on every request
export const revalidate = 60;

const EFFECTS = ["Happy", "Relaxed", "Euphoric", "Creative", "Energetic", "Sleepy"];
const SORT_OPTIONS = [
  { label: "Popular", value: "" },
  { label: "Highest THC", value: "thc_high" },
  { label: "A–Z", value: "az" },
];
const TABS = [
  { label: "🌿 All", value: "" },
  { label: "🍇 Indica", value: "Indica" },
  { label: "☀️ Sativa", value: "Sativa" },
  { label: "⚡ Hybrid", value: "Hybrid" },
];

async function getStrains(type?: string, effect?: string, sort?: string): Promise<Strain[]> {
  // Only select the fields StrainCard actually needs — faster query, less bandwidth
  let query = supabase
    .from("strains")
    .select(
      "id, name, slug, type, thc_min, thc_max, cbd_min, cbd_max, effects, flavors, terpenes, helps_with, description, grow_difficulty, flowering_weeks_max, image_url, rank_popularity"
    );

  if (type) query = query.eq("type", type);
  if (effect) query = query.contains("effects", [effect]);

  if (sort === "thc_high") query = query.order("thc_max", { ascending: false });
  else if (sort === "az") query = query.order("name", { ascending: true });
  else query = query.order("rank_popularity", { ascending: true });

  const { data, error } = await query.limit(200);

  if (error) {
    console.error("getStrains error:", error);
    return [];
  }
  return (data || []) as Strain[];
}

export default async function StrainsPage({
  searchParams,
}: {
  searchParams: { type?: string; effect?: string; sort?: string };
}) {
  const strains = await getStrains(
    searchParams.type,
    searchParams.effect,
    searchParams.sort
  );

  // Build URL helper
  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const params: Record<string, string> = {};
    if (searchParams.type) params.type = searchParams.type;
    if (searchParams.effect) params.effect = searchParams.effect;
    if (searchParams.sort) params.sort = searchParams.sort;
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === undefined || v === "") delete params[k];
      else params[k] = v;
    });
    const qs = new URLSearchParams(params).toString();
    return `/strains${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-0">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
            Cannabis Strain Database
          </h1>
          <p className="text-gray-500 text-sm mb-5">
            {strains.length} strains — browse, filter, and find your perfect match
          </p>

          {/* Type tabs */}
          <div className="flex gap-0 border-t-2 border-black overflow-x-auto">
            {TABS.map((tab) => (
              <Link
                key={tab.value}
                href={buildUrl({ type: tab.value || undefined, effect: undefined })}
                className={`px-4 sm:px-5 py-3 text-sm font-bold border-r-2 border-black whitespace-nowrap transition-colors ${
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
      <div className="bg-gray-100 border-b-2 border-black px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap items-center">
          {/* Effect pills */}
          <Link
            href={buildUrl({ effect: undefined })}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${
              !searchParams.effect ? "bg-lime" : "bg-white hover:bg-lime-pale"
            }`}
          >
            All Effects
          </Link>
          {EFFECTS.map((e) => (
            <Link
              key={e}
              href={buildUrl({ effect: e })}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${
                searchParams.effect === e ? "bg-lime" : "bg-white hover:bg-lime-pale"
              }`}
            >
              {e}
            </Link>
          ))}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {SORT_OPTIONS.map((s) => (
              <Link
                key={s.value}
                href={buildUrl({ sort: s.value || undefined })}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${
                  (searchParams.sort || "") === s.value
                    ? "bg-brand text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {s.label}
              </Link>
            ))}
            <span className="text-xs font-black bg-lime border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">
              {strains.length} strains
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {strains.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🌿</div>
            <div className="font-black text-xl mb-2">No strains found</div>
            <Link href="/strains" className="text-sm font-bold text-brand underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {strains.map((s, idx) => (
              <StrainCard key={s.slug} strain={s} priority={idx < 10} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

