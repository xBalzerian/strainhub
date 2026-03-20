import { createClient } from "@supabase/supabase-js";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bfzcjunuuxzhqafuljlh.supabase.co";
// Server-side: use service role (bypasses RLS, all articles visible).
// Client-side: falls back to anon key (or placeholder — read-only public data).
const SB_KEY =
  typeof window === "undefined"
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
    : (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");

function getClient() {
  return createClient(SB_URL, SB_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type Article = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  hero_image_url: string | null;
  thumbnail_url: string | null;
  tags: string[];
  related_strains: string[];
  related_seedbanks: string[];
  faq: { question: string; answer: string }[];
  reactions: { fire: number; heart: number; laugh: number; wow: number; thumbs: number };
  views: number;
  reading_time: number;
  seo_title: string | null;
  seo_description: string | null;
  is_published: boolean;
  published_at: string;
  author_name: string;
  author_title: string;
};

export async function getArticles(limit = 20, category?: string): Promise<Article[]> {
  const supabase = getClient();
  let q = supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (category && category !== "All") q = q.eq("category", category);
  const { data, error } = await q;
  if (error) { console.error("getArticles:", error.message); return []; }
  return (data || []) as Article[];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("articles").select("*")
    .eq("slug", slug).eq("is_published", true).single();
  return data as Article | null;
}

export async function getArticlesMeta(): Promise<Pick<Article, "slug" | "published_at">[]> {
  const supabase = getClient();
  const { data } = await supabase
    .from("articles").select("slug,published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  return (data || []) as Pick<Article, "slug" | "published_at">[];
}

export async function addReaction(slug: string, type: string): Promise<Record<string, number> | null> {
  try {
    const res = await fetch("/api/articles/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, type }),
    });
    const json = await res.json();
    return json.reactions || null;
  } catch { return null; }
}
