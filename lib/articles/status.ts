export type ArticleStatus = "draft" | "published";

export const ARTICLE_STATUSES: ArticleStatus[] = ["draft", "published"];

export const STATUS_LABEL: Record<ArticleStatus, string> = {
  draft: "비공개",
  published: "공개",
};
