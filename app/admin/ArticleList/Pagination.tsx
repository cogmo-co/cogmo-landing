interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const baseBtn =
  "min-w-[36px] h-9 px-2.5 rounded-md border border-hairline bg-white text-sm text-body transition hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed";
const activeBtn =
  "min-w-[36px] h-9 px-2.5 rounded-md border border-primary bg-primary text-sm text-white transition hover:bg-primary-dark";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="페이지 이동"
      className="mt-6 flex justify-center gap-1"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={baseBtn}
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={p === currentPage ? activeBtn : baseBtn}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={baseBtn}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
}
