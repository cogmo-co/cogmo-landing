"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useT } from "@/lib/i18n/LanguageContext";
import { useLocalizedImage } from "@/lib/i18n/useLocalizedImage";
import { IMAGE_DIMENSIONS } from "@/lib/i18n/images";
import Reveal from "@/components/home/Reveal";

/** 좌우 이동 버튼. 끝에 닿으면 비활성 — 순환시키면 지금이 몇 번째인지 감각이 사라진다. */
function ArrowButton({
  dir,
  onClick,
  disabled,
  label,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-hairline bg-white text-ink transition disabled:opacity-30"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path
          d={dir === "prev" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/**
 * 리포트 3장 — 모바일은 캐러셀, sm 부터는 그리드.
 *
 * 세로로 쌓으면 한 장이 화면을 거의 채워서 스크롤만 길어지고 세 장을 견줄 수가 없다.
 * 캐러셀로 두면 엄지로 넘기며 비교하게 된다.
 *
 * 라이브러리를 쓰지 않는 이유: 필요한 건 "한 장씩 물리는 가로 스크롤 + 현재 위치 표시"
 * 뿐인데, 그건 CSS scroll-snap 이 이미 해준다(모바일 관성 스크롤도 브라우저 것이 제일 낫다).
 * JS 는 스크롤 위치를 도트에 비추고, 도트를 누르면 그 장으로 보내는 일만 한다.
 *
 * sm 이상에서는 display 가 grid 로 바뀌어 가로 스크롤 자체가 사라지므로,
 * 스크롤 리스너는 놀고 도트는 sm:hidden 으로 숨는다 — 분기 없이 같은 마크업으로 둘 다 된다.
 */
function ReportCarousel({ cards }: { cards: { src: string; alt: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // 현재 장 = 뷰포트 가운데에 가장 가까운 카드. 스냅이 끝나기 전에도 값이 따라오도록
  // scroll 마다 계산하되, rAF 로 프레임당 한 번으로 묶는다.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let min = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
          if (d < min) {
            min = d;
            nearest = i;
          }
        });
        setCurrent(nearest);
      });
    };

    track.addEventListener("scroll", sync, { passive: true });
    return () => {
      track.removeEventListener("scroll", sync);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[i] as HTMLElement | undefined;
    if (!el) return;
    // snap-center 와 같은 자리로 보낸다 — scrollIntoView 는 페이지까지 세로로 움직일 수 있어 쓰지 않는다.
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* -mx-6 는 부모(Reveal)의 px-6 을 상쇄해 카드가 화면 끝까지 흐르게 하는 것.
          카드 폭 85% 로 다음 장을 살짝 보이게 한다 — 도트만으로는 "넘길 수 있다"가
          손에 먼저 오지 않는다. */}
      <div
        ref={trackRef}
        className="-mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-8 sm:overflow-x-visible sm:px-0 sm:pb-0 md:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <Image
            key={card.src}
            src={card.src}
            alt={card.alt}
            width={IMAGE_DIMENSIONS["report-cognitive"].width}
            height={IMAGE_DIMENSIONS["report-cognitive"].height}
            className="w-[85%] flex-none snap-center rounded-xl border border-hairline shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:w-full"
          />
        ))}
      </div>

      {/* 조작부는 캐러셀일 때만. sm 부터는 세 장이 한눈에 다 보여 표시할 자리가 없다.
          화살표를 카드 위에 겹치지 않고 도트와 한 줄에 두는 이유: 리포트는 읽는 이미지라
          모서리를 가리면 안 되고, 조작 수단이 한 곳에 모여야 손이 헤매지 않는다. */}
      <div className="mt-5 flex items-center justify-center gap-4 sm:hidden">
        <ArrowButton
          dir="prev"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          label={`${current} / ${cards.length}`}
        />
        <div className="flex gap-2">
          {cards.map((card, i) => (
            <button
              key={card.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${cards.length}`}
              aria-current={i === current}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === current ? "w-6 bg-primary" : "w-2 bg-hairline"
              }`}
            />
          ))}
        </div>
        <ArrowButton
          dir="next"
          onClick={() => goTo(current + 1)}
          disabled={current === cards.length - 1}
          label={`${current + 2} / ${cards.length}`}
        />
      </div>
    </>
  );
}

// 지면은 이 사이트 고유의 브랜드 밴드(surface-annyeong: 그린 그라디언트 + sheen + 그레인).
// 페이지 중반에 색 무게를 하나 심어 흰/연회색 교대가 길게 이어지는 걸 끊는 자리임.
// ::before/::after 가 z-0 에 깔리므로 본문에 relative z-10 이 필요하다.
export default function Report() {
  const t = useT();
  const cognitiveSrc = useLocalizedImage("report-cognitive");
  const radarSrc = useLocalizedImage("report-physical-radar");
  const trendSrc = useLocalizedImage("report-trend");
  const cards = [
    { src: cognitiveSrc, alt: t("report.img1_alt") },
    { src: radarSrc, alt: t("report.img2_alt") },
    { src: trendSrc, alt: t("report.img3_alt") },
  ];

  return (
    <section
      id="report"
      className="surface-annyeong scroll-mt-16 border-b border-hairline py-24"
    >
      <Reveal className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Report</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("report.title.l1")}</span>
            <br />
            <span className="text-primary">{t("report.title.l2")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-body">
            {t("report.subcopy")}
          </p>
        </div>

        <ReportCarousel cards={cards} />

        <p className="mt-14 text-center text-xl font-bold leading-relaxed text-ink">
          <span>{t("report.closing.l1")}</span>
          <br />
          <span className="text-primary">{t("report.closing.l2")}</span>
        </p>
      </Reveal>
    </section>
  );
}
