import { upload } from "@vercel/blob/client";
import type { Article, PaginatedArticles } from "@/lib/articles/types";
import type { ArticleCategory } from "@/lib/articles/categories";
import type { ArticleStatus } from "@/lib/articles/status";
import { resizeToWebP } from "./utils";

// ============================================================
// 인증
// ============================================================
export async function login(id: string, password: string): Promise<boolean> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  return res.ok;
}

export async function logout(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST" });
}

// ============================================================
// Article CRUD
// ============================================================
export interface ArticleInput {
  title: string;
  body: string;
  category: ArticleCategory;
  status: ArticleStatus;
  cover_url: string | null;
}

export async function fetchArticles(page = 1): Promise<PaginatedArticles> {
  const res = await fetch(`/api/admin/articles?page=${page}`, { cache: "no-store" });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("FETCH_FAILED");
  return res.json();
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  const res = await fetch("/api/admin/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("CREATE_FAILED");
  return res.json();
}

export async function updateArticle(id: string, input: ArticleInput): Promise<Article> {
  const res = await fetch(`/api/admin/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("UPDATE_FAILED");
  return res.json();
}

export async function deleteArticle(id: string): Promise<void> {
  const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("DELETE_FAILED");
}

// ============================================================
// 이미지 업로드 (클라이언트 변환 → Blob)
// ============================================================
export async function uploadImage(file: File): Promise<string> {
  const webpBlob = await resizeToWebP(file);
  const folderId = `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now()}`;
  const webpFile = new File([webpBlob], `articles/${folderId}.webp`, { type: "image/webp" });

  const blob = await upload(webpFile.name, webpFile, {
    access: "public",
    handleUploadUrl: "/api/admin/blob",
  });
  return blob.url;
}

export async function deleteImages(urls: string[]): Promise<void> {
  if (urls.length === 0) return;
  await fetch("/api/admin/blob", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls }),
  }).catch(() => {});
}

// ============================================================
// 저장 시점: 본문/cover 안의 data URL을 Blob에 일괄 업로드 후 URL 치환
// ============================================================

const DATA_URL_RE = /src=["'](data:image\/[^"']+)["']/g;

function extractDataUrls(html: string): string[] {
  const urls: string[] = [];
  let m;
  while ((m = DATA_URL_RE.exec(html)) !== null) {
    urls.push(m[1]);
  }
  DATA_URL_RE.lastIndex = 0;
  return urls;
}

async function dataUrlToFile(dataUrl: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const folderId = `${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return new File([blob], `articles/${folderId}.webp`, { type: "image/webp" });
}

export async function processEmbeddedImages(
  body: string,
  cover: string | null,
  onProgress?: (current: number, total: number) => void
): Promise<{ body: string; cover: string | null }> {
  const bodyDataUrls = extractDataUrls(body);
  const coverIsData = cover?.startsWith("data:") ?? false;

  const unique = new Set<string>(bodyDataUrls);
  if (cover && coverIsData) unique.add(cover);

  if (unique.size === 0) return { body, cover };

  const replacements = new Map<string, string>();
  let i = 0;
  for (const dataUrl of unique) {
    onProgress?.(++i, unique.size);
    const file = await dataUrlToFile(dataUrl);
    const result = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/admin/blob",
    });
    replacements.set(dataUrl, result.url);
  }

  let newBody = body;
  replacements.forEach((blobUrl, dataUrl) => {
    newBody = newBody.split(dataUrl).join(blobUrl);
  });

  let newCover = cover;
  if (cover && coverIsData) {
    newCover = replacements.get(cover) ?? cover;
  }

  return { body: newBody, cover: newCover };
}
