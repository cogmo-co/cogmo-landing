import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { del, list } from "@vercel/blob";
import { verifyToken, checkCsrf } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { sanitizeArticleHtml } from "@/lib/articles/sanitize";
import { extractExcerpt } from "@/lib/articles/excerpt";
import { validateArticleInput } from "@/lib/articles/validation";
import { diffBlobUrls } from "@/lib/articles/blob-urls";

// ============================================================
// PUT — 수정 (사라진 blob 이미지 정리)
// ============================================================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const input = await req.json();
    const validation = validateArticleInput(input);
    if (validation.error) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { title, body, category, status, cover_url } = input;
    const safeBody = sanitizeArticleHtml(body);
    const excerpt = extractExcerpt(safeBody);

    const { data: existing } = await supabase
      .from("articles")
      .select("status, published_at, body, cover_url")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "article 없음" }, { status: 404 });
    }

    let publishedAt = existing.published_at;
    if (status === "published" && existing.status !== "published") {
      publishedAt = new Date().toISOString();
    } else if (status === "draft") {
      publishedAt = null;
    }

    const { data, error } = await supabase
      .from("articles")
      .update({
        title,
        body: safeBody,
        excerpt,
        category,
        status,
        cover_url: cover_url || null,
        published_at: publishedAt,
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "수정 실패" }, { status: 500 });
    }

    const removedUrls = diffBlobUrls(
      existing.body,
      safeBody,
      existing.cover_url,
      cover_url || null
    );
    if (removedUrls.length > 0) {
      await del(removedUrls).catch(() => {});
    }

    revalidatePath("/articles");
    revalidatePath(`/articles/${id}`);
    return NextResponse.json(data);
  } catch (e) {
    console.error("article 수정 실패:", e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// ============================================================
// DELETE — 삭제 (본문/cover의 blob 이미지 함께 정리)
// ============================================================
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("id")
    .eq("id", id)
    .single();

  if (!article) {
    return NextResponse.json({ error: "article 없음" }, { status: 404 });
  }

  // 글 폴더 통째로 정리 (본문에서 제거됐던 이미지/cover 포함 모두 삭제)
  try {
    const { blobs } = await list({ prefix: `articles/${id}/` });
    if (blobs.length > 0) {
      await del(blobs.map((b) => b.url));
    }
  } catch (e) {
    console.error("blob 폴더 삭제 실패:", e);
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }

  revalidatePath("/articles");
  return NextResponse.json({ ok: true });
}
