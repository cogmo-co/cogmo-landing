import type { Article } from "@/lib/articles/types";
import { buildArticleJsonLd } from "@/lib/articles/jsonLd";

interface ArticleJsonLdProps {
  article: Article;
}

export default function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildArticleJsonLd(article)),
      }}
    />
  );
}