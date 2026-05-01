import "server-only";
import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { Article } from "@/lib/articles/types";
import type { ArticleCategory } from "@/lib/articles/categories";
import {
  PUBLIC_PAGE_SIZE,
  TRENDING_DAYS,
  TRENDING_LIMIT,
} from "@/lib/articles/constants";

// 목록용 컬럼 — body 제외 (대역폭 절약), updated_at 제외 (공개에서 미사용)
const LIST_COLUMNS =
  "id, title, excerpt, category, cover_url, view_count, status, published_at, created_at";

// 상세용 컬럼 — excerpt/view_count/status/created_at/updated_at 제외 (상세에서 미사용)
const DETAIL_COLUMNS = "id, title, body, category, cover_url, published_at";

interface FetchPublishedOptions {
  page?: number;
  category?: ArticleCategory;
  limit?: number;
}

interface PaginatedResult {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchPublishedArticles({
  page = 1,
  category,
  limit = PUBLIC_PAGE_SIZE,
}: FetchPublishedOptions = {}): Promise<PaginatedResult> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("articles")
    .select(LIST_COLUMNS, { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, count, error } = await query;
  if (error) throw new Error(`목록 조회 실패: ${error.message}`);

  const total = count ?? 0;
  return {
    articles: (data ?? []) as Article[],
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function fetchTrendingArticles(): Promise<Article[]> {
  const { data, error } = await supabase.rpc("get_trending_articles", {
    days: TRENDING_DAYS,
    result_limit: TRENDING_LIMIT,
  });
  // 부가 데이터 — 실패해도 목록은 정상 표시되어야 하므로 fail-soft
  if (error) {
    console.error("trending 조회 실패:", error);
    return [];
  }
  return (data ?? []) as Article[];
}

export const fetchArticleById = cache(
  async (id: string): Promise<Article | null> => {
    const { data, error } = await supabase
      .from("articles")
      .select(DETAIL_COLUMNS)
      .eq("id", id)
      .eq("status", "published")
      .single();

    if (error || !data) return null;
    return data as Article;
  },
);
