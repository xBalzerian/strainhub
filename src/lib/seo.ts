import type { Strain } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.strainhub.org";
const SITE_NAME = "StrainHub";

export function strainMetadata(strain: Strain) {
  const title = `${strain.name} Strain: Effects, Terpenes & Grow Guide`;
  const description = `${strain.name} is a ${strain.type} cannabis strain with ${strain.thc_min}–${strain.thc_max}% THC. Effects: ${strain.effects?.slice(0, 3).join(", ")}. Terpenes: ${strain.terpenes?.slice(0, 2).join(", ")}. ${strain.grow_difficulty} to grow.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/strains/${strain.slug}`,
      siteName: SITE_NAME,
      images: strain.image_url ? [{ url: strain.image_url, width: 800, height: 800, alt: `${strain.name} cannabis strain` }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: strain.image_url ? [strain.image_url] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/strains/${strain.slug}`,
    },
  };
}

// JSON-LD Schema for strain pages (Google loves this)
export function strainJsonLd(strain: Strain) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Drug",
        name: strain.name,
        description: strain.description,
        url: `${SITE_URL}/strains/${strain.slug}`,
        image: strain.image_url,
        drugClass: `Cannabis ${strain.type}`,
        activeIngredient: `THC ${strain.thc_max}%, CBD ${strain.cbd_max}%`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What are the effects of ${strain.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${strain.name} is reported to produce ${strain.effects?.join(", ")} effects. Users commonly use it for ${strain.helps_with?.slice(0, 3).join(", ")}.`,
            },
          },
          {
            "@type": "Question",
            name: `How much THC does ${strain.name} have?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${strain.name} typically contains ${strain.thc_min}–${strain.thc_max}% THC, making it a ${strain.thc_max >= 25 ? "very potent" : strain.thc_max >= 20 ? "potent" : "moderate"} ${strain.type.toLowerCase()} strain.`,
            },
          },
          {
            "@type": "Question",
            name: `Is ${strain.name} indica or sativa?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${strain.name} is a ${strain.type} cannabis strain. ${strain.type === "Indica" ? "Indica strains typically produce relaxing, sedating effects." : strain.type === "Sativa" ? "Sativa strains are known for uplifting, energetic effects." : "Hybrid strains combine traits from both indica and sativa."}`,
            },
          },
          {
            "@type": "Question",
            name: `How long does ${strain.name} take to flower?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${strain.name} has a flowering time of ${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks. It's rated ${strain.grow_difficulty.toLowerCase()} to grow and produces a ${strain.grow_yield.toLowerCase()} yield.`,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Strains", item: `${SITE_URL}/strains` },
          { "@type": "ListItem", position: 3, name: strain.name, item: `${SITE_URL}/strains/${strain.slug}` },
        ],
      },
    ],
  };
}
