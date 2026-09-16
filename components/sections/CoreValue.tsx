"use client";

import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";

const STEP_NUMBERS = [1, 2, 3, 4, 5] as const;

/**
 * 5단계를 사각 순환도로 그린다.
 *
 * 순환이 01 이 아니라 02 로 돌아가는 건 첫 평가가 한 번뿐인 진입 단계이기 때문이다.
 * 그래서 01 만 고리 밖에 두고 선으로 들여보낸다. 이후로는 설명 → 계획 → 관리 → 재평가
 * 네 단계가 시계방향으로 돈다.
 *
 *   ●───▶───●━━━━━━▶━━━━━━━●
 *   ┌─────┐ ┌─────┐   ┃   ┌─────┐
 *   │평가  │ │설명  │   ┃   │계획  │
 *   └─────┘ └─────┘   ┃   └─────┘
 *            ▲        ▼
 *            ●━━━◀━━━━●
 *            ┌─────┐  ┌─────┐
 *            │재평가│  │관리  │
 *            └─────┘  └─────┘
 *
 * 각 단계는 카드로 묶고 번호 노드를 카드의 좌상단 꼭짓점에 걸친다(-18px = h-9 의 절반).
 * 흐름선은 노드 중심 높이로 지나가므로 카드 테두리와 겹치는 구간이 생기는데, 선을 z-10 로
 * 올려 그 구간에서는 짙은 선이 이기게 한다 — 카드 테두리는 1px/연한 초록, 선은 2px/원색.
 *
 * 좌표를 하나도 박아넣지 않은 게 요점이다. 3열 2행 그리드에서 고리 사각형은 정확히
 * "②가 들어있는 칸의 경계상자" 라서, 네 꼭짓점이 ②③⑤④ 카드의 좌상단과 자동으로 일치한다.
 * 카드 높이는 각자 내용에 맡긴다 — h-full 로 행을 맞추면 한 카드가 길어질 때 같은 줄의
 * 나머지 카드까지 끌려 늘어난다. 고리는 칸 경계상자라 카드 높이와 무관하게 유지된다.
 */
export default function CoreValue() {
  const t = useT();

  const badge = (n: number) => (
    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
      {n}
    </span>
  );

  // 카드 + 좌상단 꼭짓점에 걸친 노드. pt-9 는 노드가 카드 안으로 18px 내려온 만큼 비운 자리.
  const card = (n: number) => (
    <>
      <span className="absolute -left-[18px] -top-[18px] z-20">{badge(n)}</span>
      <div className="w-60 border border-primary/25 bg-[#F5FFFB] px-4 pb-4 pt-7">
        <h3 className="text-lg font-bold text-ink">
          {t(`core.step${n}.title`)}
          <span className="ml-1.5 text-sm font-medium text-muted">· {t(`core.step${n}.alt`)}</span>
        </h3>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-body">
          {t(`core.step${n}.desc`)}
        </p>
      </div>
    </>
  );

  // 진행 방향 — 변의 중간에 접선 방향 삼각형. 기본형은 위를 가리킨다.
  const tick = (pos: string) => (
    <svg
      key={pos}
      viewBox="0 0 10 10"
      className={`absolute z-10 h-2.5 w-2.5 text-primary ${pos}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M5 0 10 10H0z" />
    </svg>
  );

  return (
    <section id="core-value" className="scroll-mt-16 border-b border-hairline bg-white py-24">
      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Core Value</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("core.title.l1")}</span>
            <br className="md:hidden" /> <span className="text-primary">{t("core.title.l2")}</span>
          </h2>
        </div>

        {/* 넓은 화면 — 사각 순환도. pt 는 노드가 위로 튀어나온 18px 자리.
            도형이 17+22+15rem = 54rem 를 쓰므로 md(768) 에서는 가로가 넘친다 → lg 기준. */}
        <ol className="mx-auto mt-14 hidden w-fit grid-cols-[16.5rem_18rem_auto] pt-[18px] lg:grid">
          {/* 01 — 고리 밖 진입 */}
          <li className="relative col-start-1 row-start-1 pb-20">
            <div className="absolute inset-x-0 top-0 z-10 h-0.5 -translate-y-px bg-primary" aria-hidden />
            {tick("left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-90")}
            <span className="cv-dot cv-dot-e" aria-hidden />
            {card(1)}
          </li>

          {/* 02 — 이 칸의 경계상자가 곧 사각 고리다 */}
          <li className="relative col-start-2 row-start-1 pb-20">
            <div className="absolute -inset-px z-10 border-2 border-primary" aria-hidden />
            {tick("left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-90")}
            {tick("right-0 top-[72%] translate-x-1/2 -translate-y-1/2 rotate-180")}
            {tick("left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 -rotate-90")}
            {tick("left-0 top-[72%] -translate-x-1/2 -translate-y-1/2")}
            {/* 빛 한 점이 시계방향으로 한 변씩 릴레이한다 (globals.css) */}
            <span className="cv-dot cv-dot-t" aria-hidden />
            <span className="cv-dot cv-dot-r" aria-hidden />
            <span className="cv-dot cv-dot-b" aria-hidden />
            <span className="cv-dot cv-dot-l" aria-hidden />
            {card(2)}
          </li>

          <li className="relative col-start-3 row-start-1 pb-20">{card(3)}</li>
          <li className="relative col-start-3 row-start-2">{card(4)}</li>
          <li className="relative col-start-2 row-start-2">{card(5)}</li>
        </ol>

        {/* 좁은 화면 — 세로 타임라인. 고리는 성립하지 않아 아래 문구가 대신한다 */}
        <div className="relative mt-10 lg:hidden">
          <div className="absolute bottom-4 left-[18px] top-4 w-0.5 bg-primary/25" />
          <ol className="space-y-6">
            {STEP_NUMBERS.map((n) => (
              <li key={n} className="relative flex gap-4">
                {badge(n)}
                <div className="pt-1">
                  <h3 className="text-base font-bold text-ink">
                    {t(`core.step${n}.title`)}
                    <span className="ml-1.5 text-sm font-medium text-muted">
                      · {t(`core.step${n}.alt`)}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-body">
                    {t(`core.step${n}.desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-primary lg:hidden">
          {t("core.cycle")}
        </p>
      </Reveal>
    </section>
  );
}
