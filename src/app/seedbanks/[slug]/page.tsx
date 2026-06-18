import type { Metadata } from "next";
import Script from "next/script";
import SeedbankDetailClient from "./SeedbankDetailClient";

const BASE_URL = "https://www.strainhub.org";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getSeedbankMeta(slug: string) {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/seedbanks?slug=eq.${slug}&select=name,slug,short_bio,description,country,state_province,city,seed_types,rating,review_count,logo_url,website,founded_year,notable_strains&limit=1`,
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
  const titleText = `${sb.name} | Seed Bank Reviews, Strains & Shipping Info`;
  const desc = `Explore ${sb.name} on StrainHub. Find ${seedTypes} seeds, read grower reviews, browse top strains, and discover shipping options${country ? ` for ${country}` : ""}.`;

  return {
    title: { absolute: `${titleText} | StrainHub` },
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
      url: `${BASE_URL}/seedbanks/${params.slug}`,
      type: "website",
      siteName: "StrainHub",
      images: sb.logo_url ? [{ url: sb.logo_url, width: 400, height: 400, alt: `${sb.name} logo` }] : [],
    },
    twitter: { card: "summary_large_image", title: `${titleText} | StrainHub`, description: desc },
    alternates: { canonical: `${BASE_URL}/seedbanks/${params.slug}` },
  };
}

export default async function SeedbankPage({ params }: { params: { slug: string } }) {
  const sb = await getSeedbankMeta(params.slug);

  // Build JSON-LD — Store + AggregateRating schema (auto-applied to ALL seedbanks)
  const jsonLd = sb ? {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    "name": sb.name,
    "description": sb.short_bio || sb.description || `${sb.name} is a cannabis seed bank offering ${Array.isArray(sb.seed_types) ? sb.seed_types.join(", ") : "cannabis"} seeds.`,
    "url": sb.website || `${BASE_URL}/seedbanks/${sb.slug}`,
    "image": sb.logo_url || undefined,
    "logo": sb.logo_url || undefined,
    "foundingYear": sb.founded_year || undefined,
    "address": sb.city || sb.country ? {
      "@type": "PostalAddress",
      "addressLocality": sb.city || undefined,
      "addressRegion": sb.state_province || undefined,
      "addressCountry": sb.country || undefined,
    } : undefined,
    "aggregateRating": sb.rating && sb.review_count ? {
      "@type": "AggregateRating",
      "ratingValue": sb.rating,
      "reviewCount": sb.review_count,
      "bestRating": 5,
      "worstRating": 1,
    } : undefined,
    "sameAs": [
      sb.website,
    ].filter(Boolean),
    // BreadcrumbList
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Seed Banks", "item": `${BASE_URL}/seedbanks` },
        { "@type": "ListItem", "position": 3, "name": sb.name, "item": `${BASE_URL}/seedbanks/${sb.slug}` },
      ],
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <Script
          id="seedbank-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      )}
      <SeedbankDetailClient slug={params.slug} />
    </>
  );
}
