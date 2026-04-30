"use client";

import { useState } from "react";
import { resizeToWebP, fileToDataUrl } from "../utils";

/**
 * 이미지 파일을 webp + 리사이즈 후 data URL로 변환하여 반환.
 * 실제 Blob 업로드는 저장 시점(ArticleForm.save)에 일괄 수행.
 */
export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File): Promise<string | null> {
    setError(null);
    setUploading(true);
    try {
      const webp = await resizeToWebP(file);
      const dataUrl = await fileToDataUrl(webp);
      return dataUrl;
    } catch (e) {
      console.error("이미지 처리 실패:", e);
      setError("이미지 처리에 실패했습니다");
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, error };
}
