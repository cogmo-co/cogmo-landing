import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyToken, checkCsrf } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { ADMIN_PAGE_SIZE } from "@/lib/articles/constants";
import { sanitizeArticleHtml } from "@/lib/articles/sanitize";
import { extractExcerpt } from "@/lib/articles/excerpt";
import { validateArticleInput } from "@/lib/articles/validation";

// ============================================================
// GET — 목록 (페이징, draft 포함, admin 전용)
// ============================================================
export async function GET(req: Request) {
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = ADMIN_PAGE_SIZE;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("articles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: "목록 조회 실패" }, { status: 500 });
  }
  return NextResponse.json({ articles: data, total: count, page, limit });
}

// ============================================================
// POST — 생성
// ============================================================
export async function POST(req: Request) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  try {
    const input = await req.json();
    const validation = validateArticleInput(input);
    if (validation.error) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { id, title, body, category, status, cover_url } = input;
    const safeBody = sanitizeArticleHtml(body);
    const excerpt = extractExcerpt(safeBody);
    const publishedAt = status === "published" ? new Date().toISOString() : null;

    const { data, error } = await supabase
      .from("articles")
      .insert({
        ...(id && { id }),
        title,
        body: safeBody,
        excerpt,
        category,
        status,
        cover_url: cover_url || null,
        published_at: publishedAt,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "저장 실패" }, { status: 500 });
    }

    revalidatePath("/articles");
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error("article 생성 실패:", e);
    return NextResponse.json({ error: "생성 실패" }, { status: 500 });
  }
}
