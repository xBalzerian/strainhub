// articles.ts — server-safe data access for articles
// Uses service role key server-side (API routes, SSR) — bypasses RLS completely.
// Client-side addReaction calls /api/articles/react (server handles auth).

const SB_URL = "https://bfzcjunuuxzhqafuljlh.supabase.co";
const SB_SERVICE_KEY =
  (typeof process !== "undefined" &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY ||
     process.env.SERVICE_ROLE)) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmemNqdW51dXh6aHFhZnVsamxoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI5OTg5MSwiZXhwIjoyMDg4ODc1ODkxfQ.h25adAQDZboQXLQ_IEb3gjSJhdXaRhD5wyvY7pQKnzk";

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

async function sbFetch(path: string): Promise<unknown[]> {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SB_SERVICE_KEY,
      "Authorization": `Bearer ${SB_SERVICE_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) { console.error("sbFetch error:", res.status, path); return []; }
  return res.json();
}

export async function getArticles(limit = 20, category?: string): Promise<Article[]> {
  let path = `articles?select=*&is_published=eq.true&order=published_at.desc&limit=${limit}`;
  if (category && category !== "All") path += `&category=eq.${encodeURIComponent(category)}`;
  const data = await sbFetch(path);
  return data as Article[];
}

export async function getArticle(slug: string): Promise<Article | null> {
  const data = await sbFetch(
    `articles?select=*&slug=eq.${encodeURIComponent(slug)}&is_published=eq.true&limit=1`
  );
  return data.length > 0 ? (data[0] as Article) : null;
}

export async function getArticlesMeta(): Promise<Pick<Article, "slug" | "published_at">[]> {
  const data = await sbFetch(
    "articles?select=slug,published_at&is_published=eq.true&order=published_at.desc"
  );
  return data as Pick<Article, "slug" | "published_at">[];
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
