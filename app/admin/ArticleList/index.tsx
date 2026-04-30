import type { Article } from "@/lib/articles/types";
import ArticleListItem from "./ArticleListItem";
import Pagination from "./Pagination";

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  togglingId: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (article: Article) => void;
  onCreate: () => void;
  onLogout: () => void;
}

export default function ArticleList({
  articles,
  loading,
  togglingId,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreate,
  onLogout,
}: ArticleListProps) {
  return (
    <div className="min-h-screen bg-surface px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-hairline bg-white p-8">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between border-b border-hairline pb-4">
          <h1 className="text-[22px] font-extrabold text-ink">아티클 관리</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCreate}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              새 아티클
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-hairline bg-white px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Empty state */}
        {!loading && articles.length === 0 && (
          <div className="px-6 py-16 text-center text-muted">
            아직 작성된 아티클이 없습니다
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-2">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="pointer-events-none flex items-center gap-4 rounded-xl border border-hairline px-4 py-3"
                >
                  <div className="h-16 w-16 flex-none animate-pulse rounded-lg bg-hairline" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-3/5 animate-pulse rounded bg-hairline" />
                    <div className="h-3 w-2/5 animate-pulse rounded bg-hairline" />
                  </div>
                </div>
              ))
            : articles.map((article) => (
                <ArticleListItem
                  key={article.id}
                  article={article}
                  toggling={togglingId === article.id}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStatus={onToggleStatus}
                />
              ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
