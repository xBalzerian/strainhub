import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import StrainCard from "@/components/StrainCard";
import type { Strain } from "@/lib/types";

export const metadata: Metadata = {
  title: "Cannabis Strain Database — Browse All Strains | StrainHub",
  description: "Browse and filter cannabis strains by type, effects, terpenes, and grow difficulty. Find your perfect Indica, Sativa, or Hybrid strain.",
  alternates: { canonical: "https://www.strainhub.org/strains" },
};

export const revalidate = 60;

const PAGE_SIZE = 100;

const EFFECTS = ["Happy", "Relaxed", "Euphoric", "Creative", "Energetic", "Sleepy", "Focused", "Uplifted"];
const SORT_OPTIONS = [
  { label: "Popular", value: "" },
  { label: "Highest THC", value: "thc_high" },
  { label: "Newest", value: "new" },
  { label: "A–Z", value: "az" },
];
const TABS = [
  { label: "🌿 All", value: "" },
  { label: "🍇 Indica", value: "Indica" },
  { label: "☀️ Sativa", value: "Sativa" },
  { label: "⚡ Hybrid", value: "Hybrid" },
];

async function getStrains(type?: string, effect?: string, sort?: string, page = 1): Promise<{ strains: Strain[]; total: number }> {
  let countQuery = supabase.from("strains").select("id", { count: "exact", head: true });
  let dataQuery = supabase.from("strains").select(
    "id, name, slug, type, thc_min, thc_max, cbd_min, cbd_max, effects, flavors, terpenes, helps_with, description, grow_difficulty, flowering_weeks_max, image_url, rank_popularity, created_at"
  );

  if (type) { countQuery = countQuery.eq("type", type); dataQuery = dataQuery.eq("type", type); }
  if (effect) { countQuery = countQuery.contains("effects", [effect]); dataQuery = dataQuery.contains("effects", [effect]); }

  if (sort === "thc_high") dataQuery = dataQuery.order("thc_max", { ascending: false });
  else if (sort === "az") dataQuery = dataQuery.order("name", { ascending: true });
  else if (sort === "new") dataQuery = dataQuery.order("created_at", { ascending: false });
  else dataQuery = dataQuery.order("rank_popularity", { ascending: true });

  const from = (page - 1) * PAGE_SIZE;
  dataQuery = dataQuery.range(from, from + PAGE_SIZE - 1);

  const [{ count }, { data, error }] = await Promise.all([countQuery, dataQuery]);

  if (error) { console.error("getStrains error:", error); return { strains: [], total: 0 }; }
  return { strains: (data || []) as Strain[], total: count || 0 };
}

export default async function StrainsPage({
  searchParams,
}: {
  searchParams: { type?: string; effect?: string; sort?: string; page?: string };
}) {
  const currentPage = Math.max(1, parseInt(searchParams.page || "1", 10));
  const { strains, total } = await getStrains(searchParams.type, searchParams.effect, searchParams.sort, currentPage);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const params: Record<string, string> = {};
    if (searchParams.type) params.type = searchParams.type;
    if (searchParams.effect) params.effect = searchParams.effect;
    if (searchParams.sort) params.sort = searchParams.sort;
    if (searchParams.page && searchParams.page !== "1") params.page = searchParams.page;
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === undefined || v === "") delete params[k];
      else params[k] = v;
    });
    const qs = new URLSearchParams(params).toString();
    return `/strains${qs ? `?${qs}` : ""}`;
  };

  const isNew = searchParams.sort === "new";

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-0">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">Cannabis Strain Database</h1>
          <p className="text-gray-500 text-sm mb-5">
            {total} strains — browse, filter, and find your perfect match
            {currentPage > 1 && <span className="ml-2 text-gray-400">· Page {currentPage} of {totalPages}</span>}
          </p>

          {/* Type tabs */}
          <div className="flex gap-0 border-t-2 border-black overflow-x-auto">
            {TABS.map((tab) => (
              <Link
                key={tab.value}
                href={buildUrl({ type: tab.value || undefined, effect: undefined, page: undefined })}
                className={`px-4 sm:px-5 py-3 text-sm font-bold border-r-2 border-black whitespace-nowrap transition-colors ${
                  (searchParams.type || "") === tab.value ? "bg-lime text-brand" : "text-gray-500 hover:bg-lime-pale hover:text-brand"
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
            href={buildUrl({ effect: undefined, page: undefined })}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${!searchParams.effect ? "bg-lime" : "bg-white hover:bg-lime-pale"}`}
          >
            All Effects
          </Link>
          {EFFECTS.map((e) => (
            <Link
              key={e}
              href={buildUrl({ effect: e, page: undefined })}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all ${searchParams.effect === e ? "bg-lime" : "bg-white hover:bg-lime-pale"}`}
            >
              {e}
            </Link>
          ))}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {SORT_OPTIONS.map((s) => {
              const isActive = (searchParams.sort || "") === s.value;
              const isNewBtn = s.value === "new";
              return (
                <Link
                  key={s.value}
                  href={buildUrl({ sort: s.value || undefined, page: undefined })}
                  className={`relative text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-black transition-all overflow-visible ${
                    isActive
                      ? isNewBtn ? "bg-orange-500 text-white border-orange-600" : "bg-brand text-white"
                      : isNewBtn ? "bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {isNewBtn && (
                    <span className={`mr-1 ${isActive ? "fire-active" : "fire-idle"}`} aria-hidden="true">🔥</span>
                  )}
                  {s.label}
                  {isNewBtn && isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping" />
                  )}
                </Link>
              );
            })}
            <span className="text-xs font-black bg-lime border-2 border-black px-3 py-1 rounded-full shadow-brutal-sm">
              {total} strains
            </span>
          </div>
        </div>
      </div>

      {/* "New" banner */}
      {isNew && (
        <div className="bg-orange-50 border-b-2 border-orange-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-orange-700 font-bold">
            <span className="fire-active text-base">🔥</span>
            Showing newest strains first — freshly added to the database
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {strains.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-5xl mb-4">🌿</div>
            <div className="font-black text-xl mb-2">No strains found</div>
            <Link href="/strains" className="text-sm font-bold text-brand underline">Clear filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {strains.map((s, idx) => (
              <StrainCard key={s.slug} strain={s} priority={idx < 8} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            {/* Prev */}
            {currentPage > 1 ? (
              <Link
                href={buildUrl({ page: currentPage > 2 ? String(currentPage - 1) : undefined })}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-black bg-white font-bold text-sm hover:bg-lime transition-all shadow-brutal-sm hover:shadow-brutal"
              >
                ← Prev
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 font-bold text-sm text-gray-300 cursor-not-allowed">← Prev</span>
            )}

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === currentPage;
              const show = p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1;
              const showEllipsis = !show && (p === 2 || p === totalPages - 1);
              if (showEllipsis) return <span key={p} className="text-gray-400 font-black px-1">…</span>;
              if (!show) return null;
              return (
                <Link
                  key={p}
                  href={buildUrl({ page: p > 1 ? String(p) : undefined })}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black font-black text-sm transition-all ${
                    isActive ? "bg-lime shadow-brutal" : "bg-white hover:bg-lime-pale shadow-brutal-sm hover:shadow-brutal"
                  }`}
                >
                  {p}
                </Link>
              );
            })}

            {/* Next */}
            {currentPage < totalPages ? (
              <Link
                href={buildUrl({ page: String(currentPage + 1) })}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-black bg-white font-bold text-sm hover:bg-lime transition-all shadow-brutal-sm hover:shadow-brutal"
              >
                Next →
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 font-bold text-sm text-gray-300 cursor-not-allowed">Next →</span>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Page {currentPage} of {totalPages} · {total} total strains
          </p>
        )}
      </div>
    </>
  );
}
