"use client";

import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";
import AnnyeongLogo from "@/components/AnnyeongLogo";

export default function SocialProof() {
  const t = useT();

  return (
    <section className="border-b border-hairline bg-surface py-16">
      <Reveal className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t("social.eyebrow")}
        </p>
        {/* 워드마크는 Nav 와 같은 인라인 SVG(currentColor). 숫자 카드가 브랜드 이름 없이
            지표만 늘어놓고 있어서, 이 실적이 누구 것인지 여기서 한 번 박아둔다.
            aria-hidden 은 아니다 — 문단 안의 이미지가 아니라 브랜드 표기라 이름이 필요하다. */}
        <div className="mt-6 flex justify-center">
          <AnnyeongLogo className="h-14 w-auto text-primary md:h-16" />
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-6 rounded-2xl bg-white px-6 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:grid-cols-4">
          <div className="text-center">
            <dt className="text-lg font-black text-primary md:text-xl">{t("social.univ_name")}</dt>
            <dd className="mt-2 text-sm text-body">{t("social.univ_label")}</dd>
          </div>
          <div className="text-center">
            <dt className="text-3xl font-black text-primary md:text-4xl">3</dt>
            <dd className="mt-2 text-sm text-body">{t("social.poc_label")}</dd>
          </div>
          <div className="text-center">
            <dt className="text-3xl font-black text-primary md:text-4xl">3,000+</dt>
            <dd className="mt-2 text-sm text-body">{t("social.participants_label")}</dd>
          </div>
          <div className="text-center">
            <dt className="text-3xl font-black text-primary md:text-4xl">2,300+</dt>
            <dd className="mt-2 text-sm text-body">{t("social.tests_label")}</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
