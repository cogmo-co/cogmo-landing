import Link from "next/link";
import type { Article } from "@/lib/articles/types";
import {
  CATEGORY_LABEL,
  type ArticleCategory,
} from "@/lib/articles/categories";
import { formatShortDate, truncate } from "@/lib/articles/format";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "small";
}

const BADGE_STYLE: Record<ArticleCategory, string> = {
  cogmo_news: "bg-primary/90 text-white",
  health_info: "bg-[#EFD7D1] text-ink",
};

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const isSmall = variant === "small";

  const dateStr = article.published_at
    ? formatShortDate(article.published_at)
    : "";

  const excerpt = truncate(article.excerpt, isSmall ? 60 : 100);

  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white"
    >
      {/* Cover with category badge overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F0FFE3]">
        {article.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_url}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            No Image
          </div>
        )}
        <span
          className={`absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${BADGE_STYLE[article.category]}`}
        >
          {CATEGORY_LABEL[article.category]}
        </span>
      </div>

      {/* 날짜 우측 정렬 → 제목 → 본문 발췌 */}
      <div className={`flex flex-1 flex-col gap-2 ${isSmall ? "p-4" : "p-5"}`}>
        <span className="text-right text-xs text-muted">{dateStr}</span>

        <h3
          className={`line-clamp-2 font-bold leading-snug text-ink ${
            isSmall ? "text-sm" : "text-lg"
          }`}
        >
          {article.title}
        </h3>

        <p className="line-clamp-2 min-h-[2.8em] text-sm leading-relaxed text-body">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
