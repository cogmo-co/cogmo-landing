"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";

/**
 * 카드 헤더(아이콘 + 제목 + 셰브런) 전체가 상세 페이지로 가는 클릭 영역이다.
 * 셰브런만 링크로 두면 손가락만 한 과녁이라 눌리지 않는다.
 *
 * 카드 3(근골격계 기능 평가)은 대응하는 단독 페이지가 없어 href 가 없고, 그때는 링크가
 * 아니라 평범한 div 로 렌더한다 — 눌리지 않는 걸 눌리는 것처럼 보이게 두지 않는다.
 *
 * aria-label 은 제목 + "자세히 보기". 카드가 셋인데 셰브런에 글자가 없어서, 이름이 없거나
 * 전부 같으면 스크린리더에서 어느 링크인지 구분되지 않는다. 링크가 향하는 /service-hi,
 * /service-fea 는 한국어 전용이라 "자세히 보기"는 사전을 거치지 않고 한국어로 고정한다 —
 * 번역하면 클릭한 순간 언어가 뒤바뀐다.
 *
 * -m-2 p-2 는 레이아웃을 그대로 두면서 과녁과 호버 면만 바깥으로 넓히는 장치다.
 */
function CardHeader({ icon, title, href }: { icon: string; title: string; href?: string }) {
  const inner = (
    <>
      <Image
        src={icon}
        alt=""
        width={128}
        height={128}
        className="h-14 w-14 flex-none object-contain"
      />
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      {href ? (
        <svg
          className="ml-auto h-5 w-5 flex-none text-primary transition group-hover:translate-x-0.5"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="m8 5 5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  );

  if (!href) return <div className="flex items-center gap-4">{inner}</div>;

  return (
    <Link
      href={href}
      aria-label={`${title} 자세히 보기`}
      className="group -m-2 flex items-center gap-4 rounded-xl p-2 transition hover:bg-surface"
    >
      {inner}
    </Link>
  );
}

export default function Assessment() {
  const t = useT();

  return (
    <section id="assessment" className="scroll-mt-16 border-b border-hairline bg-white py-24">
      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Assessment</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("assessment.title.l1")}</span>
            {/* 좁은 화면에서만 끊는다 — 없으면 "함께 봐야 / 보입니다." 로 구가 갈린다 */}
            <br className="md:hidden" />{" "}
            <span className="text-primary">{t("assessment.title.l2")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-body">
            {t("assessment.subcopy")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Card 1: 인지기능 평가 */}
          <div className="rounded-2xl border border-hairline bg-white p-8 transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <CardHeader
              icon="/images/landing/etc/a-cognitive.png"
              title={t("assessment.card1.title")}
              href="/service-hi"
            />
            <p className="mt-6 text-sm leading-relaxed text-body">{t("assessment.card1.desc")}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-1.5 rounded-xl bg-surface px-4 py-3.5 text-sm text-body">
              {(["item1", "item2", "item3", "item4", "item5", "item6"] as const).map((k) => (
                <li key={k}>· {t(`assessment.card1.${k}`)}</li>
              ))}
            </ul>
          </div>

          {/* Card 2: 기능운동검사 FEA — 5개 영역명은 브랜드 고유 영문 표기로 언어 무관 고정 */}
          <div className="rounded-2xl border border-hairline bg-white p-8 transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <CardHeader
              icon="/images/landing/etc/a-physical.png"
              title={t("assessment.card2.title")}
              href="/service-fea"
            />
            <p className="mt-6 text-sm leading-relaxed text-body">{t("assessment.card2.desc")}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-1.5 rounded-xl bg-surface px-4 py-3.5 text-sm text-body">
              <li>· Core &amp; Balance</li>
              <li>· Thoracic</li>
              <li>· Hip</li>
              <li>· Shoulder</li>
              <li>· Lower Limb</li>
            </ul>
          </div>

          {/* Card 3: 근골격계 기능 평가 */}
          <div className="rounded-2xl border border-hairline bg-white p-8 transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <CardHeader
              icon="/images/landing/etc/a-musculoskeletal.png"
              title={t("assessment.card3.title")}
            />
            <p className="mt-6 text-sm leading-relaxed text-body">{t("assessment.card3.desc")}</p>
            <ul className="mt-5 space-y-1.5 rounded-xl bg-surface px-4 py-3.5 text-sm text-body">
              {(["item1", "item2", "item3"] as const).map((k) => (
                <li key={k}>· {t(`assessment.card3.${k}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
