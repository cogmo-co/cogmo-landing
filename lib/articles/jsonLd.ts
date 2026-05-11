import type { Article } from "./types";

const BASE_URL = "https://cogmo.life";

function extractPlainText(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "…" : text;
}

export function buildArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: extractPlainText(article.body),
    image: article.cover_url ? [article.cover_url] : undefined,
    datePublished: article.published_at ?? undefined,
    dateModified: article.updated_at ?? article.published_at ?? undefined,
    author: { "@type": "Organization", name: "Cogmo", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Cogmo",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/articles/${article.id}`,
    },
  };
}