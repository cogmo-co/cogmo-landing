"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageContext";
import { useLocalizedImage } from "@/lib/i18n/useLocalizedImage";
import { IMAGE_DIMENSIONS } from "@/lib/i18n/images";
import Reveal from "@/components/home/Reveal";

export default function Hero() {
  const t = useT();
  const dashboardSrc = useLocalizedImage("dashboard-home");
  const heroMobileSrc = useLocalizedImage("hero-mobile");
  const dashboardDims = IMAGE_DIMENSIONS["dashboard-home"];

  return (
    <section
      id="hero"
      className="scroll-mt-16 overflow-hidden border-b border-hairline bg-white pt-20 pb-16 md:pt-28"
    >
      {/* 히어로 카피는 LCP 후보라 모션에서 제외한다 — 원본 /download 페이지가 헤더를 제외하던
          것과 같은 규칙. 등장 연출은 아래 목업에만 건다. */}
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Assessment-based Customer Management
        </p>
        <h1 className="mt-6 text-4xl font-black leading-[1.2] tracking-tight text-ink md:text-6xl">
          <span>{t("hero.title.l1")}</span>
          <br />
          <span className="text-primary">{t("hero.title.l2")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl whitespace-normal text-base sm:whitespace-pre-line leading-relaxed text-body md:text-lg">
          {t("hero.subcopy")}
        </p>
        {/* id 는 StickyCta 가 관찰한다 — 이 버튼이 화면에서 사라진 뒤에야 하단 고정 CTA 가 올라온다. */}
        <div id="hero-cta" className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/download"
            className="rounded-lg bg-primary px-7 py-3.5 font-medium text-white transition hover:bg-primary-dark"
          >
            {t("hero.cta1")}
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-primary/30 bg-white px-7 py-3.5 font-medium text-primary transition hover:border-primary hover:bg-primary/5"
          >
            {t("hero.cta2")}
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted">{t("hero.tags")}</p>
      </div>

      {/* Dashboard Mockup: 실제 대시보드 + 폰 리포트 겹침 구성 */}
      <Reveal className="relative mx-auto mt-16 max-w-6xl px-6">
        <Image
          src={dashboardSrc}
          alt="안녕 고객관리 대시보드"
          width={dashboardDims.width}
          height={dashboardDims.height}
          priority
          className="mx-auto w-[86%] rounded-xl border border-hairline shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        />
        <div className="absolute right-[4%] top-1/2 hidden w-[24%] -translate-y-1/2 sm:block">
          <div className="relative aspect-[9/19] w-full rounded-[2rem] bg-ink p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
            <div className="relative h-full overflow-hidden rounded-[1.6rem] bg-white">
              <Image
                src={heroMobileSrc}
                alt="안녕 결과 리포트 앱 화면"
                fill
                priority
                sizes="24vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
