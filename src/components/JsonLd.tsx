// Reusable JSON-LD structured data component for SEO
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished = "2025-01-01",
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || new Date().toISOString().split("T")[0],
        author: {
          "@type": "Organization",
          name: "StrainHub",
          url: "https://www.strainhub.org",
        },
        publisher: {
          "@type": "Organization",
          name: "StrainHub",
          url: "https://www.strainhub.org",
          logo: {
            "@type": "ImageObject",
            url: "https://www.strainhub.org/images/logo.png",
          },
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  questions,
}: {
  questions: { q: string; a: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: qa.a,
          },
        })),
      }}
    />
  );
}
