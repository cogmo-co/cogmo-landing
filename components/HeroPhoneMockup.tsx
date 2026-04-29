"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * 메인 히어로 폰 목업
 * - fade-up 진입 모션 (2.8s + 200ms 지연 → 약 3s 후 settle)
 * - fade-up이 끝나기 직전(약 1.4s)에 룰렛을 시작해 자연스럽게 이어지게 함
 * - 이미지 위에 흰색 박스로 원본 "72점" 영역을 덮고, 그 위에 카운터 렌더링
 */
export default function HeroPhoneMockup() {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // fade-up이 끝나기 전(약 1.4s 시점)에 룰렛을 시작해 자연스럽게 이어붙임
    const startDelay = setTimeout(() => {
      const duration = 2000; // 2초 룰렛
      const target = 72;
      const start = performance.now();
      let lastUpdate = 0;
      let frameId = 0;

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        // 슬롯머신 업데이트 간격: 처음엔 매우 빠르게(~17ms), 끝으로 갈수록 느리게(최대 ~83ms)
        const interval = 17 + progress * progress * 66;

        if (now - lastUpdate >= interval) {
          lastUpdate = now;
          if (progress < 0.92) {
            // 빠르게 무작위 2자리 숫자 굴림
            setCount(Math.floor(Math.random() * 100));
          } else {
            // 마지막 8% — 정답에 근접한 작은 진동 후 고정
            const jitter = Math.floor((1 - progress) * 50);
            const offset = Math.floor(Math.random() * (jitter + 1));
            const sign = Math.random() < 0.5 ? -1 : 1;
            setCount(Math.max(0, Math.min(99, target + sign * offset)));
          }
        }

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          setCount(target);
        }
      };

      frameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frameId);
    }, 1400);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="mx-auto mt-16 aspect-[9/17] w-72 animate-fade-up overflow-hidden md:w-80">
      <div className="relative aspect-[9/19] w-full rounded-[2.5rem] bg-ink p-1 shadow-[0_40px_80px_rgba(50,81,49,0.25)]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
        {/* Screen with image */}
        <div className="relative h-full overflow-hidden rounded-[2.25rem] bg-white">
          <Image
            src="/images/main/hero.jpg"
            alt="안녕 앱 — 인지건강 모니터링 목업"
            fill
            priority
            sizes="(max-width: 768px) 288px, 320px"
            className="object-cover object-top"
          />
          {/* 슬롯머신 카운터 오버레이 — 원본 이미지의 "72점" 위치를 흰색 박스로 덮고 카운터 렌더 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex items-baseline justify-center bg-white px-3 py-1"
            style={{ top: "20%" }}
          >
            <span className="font-black text-ink tabular-nums leading-none text-[40px] md:text-[44px]">
              {count}
            </span>
            <span className="ml-1 font-bold text-ink leading-none text-[16px] md:text-[18px]">
              점
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
