import { supabase } from "./supabase";
import type { Strain } from "./types";

// ─── Lightweight type for homepage ticker/counts (no heavy fields) ─────────
export type StrainMeta = Pick<Strain, "name" | "slug" | "type">;

// Get all strains (for sitemaps, static generation — use sparingly)
export async function getAllStrains(): Promise<Strain[]> {
  const { data, error } = await supabase
    .from("strains")
    .select("*")
    .order("rank_popularity", { ascending: true });

  if (error) {
    console.error("getAllStrains error:", error);
    return [];
  }
  return data as Strain[];
}

// ── NEW: lightweight fetch — only name/slug/type for ticker + counts ────────
export async function getAllStrainsMeta(): Promise<StrainMeta[]> {
  const { data, error } = await supabase
    .from("strains")
    .select("name, slug, type")
    .order("rank_popularity", { ascending: true });

  if (error) {
    console.error("getAllStrainsMeta error:", error);
    return [];
  }
  return data as StrainMeta[];
}

// Get all slugs only (for generateStaticParams — fast)
export async function getAllStrainSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from("strains")
    .select("slug")
    .order("rank_popularity", { ascending: true });

  if (error) return [];
  return data;
}

// Get single strain by slug
export async function getStrainBySlug(slug: string): Promise<Strain | null> {
  const { data, error } = await supabase
    .from("strains")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Strain;
}

// Get top N strains for homepage — only fields StrainCard needs
export async function getTopStrains(limit = 20): Promise<Strain[]> {
  const { data, error } = await supabase
    .from("strains")
    .select(
      "id, name, slug, type, thc_max, cbd_max, effects, terpenes, helps_with, flavors, description, grow_difficulty, flowering_weeks_max, image_url, rank_popularity"
    )
    .order("rank_popularity", { ascending: true })
    .limit(limit);

  if (error) return [];
  return data as Strain[];
}

// Get similar strains (same type, excluding current)
export async function getSimilarStrains(
  type: string,
  excludeSlug: string,
  limit = 4
): Promise<Strain[]> {
  const { data, error } = await supabase
    .from("strains")
    .select(
      "id, name, slug, type, thc_max, cbd_max, effects, terpenes, helps_with, flavors, description, grow_difficulty, flowering_weeks_max, image_url, rank_popularity"
    )
    .eq("type", type)
    .neq("slug", excludeSlug)
    .order("rank_popularity", { ascending: true })
    .limit(limit);

  if (error) return [];
  return data as Strain[];
}

// Search strains
export async function searchStrains(query: string): Promise<Strain[]> {
  const { data, error } = await supabase
    .from("strains")
    .select(
      "id, name, slug, type, thc_max, cbd_max, effects, terpenes, helps_with, flavors, description, grow_difficulty, flowering_weeks_max, image_url, rank_popularity"
    )
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("rank_popularity", { ascending: true })
    .limit(20);

  if (error) return [];
  return data as Strain[];
}

// Get all strains paginated (for the browser page)
export async function getStrainsPaginated(
  page = 1,
  limit = 48,
  type?: string,
  effect?: string
): Promise<{ strains: Strain[]; total: number }> {
  let query = supabase
    .from("strains")
    .select(
      "id, name, slug, type, thc_max, cbd_max, effects, terpenes, helps_with, flavors, description, grow_difficulty, flowering_weeks_max, image_url, rank_popularity",
      { count: "exact" }
    );

  if (type) query = query.eq("type", type);
  if (effect) query = query.contains("effects", [effect]);

  const { data, count, error } = await query
    .order("rank_popularity", { ascending: true })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return { strains: [], total: 0 };
  return { strains: data as Strain[], total: count || 0 };
}

// Look up slugs for parent strains by name (for linking on strain detail page)
export async function getParentSlugs(
  parentNames: string[]
): Promise<Record<string, string>> {
  if (!parentNames || parentNames.length === 0) return {};

  const { data, error } = await supabase
    .from("strains")
    .select("name, slug")
    .in("name", parentNames);

  if (error || !data) return {};

  const map: Record<string, string> = {};
  for (const row of data) {
    map[row.name] = row.slug;
  }
  return map;
}
