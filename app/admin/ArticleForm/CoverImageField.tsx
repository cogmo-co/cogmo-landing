"use client";

import { useRef } from "react";
import { useImageUpload } from "../editor/useImageUpload";

interface CoverImageFieldProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function CoverImageField({
  value,
  onChange,
}: CoverImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, error } = useImageUpload();

  async function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) onChange(url);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink">
        대표 이미지
        <span className="ml-2 text-xs font-normal text-muted">
          (목록·OG 태그용, 선택)
        </span>
      </label>

      {value ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="h-24 w-24 flex-none rounded-lg border border-hairline object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-md border border-hairline bg-white px-3 py-1.5 text-[13px] text-body transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            제거
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-hairline bg-surface text-sm text-muted transition hover:border-primary hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "처리 중..." : "+ 이미지 선택"}
        </button>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleSelect}
        className="hidden"
      />
    </div>
  );
}
