import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const baseBtn =
  "flex min-w-[36px] h-9 items-center justify-center rounded-md border border-hairline bg-white px-2.5 text-sm text-body transition hover:bg-surface";
const activeBtn =
  "flex min-w-[36px] h-9 items-center justify-center rounded-md border border-primary bg-primary px-2.5 text-sm text-white";
const disabledBtn =
  "flex min-w-[36px] h-9 items-center justify-center rounded-md border border-hairline bg-white px-2.5 text-sm text-muted opacity-40 cursor-not-allowed";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // TODO: 글 수 100+ 시 truncate (예: 1 ... 5 6 7 ... 50). 현재는 트래픽 적어 전체 노출.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function hrefFor(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  return (
    <nav aria-label="페이지 이동" className="flex justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={hrefFor(currentPage - 1)}
          className={baseBtn}
          aria-label="이전 페이지"
        >
          ‹
        </Link>
      ) : (
        <span className={disabledBtn}>‹</span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={p === currentPage ? activeBtn : baseBtn}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={hrefFor(currentPage + 1)}
          className={baseBtn}
          aria-label="다음 페이지"
        >
          ›
        </Link>
      ) : (
        <span className={disabledBtn}>›</span>
      )}
    </nav>
  );
}
