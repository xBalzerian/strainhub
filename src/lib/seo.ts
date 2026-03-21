import type { Strain } from "./types";

const SITE_URL = "https://www.strainhub.org";
const SITE_NAME = "StrainHub";

function potencyLabel(thc: number): string {
  if (thc >= 28) return "extremely potent";
  if (thc >= 24) return "very potent";
  if (thc >= 20) return "potent";
  if (thc >= 15) return "moderate";
  return "mild";
}

function typeDesc(type: string): string {
  if (type === "Indica") return "indica — known for relaxing, sedating body effects";
  if (type === "Sativa") return "sativa — known for energizing, uplifting cerebral effects";
  return "hybrid — balancing both indica and sativa characteristics";
}

export function strainMetadata(strain: Strain) {
  const thcRange = strain.thc_min && strain.thc_max
    ? `${strain.thc_min}–${strain.thc_max}% THC`
    : strain.thc_max
    ? `up to ${strain.thc_max}% THC`
    : "THC data available";

  const effects = strain.effects?.slice(0, 3).join(", ") || "";
  const terpenes = strain.terpenes?.slice(0, 2).join(", ") || "";
  const helpsWith = strain.helps_with?.slice(0, 2).join(", ") || "";

  // Clean title — template adds "| StrainHub"
  const title = `${strain.name} Strain: Effects, Terpenes & Grow Guide`;

  // Rich description optimized for Google snippets
  const descParts = [
    `${strain.name} is a ${typeDesc(strain.type)} with ${thcRange}.`,
    effects ? `Effects include ${effects}.` : "",
    terpenes ? `Dominant terpenes: ${terpenes}.` : "",
    helpsWith ? `May help with ${helpsWith}.` : "",
    strain.grow_difficulty ? `${strain.grow_difficulty} to grow${strain.flowering_weeks_min ? `, flowering in ${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks` : ""}.` : "",
  ].filter(Boolean).join(" ");

  const description = descParts.length > 155
    ? descParts.slice(0, 152) + "..."
    : descParts;

  return {
    title,
    description,
    keywords: [
      `${strain.name} strain`,
      `${strain.name} weed`,
      `${strain.name} cannabis`,
      `${strain.name} effects`,
      `${strain.name} terpenes`,
      `${strain.name} grow guide`,
      `${strain.name} THC`,
      `${strain.type?.toLowerCase()} strains`,
      ...(strain.effects?.slice(0, 2).map(e => `${e.toLowerCase()} weed`) || []),
    ],
    openGraph: {
      title: `${strain.name} Strain | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/strains/${strain.slug}`,
      siteName: SITE_NAME,
      images: strain.image_url
        ? [{ url: strain.image_url, width: 800, height: 800, alt: `${strain.name} cannabis strain` }]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${strain.name} Strain | ${SITE_NAME}`,
      description,
      images: strain.image_url ? [strain.image_url] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/strains/${strain.slug}`,
    },
  };
}

// JSON-LD Schema for strain pages
export function strainJsonLd(strain: Strain) {
  const strainUrl = `${SITE_URL}/strains/${strain.slug}`;
  const thcRange = strain.thc_min && strain.thc_max
    ? `${strain.thc_min}–${strain.thc_max}%`
    : `${strain.thc_max || "?"}%`;

  const faqs = [
    {
      "@type": "Question",
      name: `What are the effects of ${strain.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${strain.name} produces ${strain.effects?.join(", ") || "relaxing"} effects. It is a ${strain.type} strain${strain.helps_with?.length ? ` commonly used for ${strain.helps_with.slice(0, 3).join(", ")}` : ""}.`,
      },
    },
    {
      "@type": "Question",
      name: `How much THC does ${strain.name} have?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${strain.name} typically contains ${thcRange} THC, making it ${potencyLabel(strain.thc_max || 0)}. ${strain.cbd_max ? `CBD content is approximately ${strain.cbd_max}%.` : ""}`,
      },
    },
    {
      "@type": "Question",
      name: `Is ${strain.name} indica or sativa?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${strain.name} is a ${strain.type} cannabis strain. ${strain.type === "Indica" ? "Indica strains typically produce relaxing, sedating body effects ideal for evening use." : strain.type === "Sativa" ? "Sativa strains are known for uplifting, energetic, and cerebral effects great for daytime use." : "Hybrid strains combine traits from both indica and sativa, offering a balanced experience."}`,
      },
    },
    {
      "@type": "Question",
      name: `What terpenes are in ${strain.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: strain.terpenes?.length
          ? `The dominant terpenes in ${strain.name} are ${strain.terpenes.join(", ")}. These contribute to its unique aroma, flavor, and effects.`
          : `${strain.name} has a unique terpene profile that contributes to its aroma and effects.`,
      },
    },
    {
      "@type": "Question",
      name: `How long does ${strain.name} take to flower?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: strain.flowering_weeks_min
          ? `${strain.name} has a flowering time of ${strain.flowering_weeks_min}–${strain.flowering_weeks_max} weeks. It is rated ${(strain.grow_difficulty || "moderate").toLowerCase()} to grow and produces a ${(strain.grow_yield || "moderate").toLowerCase()} yield.`
          : `${strain.name} is rated ${(strain.grow_difficulty || "moderate").toLowerCase()} to grow.`,
      },
    },
    ...(strain.helps_with?.length
      ? [
          {
            "@type": "Question",
            name: `What is ${strain.name} used for medically?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${strain.name} is commonly used to help with ${strain.helps_with.join(", ")}. Always consult a healthcare professional before using cannabis for medical purposes.`,
            },
          },
        ]
      : []),
    ...(strain.parents?.length
      ? [
          {
            "@type": "Question",
            name: `What strains were crossed to make ${strain.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${strain.name} was bred by crossing ${strain.parents.join(" × ")}. This genetic lineage contributes to its unique characteristics.`,
            },
          },
        ]
      : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Thing",
        "@id": strainUrl,
        name: strain.name,
        description: strain.description,
        url: strainUrl,
        image: strain.image_url,
        alternateName: `${strain.name} cannabis strain`,
        ...(strain.terpenes?.length && {
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Type",
              value: strain.type,
            },
            {
              "@type": "PropertyValue",
              name: "THC Content",
              value: `${thcRange}%`,
            },
            ...(strain.cbd_max ? [{
              "@type": "PropertyValue",
              name: "CBD Content",
              value: `${strain.cbd_max}%`,
            }] : []),
            ...strain.terpenes.map(t => ({
              "@type": "PropertyValue",
              name: "Terpene",
              value: t,
            })),
          ],
        }),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Strains", item: `${SITE_URL}/strains` },
          { "@type": "ListItem", position: 3, name: strain.name, item: strainUrl },
        ],
      },
      // SpeakableSpecification — tells Google AI Overviews which text to read/cite
      {
        "@type": "WebPage",
        "@id": `${strainUrl}#webpage`,
        url: strainUrl,
        name: `${strain.name} Strain: Effects, Terpenes & Grow Guide`,
        description: strain.description,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            ".strain-speakable-description",
            ".strain-speakable-effects",
            ".strain-speakable-terpenes",
            ".strain-speakable-faq",
          ],
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Strains", item: `${SITE_URL}/strains` },
            { "@type": "ListItem", position: 3, name: strain.name, item: strainUrl },
          ],
        },
      },
    ],
  };
}
