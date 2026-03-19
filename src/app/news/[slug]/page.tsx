import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticlesMeta } from "@/lib/articles";
import ArticlePage from "@/components/ArticlePage";

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await getArticlesMeta();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  const title = article.seo_title || article.title;
  const desc = article.seo_description || article.summary || "";
  return {
    title: { absolute: `${title} | StrainHub` },
    description: desc,
    authors: [{ name: article.author_name }],
    alternates: { canonical: `https://www.strainhub.org/news/${article.slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://www.strainhub.org/news/${article.slug}`,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author_name],
      images: article.hero_image_url ? [{ url: article.hero_image_url, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: article.hero_image_url ? [article.hero_image_url] : [],
    },
  };
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  // JSON-LD schemas
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: article.hero_image_url ? [article.hero_image_url] : [],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: article.author_name, jobTitle: article.author_title },
    publisher: {
      "@type": "Organization",
      name: "StrainHub",
      logo: { "@type": "ImageObject", url: "https://www.strainhub.org/logo.png" },
    },
    url: `https://www.strainhub.org/news/${article.slug}`,
    mainEntityOfPage: `https://www.strainhub.org/news/${article.slug}`,
    articleSection: article.category,
    keywords: (article.tags || []).join(", "),
  };

  const faqSchema = article.faq?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ArticlePage article={article} />
    </>
  );
}
