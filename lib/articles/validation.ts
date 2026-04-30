import { TITLE_MAX_LENGTH, BODY_MAX_LENGTH } from "./constants";
import { ARTICLE_CATEGORIES } from "./categories";
import { ARTICLE_STATUSES } from "./status";

export type ArticleInput = {
  title?: unknown;
  body?: unknown;
  category?: unknown;
  status?: unknown;
  cover_url?: unknown;
};

export function validateArticleInput(input: ArticleInput): { error?: string } {
  const { title, body, category, status, cover_url } = input;

  if (!title || typeof title !== "string" || title.length > TITLE_MAX_LENGTH) {
    return { error: `제목은 1~${TITLE_MAX_LENGTH}자 사이여야 합니다` };
  }
  if (typeof body !== "string" || body.length > BODY_MAX_LENGTH) {
    return { error: `본문이 너무 깁니다 (최대 ${BODY_MAX_LENGTH}자)` };
  }
  if (!ARTICLE_CATEGORIES.includes(category as never)) {
    return { error: "잘못된 분류" };
  }
  if (!ARTICLE_STATUSES.includes(status as never)) {
    return { error: "잘못된 상태" };
  }
  if (cover_url && typeof cover_url !== "string") {
    return { error: "잘못된 cover_url" };
  }
  return {};
}