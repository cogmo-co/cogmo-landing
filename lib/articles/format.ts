/**
 * Article 공개 화면용 display 유틸
 */

export function truncate(text: string, maxLength: number): string {
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "…"
    : text;
}

/** "26-04-30" 형식 (2자리 연도, 카드 등 좁은 영역) */
export function formatShortDate(iso: string): string {
  const d = new Date(iso);
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

/** "2026-04-30" 형식 (4자리 연도, 상세/Trending 등 강조 영역) */
export function formatLongDate(iso: string): string {
  const d = new Date(iso);
  const yyyy = String(d.getFullYear());
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
