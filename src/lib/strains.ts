import { supabase } from "./supabase";
import type { Strain } from "./types";

// Get all strains (for homepage, sitemaps, static generation)
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

// Get top N strains for homepage
export async function getTopStrains(limit = 20): Promise<Strain[]> {
  const { data, error } = await supabase
    .from("strains")
    .select("*")
    .order("rank_popularity", { ascending: true })
    .limit(limit);

  if (error) return [];
  return data as Strain[];
}

// Get strains by type (Indica / Sativa / Hybrid)
export async function getStrainsByType(type: string): Promise<Strain[]> {
  const { data, error } = await supabase
    .from("strains")
    .select("*")
    .eq("type", type)
    .order("rank_popularity", { ascending: true });

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
    .select("*")
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
    .select("*")
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
  let query = supabase.from("strains").select("*", { count: "exact" });

  if (type) query = query.eq("type", type);
  if (effect) query = query.contains("effects", [effect]);

  const { data, count, error } = await query
    .order("rank_popularity", { ascending: true })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return { strains: [], total: 0 };
  return { strains: data as Strain[], total: count || 0 };
}
