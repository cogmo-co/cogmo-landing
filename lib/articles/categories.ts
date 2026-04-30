export type ArticleCategory = "cogmo_news" | "health_info";

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "cogmo_news",
  "health_info",
];

export const CATEGORY_LABEL: Record<ArticleCategory, string> = {
  cogmo_news: "코그모 소식",
  health_info: "건강정보",
};
