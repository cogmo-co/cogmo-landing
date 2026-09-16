"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/LanguageContext";
import { useLocalizedImage } from "@/lib/i18n/useLocalizedImage";
import { IMAGE_DIMENSIONS } from "@/lib/i18n/images";
import Reveal from "@/components/home/Reveal";

export default function Report() {
  const t = useT();
  const cognitiveSrc = useLocalizedImage("report-cognitive");
  const radarSrc = useLocalizedImage("report-physical-radar");
  const trendSrc = useLocalizedImage("report-trend");
  const dims = IMAGE_DIMENSIONS["report-cognitive"];

  // 지면은 이 사이트 고유의 브랜드 밴드(surface-annyeong: 그린 그라디언트 + sheen + 그레인).
  // 페이지 중반에 색 무게를 하나 심어 흰/연회색 교대가 길게 이어지는 걸 끊는 자리임.
  // ::before/::after 가 z-0 에 깔리므로 본문에 relative z-10 이 필요하다.
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

        {/* 1열에서 곧장 3열로 가면 640~1023px 구간이 통째로 1열이라 카드 하나가
            지면 폭을 다 먹는다. 700px 대에서 삽화가 500px 넘게 커지던 게 그 때문.
            sm 에서 2열, md 부터 3열 — Assessment·Pricing 과 같은 단계. */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <Image
            src={cognitiveSrc}
            alt={t("report.img1_alt")}
            width={dims.width}
            height={dims.height}
            className="w-full rounded-xl border border-hairline shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          />
          <Image
            src={radarSrc}
            alt={t("report.img2_alt")}
            width={dims.width}
            height={dims.height}
            className="w-full rounded-xl border border-hairline shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          />
          <Image
            src={trendSrc}
            alt={t("report.img3_alt")}
            width={dims.width}
            height={dims.height}
            className="w-full rounded-xl border border-hairline shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          />
        </div>

        <p className="mt-14 text-center text-xl font-bold leading-relaxed text-ink">
          <span>{t("report.closing.l1")}</span>
          <br />
          <span className="text-primary">{t("report.closing.l2")}</span>
        </p>
      </Reveal>
    </section>
  );
}
