import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { verifyToken, checkCsrf } from "@/lib/auth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
} from "@/lib/articles/constants";

// ============================================================
// POST — 업로드 토큰 발급
// ============================================================
export async function POST(req: Request) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...ALLOWED_IMAGE_TYPES],
        maximumSizeInBytes: MAX_IMAGE_SIZE_MB * 1024 * 1024,
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 400 }
    );
  }
}

// ============================================================
// DELETE — 이미지 삭제 (urls 배열로 일괄)
// ============================================================
export async function DELETE(req: Request) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }
  if (!(await verifyToken())) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }

  try {
    const { urls } = await req.json();
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls 배열 필요" }, { status: 400 });
    }
    await del(urls);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("blob 삭제 실패:", e);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
