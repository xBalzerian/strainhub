import type { Metadata } from "next";
import SeedbankDetailClient from "./SeedbankDetailClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getSeedbankMeta(slug: string) {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/seedbanks?slug=eq.${slug}&select=name,short_bio,description,country,state_province,city,seed_types,rating,review_count,logo_url&limit=1`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` }, next: { revalidate: 86400 } }
  );
  const data = await res.json();
  return data?.[0] ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sb = await getSeedbankMeta(params.slug);
  if (!sb) return { title: "Seed Bank | StrainHub" };

  const location = [sb.city, sb.state_province, sb.country].filter(Boolean).join(", ");
  const seedTypes = Array.isArray(sb.seed_types) ? sb.seed_types.join(", ") : "cannabis";
  const year = new Date().getFullYear();
  const title = `${sb.name} Review ${year} — ${seedTypes} Seeds, Strains & Info | StrainHub`;
  const desc = sb.short_bio
    ? `${sb.short_bio} Shop ${seedTypes} seeds${location ? ` — ${location}` : ""}. Full profile: ratings, strains, social & reviews on StrainHub.`
    : `${sb.name} seed bank — ${seedTypes} seeds. Ratings, strains, shipping info and grower reviews on StrainHub.`;

  return {
    title,
    description: desc,
    keywords: [
      sb.name,
      `${sb.name} review`,
      `${sb.name} seeds`,
      `${sb.name} coupon ${year}`,
      `best seed bank ${sb.country}`,
      "buy cannabis seeds online",
      "marijuana seed bank",
      "cannabis seed bank review",
      ...(Array.isArray(sb.seed_types) ? sb.seed_types.map((t: string) => `buy ${t.toLowerCase()} seeds`) : []),
    ],
    openGraph: {
      title,
      description: desc,
      url: `https://www.strainhub.org/seedbanks/${params.slug}`,
      type: "website",
      siteName: "StrainHub",
      images: sb.logo_url ? [{ url: sb.logo_url, width: 400, height: 400, alt: `${sb.name} logo` }] : [],
    },
    twitter: { card: "summary_large_image", title, description: desc },
    alternates: { canonical: `https://www.strainhub.org/seedbanks/${params.slug}` },
  };
}

export default function SeedbankPage({ params }: { params: { slug: string } }) {
  return <SeedbankDetailClient slug={params.slug} />;
}
