import type { CSSProperties, ReactNode } from "react";

/**
 * 블록 단위 등장 래퍼.
 *
 * globals.css 에 이미 있는 사이트 고유 장치(`reveal` 키프레임 + `.seq-item` 스태거)를 그대로 쓴다.
 * 순수 CSS 라 서버 렌더 HTML 만으로 완결되고, JS 가 실행되지 않아도 콘텐츠가 보인다 —
 * 이전 IntersectionObserver 방식은 클라이언트 컴포넌트라 초기 HTML 이 opacity-0 이었고,
 * 하이드레이션이 실패하면 섹션이 통째로 안 보이는 위험이 있었다.
 *
 * 대신 스크롤 시점이 아니라 **로드 시점**에 재생된다. 접힌 곳 아래 섹션은 스크롤해서 도달할 때쯤
 * 이미 재생이 끝나 그냥 보이는 상태가 되는데, 이는 원본 페이지들이 쓰던 방식과 동일하다.
 *
 * `step` 은 한 섹션 안에서 여러 블록을 차례로 등장시킬 때만 쓴다(0, 1, 2…).
 */
export default function Reveal({
  children,
  className = "",
  step = 0,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  return (
    <div
      className={`seq-item motion-safe:animate-reveal ${className}`}
      style={{ "--i": step } as CSSProperties}
    >
      {children}
    </div>
  );
}
