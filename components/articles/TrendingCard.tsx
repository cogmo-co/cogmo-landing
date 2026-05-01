import Link from "next/link";
import type { Article } from "@/lib/articles/types";
import {
  CATEGORY_LABEL,
  type ArticleCategory,
} from "@/lib/articles/categories";
import { formatLongDate, truncate } from "@/lib/articles/format";

interface TrendingCardProps {
  article: Article;
}

const BADGE_STYLE: Record<ArticleCategory, string> = {
  cogmo_news: "bg-primary/90 text-white",
  health_info: "bg-[#EFD7D1] text-ink",
};


export default function TrendingCard({ article }: TrendingCardProps) {
  const dateStr = article.published_at
    ? formatLongDate(article.published_at)
    : "";
  const excerpt = truncate(article.excerpt, 200);

  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white md:flex-row"
    >
      {/* 좌측 커버 — 4:3 비율 고정 */}
      <div className="relative aspect-[4/3] w-full flex-none bg-[#F0FFE3] md:w-2/5">
        {article.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_url}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
            No Image
          </div>
        )}
        <span
          className={`absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${BADGE_STYLE[article.category]}`}
        >
          {CATEGORY_LABEL[article.category]}
        </span>
      </div>

      {/* 우측 본문 */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {dateStr && (
          <span className="text-right text-xs text-muted">{dateStr}</span>
        )}

        <div className="flex flex-1 flex-col justify-between gap-2">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-ink md:text-xl">
            {article.title}
          </h3>
          <p className="hidden text-sm leading-relaxed text-body md:line-clamp-3">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
