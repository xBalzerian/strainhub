import type { Metadata } from "next";
import SeedbankDetailClient from "./SeedbankDetailClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getSeedbankMeta(slug: string) {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/seedbanks?slug=eq.${slug}&select=name,short_bio,country,state_province,city,seed_types,rating,review_count,logo_url&limit=1`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, next: { revalidate: 86400 } }
  );
  const data = await res.json();
  return data?.[0] ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sb = await getSeedbankMeta(params.slug);
  if (!sb) return { title: "Seed Bank | StrainHub" };

  const country = sb.country || "";
  const seedTypes = Array.isArray(sb.seed_types) && sb.seed_types.length > 0
    ? sb.seed_types.slice(0, 3).join(", ")
    : "Cannabis";

  // Title: "[Name] | Seed Bank Reviews, Strains & Shipping Info"
  // Leafly pattern — timeless, no year, clean pipe separator
  const titleText = `${sb.name} | Seed Bank Reviews, Strains & Shipping Info`;

  // Description: ~140-160 chars, action-oriented, mirrors Leafly style
  const desc = `Explore ${sb.name} on StrainHub. Find ${seedTypes} seeds, read grower reviews, browse top strains, and discover shipping options${country ? ` for ${country}` : ""}.`;

  return {
    title: {
      absolute: `${titleText} | StrainHub`,
    },
    description: desc,
    keywords: [
      sb.name,
      `${sb.name} review`,
      `${sb.name} seeds`,
      `${sb.name} seed bank`,
      `${sb.name} shipping`,
      `best seed bank ${country}`,
      "cannabis seed bank",
      "buy marijuana seeds",
      "seed bank reviews",
      ...(Array.isArray(sb.seed_types) ? sb.seed_types.map((t: string) => `${t.toLowerCase()} seeds`) : []),
    ],
    openGraph: {
      title: `${titleText} | StrainHub`,
      description: desc,
      url: `https://www.strainhub.org/seedbanks/${params.slug}`,
      type: "website",
      siteName: "StrainHub",
      images: sb.logo_url ? [{ url: sb.logo_url, width: 400, height: 400, alt: `${sb.name} logo` }] : [],
    },
    twitter: { card: "summary_large_image", title: `${titleText} | StrainHub`, description: desc },
    alternates: { canonical: `https://www.strainhub.org/seedbanks/${params.slug}` },
  };
}

export default function SeedbankPage({ params }: { params: { slug: string } }) {
  return <SeedbankDetailClient slug={params.slug} />;
}
