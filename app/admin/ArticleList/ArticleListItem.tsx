import type { Article } from "@/lib/articles/types";
import { CATEGORY_LABEL } from "@/lib/articles/categories";
import StatusToggle from "./StatusToggle";

interface ArticleListItemProps {
  article: Article;
  toggling: boolean;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (article: Article) => void;
}

export default function ArticleListItem({
  article,
  toggling,
  onEdit,
  onDelete,
  onToggleStatus,
}: ArticleListItemProps) {
  const dateStr = new Date(article.created_at).toLocaleDateString("ko-KR");

  return (
    <div className="flex items-center gap-4 rounded-xl border border-hairline px-4 py-3 transition hover:border-muted">
      {article.cover_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.cover_url}
          alt=""
          className="h-16 w-16 flex-none rounded-lg object-cover"
        />
      ) : (
        <div className="h-16 w-16 flex-none rounded-lg border border-dashed border-hairline bg-surface" />
      )}

      <div className="min-w-0 flex-1">
        <div className="mb-1 truncate text-[15px] font-semibold text-ink">
          {article.title}
        </div>
        <div className="text-sm text-muted">
          {CATEGORY_LABEL[article.category]} · {dateStr}
        </div>
      </div>

      <StatusToggle
        status={article.status}
        disabled={toggling}
        onChange={() => onToggleStatus(article)}
      />

      <div className="flex flex-none gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(article)}
          className="rounded-md border border-hairline bg-white px-3 py-1.5 text-[13px] text-body transition hover:border-muted hover:bg-surface"
        >
          수정
        </button>
        <button
          type="button"
          onClick={() => onDelete(article.id)}
          className="rounded-md border border-hairline bg-white px-3 py-1.5 text-[13px] text-body transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
