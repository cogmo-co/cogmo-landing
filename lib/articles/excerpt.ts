/**
 * 본문 HTML에서 발췌(plain text) 추출
 * - 태그 제거 → HTML 엔티티 디코드 → 공백 정규화 → maxLength로 자름
 * - 저장 시점에 호출하여 articles.excerpt 컬럼에 저장
 */
export function extractExcerpt(html: string, maxLength = 300): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
