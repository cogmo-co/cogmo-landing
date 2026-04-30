import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PUBLIC_PAGE_SIZE } from "@/lib/articles/constants";
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from "@/lib/articles/categories";

// ============================================================
// GET — 공개 목록 (status='published'만, 분류 필터 가능)
// ============================================================
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const categoryParam = searchParams.get("category");
  const limit = PUBLIC_PAGE_SIZE;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("articles")
    .select("id, title, category, cover_url, published_at", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);

  if (categoryParam && ARTICLE_CATEGORIES.includes(categoryParam as ArticleCategory)) {
    query = query.eq("category", categoryParam);
  }

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
  return NextResponse.json({ articles: data, total: count, page, limit });
}
