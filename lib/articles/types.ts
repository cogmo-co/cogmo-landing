import type { ArticleCategory } from "./categories";
import type { ArticleStatus } from "./status";

export interface Article {
  id: string;
  title: string;
  body: string;
  excerpt: string;
  category: ArticleCategory;
  status: ArticleStatus;
  cover_url: string | null;
  view_count: number;
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

export type AdminView = "loading" | "login" | "list" | "create" | "edit";
