import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BOT_PATTERN =
  /bot|crawler|spider|googlebot|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit/i;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // UA 봇 차단
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_PATTERN.test(ua)) {
    return NextResponse.json({ ok: true, skipped: "bot" });
  }

  // published article만 트래킹 (잘못된 ID로 row 추가 방지)
  const { data: article } = await supabase
    .from("articles")
    .select("id")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (!article) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // INSERT + UPDATE를 단일 RPC로 (원자성 + 라운드트립 1회)
  const { error } = await supabase.rpc("track_article_view", {
    article_uuid: id,
  });

  if (error) {
    console.error("view 트래킹 실패:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
