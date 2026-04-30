import type { ArticleCategory } from "./categories";
import type { ArticleStatus } from "./status";

export interface Article {
  id: string;
  title: string;
  body: string;
  category: ArticleCategory;
  status: ArticleStatus;
  cover_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

export type ArticleSummary = Pick<
  Article,
  "id" | "title" | "category" | "cover_url" | "published_at"
>;

export type AdminView = "loading" | "login" | "list" | "create" | "edit";
