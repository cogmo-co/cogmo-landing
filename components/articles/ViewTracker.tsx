"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
  articleId: string;
}

export default function ViewTracker({ articleId }: ViewTrackerProps) {
  useEffect(() => {
    // KST 기준 YYYY-MM-DD (en-CA = ISO 8601 포맷 트릭)
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Seoul",
    });
    const key = `viewed_${articleId}_${today}`;

    if (localStorage.getItem(key)) return;

    // 한 번 시도하면 성공/실패 무관 저장 (서버 장애 시 재시도 폭주 방지)
    localStorage.setItem(key, "1");
    fetch(`/api/articles/${articleId}/view`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {
      // best-effort: 트래킹 실패해도 페이지 영향 없음
    });
  }, [articleId]);

  return null;
}
