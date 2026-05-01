"use client";

import { useEffect, useMemo, useState } from "react";
import type { Article } from "@/lib/articles/types";
import type { ArticleCategory } from "@/lib/articles/categories";
import { ARTICLE_CATEGORIES } from "@/lib/articles/categories";
import * as api from "../services";
import TitleField from "./TitleField";
import CategorySelect from "./CategorySelect";
import CoverImageField from "./CoverImageField";
import SubmitBar from "./SubmitBar";
import DualEditor from "../editor/DualEditor";

interface ArticleFormProps {
  initialArticle: Article | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ArticleForm({
  initialArticle,
  onSaved,
  onCancel,
}: ArticleFormProps) {
  // 신규: 클라가 UUID 발급 → blob 폴더(articles/{id}/) + DB INSERT 모두 같은 id 사용
  const articleId = useMemo(
    () => initialArticle?.id ?? crypto.randomUUID(),
    [initialArticle],
  );

  const [title, setTitle] = useState(initialArticle?.title ?? "");
  const [body, setBody] = useState(initialArticle?.body ?? "");
  const [category, setCategory] = useState<ArticleCategory>(
    initialArticle?.category ?? ARTICLE_CATEGORIES[0]
  );
  const [coverUrl, setCoverUrl] = useState<string | null>(
    initialArticle?.cover_url ?? null
  );
  const [saving, setSaving] = useState(false);
  const [savingMsg, setSavingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 작성/편집 중 변경 여부
  const initialTitle = initialArticle?.title ?? "";
  const initialBody = initialArticle?.body ?? "";
  const initialCategory = initialArticle?.category ?? ARTICLE_CATEGORIES[0];
  const initialCover = initialArticle?.cover_url ?? null;

  const isDirty =
    title !== initialTitle ||
    body !== initialBody ||
    category !== initialCategory ||
    coverUrl !== initialCover;

  // 브라우저 새로고침/탭 닫기 시 경고
  useEffect(() => {
    if (!isDirty || saving) return;
    function handler(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, saving]);

  function handleCancel() {
    if (isDirty && !confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
      return;
    }
    onCancel();
  }

  const isEdit = !!initialArticle;
  const heading = isEdit ? "EDIT" : "WRITE";

  async function save() {
    setError(null);

    if (!title.trim()) {
      setError("제목을 입력해주세요");
      return;
    }

    setSaving(true);
    try {
      // 1. 본문/cover 안의 data URL을 Blob에 일괄 업로드 (articles/{articleId}/ 폴더로)
      const { body: finalBody, cover: finalCover } = await api.processEmbeddedImages(
        body,
        coverUrl,
        articleId,
        (cur, total) => setSavingMsg(`이미지 업로드 중 (${cur}/${total})...`)
      );

      // 다음 저장 시 재업로드 방지
      if (finalBody !== body) setBody(finalBody);
      if (finalCover !== coverUrl) setCoverUrl(finalCover);

      // 2. 게시 — 신규는 항상 공개로 저장, 수정은 기존 상태 유지
      setSavingMsg("저장 중...");
      const input = {
        title: title.trim(),
        body: finalBody,
        category,
        status: initialArticle?.status ?? ("published" as const),
        cover_url: finalCover,
      };

      if (initialArticle) {
        await api.updateArticle(initialArticle.id, input);
      } else {
        await api.createArticle({ id: articleId, ...input });
      }
      onSaved();
    } catch {
      setError("저장에 실패했습니다");
    } finally {
      setSaving(false);
      setSavingMsg("");
    }
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-2xl border border-hairline bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          {/* Bookmark-shape heading — 카드 안 우상단, 좌측 V자 컷(카드 내부를 향함) */}
          <div
            className="absolute right-10 top-0 z-10 -translate-y-1/2 whitespace-nowrap bg-primary py-3 pl-7 pr-5 text-base font-extrabold tracking-[0.15em] text-white shadow-[0_6px_16px_rgba(50,81,49,0.25)]"
            style={{
              clipPath:
                "polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)",
            }}
          >
            {heading}
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-48 flex-none">
                <CategorySelect value={category} onChange={setCategory} />
              </div>
              <div className="flex-1">
                <TitleField value={title} onChange={setTitle} />
              </div>
            </div>

            <CoverImageField value={coverUrl} onChange={setCoverUrl} />

            <div className="pt-3">
              <label className="mb-2 block text-sm font-semibold text-ink">
                본문 <span className="text-primary">*</span>
              </label>
              <DualEditor value={body} onChange={setBody} />
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {savingMsg && (
              <p className="rounded-md border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
                {savingMsg}
              </p>
            )}
          </div>

          <div className="mt-10">
            <SubmitBar saving={saving} onSave={save} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
}
