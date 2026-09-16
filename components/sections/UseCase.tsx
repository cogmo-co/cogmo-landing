"use client";

import Image from "next/image";
import { countKeys } from "@/lib/i18n/dictionary";
import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";

/**
 * 단계 수를 컴포넌트에 박아두지 않고 사전에서 센다. 예전에는 5/6/5 가 상수로 있어서
 * 사전에서 단계를 더하거나 빼면 화면이 조용히 어긋났다.
 */
const CARDS = [1, 2, 3].map((n) => ({
  n,
  flowCount: countKeys(`usecase.card${n}.flow`),
}));

const IMAGES: Record<number, string> = {
  1: "/images/landing/generated/usecase-rehab-center.jpg",
  2: "/images/landing/generated/usecase-training-center.jpg",
  3: "/images/landing/generated/usecase-solo-professional.jpg",
};

export default function UseCase() {
  const t = useT();

  return (
    <section id="use-case" className="scroll-mt-16 border-b border-hairline bg-surface py-24">
      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Use Case</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("usecase.title.l1")}</span>
            <br className="md:hidden" /> <span className="text-primary">{t("usecase.title.l2")}</span>
          </h2>
        </div>

        {/* 세 사용 사례는 동등하다 — 한 장만 강조하던 초록 테두리·글로우는 뺐다.
            어느 쪽을 권하는지는 Pricing 의 "방문재활·트레이닝센터 추천" 배지가 이미 말한다. */}
        {/* 1열에서 곧장 3열로 가면 640~1023px 구간이 통째로 1열이라 카드 하나가
            지면 폭을 다 먹는다. 700px 대에서 삽화가 500px 넘게 커지던 게 그 때문.
            sm 에서 2열, md 부터 3열 — Assessment·Pricing 과 같은 단계. */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.n}
              className="overflow-hidden rounded-2xl border border-hairline bg-white"
            >
              {/* 표시 영역을 원본 비율(1200x896)로 잡아 잘리는 부분을 없앤다.
                  고정 높이(h-44)로 두면 2.18:1 이 되어 세로 39% 가 날아갔다. */}
              <Image
                src={IMAGES[card.n]}
                alt={t(`usecase.card${card.n}.title`)}
                width={1200}
                height={896}
                className="aspect-[1200/896] w-full bg-surface object-cover"
              />
              <div className="p-8">
                <h3 className="text-lg font-bold text-ink">{t(`usecase.card${card.n}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {t(`usecase.card${card.n}.desc`)}
                </p>

                {/* 번호를 칩 안에 넣은 순서 목록. 번호 없이 알약만 나열하면 태그·카테고리로
                    읽히는데 이건 업무 단계다. 화살표는 쓰지 않는다 — flex-wrap 줄바꿈 지점에서
                    화살표만 줄 끝에 남고, CoreValue 가 이미 "측정 → 이해 → 계획" 화살표 흐름을
                    쓴다. 번호가 순서를 대신하면 줄바꿈에도 안전하다.
                    좌우 패딩이 다른 건 왼쪽엔 번호 원이 있어 여백이 이미 확보되기 때문. */}
                <ol className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-body">
                  {Array.from({ length: card.flowCount }, (_, i) => i + 1).map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 rounded-full border border-hairline py-1 pl-1 pr-3"
                    >
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                        {f}
                      </span>
                      {t(`usecase.card${card.n}.flow${f}`)}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
