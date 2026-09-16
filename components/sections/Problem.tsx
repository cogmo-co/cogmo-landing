"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";

/**
 * 전문가의 말 ↔ 고객의 되물음. 사전 키 순서로는 짝이 안 맞아(quote1 은 question3 과 맞물린다)
 * 여기서 명시적으로 묶는다. 사전 순서를 바꾸면 6개 언어를 다 건드려야 해서 이쪽에 둔 것.
 */
const PAIRS: [string, string][] = [
  ["problem.quote1", "problem.question3"], // 전보다 많이 좋아졌습니다 ↔ 지난달보다 실제로 좋아졌나요?
  ["problem.quote2", "problem.question1"], // 균형이 조금 나아졌습니다 ↔ 현재 제 상태가 어떤가요?
  ["problem.quote3", "problem.question2"], // 이 운동을 계속하면 좋겠습니다 ↔ 왜 이 운동을 해야 하나요?
];

/**
 * 문제 제기 — 고객이 던지는 질문과, 같은 벽에 부딪힌 만든 사람의 질문을 이어 붙인다.
 *
 * 원래 BrandStory 가 별도 섹션(가격 뒤)이었는데 여기로 합쳤다. 그 섹션의 pull-quote 3개가
 * 이 섹션의 "센터 운영의 문제" 목록과 1:1로 겹쳤기 때문이다 — 같은 문제를 페이지 안에서
 * 세 번(여기 + before/after 표 + BrandStory) 말하고 있었다. 이제 역할을 나눈다:
 *   - 여기: 문제를 겪는 두 목소리(고객/현장)와 그래서 만들었다는 대답
 *   - CustomerManagement: 운영이 실제로 어떻게 달라지는지 (before/after 표)
 * 그래서 이 섹션의 운영 체크리스트와 맺음말은 뺐다. 그 표가 같은 내용을 더 잘 보여준다.
 *
 * 헤더의 '회사소개' 앵커(/#brand-story)가 아래 브랜드 파트를 가리킨다.
 */
/**
 * 별도 페이지로 나가는 링크. 바깥으로 나간다는 뜻의 ↗ 를 붙인다.
 * 테두리를 주되 CTA 버튼(px-7 py-3.5)보다 작게 둔다 — 이 사이트의 버튼 위계가
 * 채움(주 CTA) / 테두리(보조 CTA) / 이동 링크 3단이라, 정보 페이지로 가는 이 둘이
 * 보조 CTA 와 같은 무게가 되면 안 된다. 그렇다고 맨 텍스트면 코다 끝에서 묻힌다.
 */
function PageLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex items-center gap-1.5 rounded-lg border border-hairline px-4 py-2 transition hover:border-primary hover:bg-primary/5"
    >
      {children}
      <svg
        className="h-3.5 w-3.5 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 10 10 4M10 4H5M10 4v5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

export default function Problem() {
  const t = useT();

  return (
    // overflow-hidden 은 아래 펜 때문이다 — 종이 밖 32px 에 두고 26도 돌려서
    // 회전 바운딩 박스가 좌우로 39px 씩 더 퍼진다. 모바일에서는 그게 뷰포트를 넘어
    // 가로 스크롤이 생기고, 그러면 모든 섹션 배경이 뷰포트 폭에서 끊겨 오른쪽에 흰 띠가 보인다.
    // 넓은 화면에서는 섹션이 지면 전체를 쓰므로 잘리지 않는다.
    <section className="overflow-hidden border-b border-hairline bg-white py-24">
      <Reveal className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("problem.title.l1")}</span>
            <br className="md:hidden" />{" "}
            <span className="text-primary">{t("problem.title.l2")}</span>
          </h2>
        </div>

        {/* 전문가의 말과 고객의 되물음을 좌우로 맞세운다. 쌍마다 카드 하나 — 세 쌍을 테두리
            하나로 묶으면 데스크톱에선 깔끔하지만 모바일에서 카드 안이 위아래로 갈리면서
            "쌍 사이 경계"와 "쌍 안 경계"가 똑같은 실선이 되어 짝이 사라진다.
            폭은 max-w-3xl — 한 줄짜리 인용문을 1024px 에 걸치면 카드가 텅 빈 띠가 된다.

            양끝 인물은 블록 바깥이 아니라 카드 안쪽으로 겹친다. 카드 안 글이 가운데 경계로
            붙어 있어 바깥쪽이 비는데, 완전히 바깥에 두면 그 자리가 구멍으로 남는다.
            겹치는 양이 좌우로 다른 건 인물 폭이 달라서다 — 전문가는 팔을 뻗고 있어 원본이
            500px(고객은 300px)이라 같은 값으로 겹치면 전문가 쪽에만 구멍이 남는다.
            겹친 만큼 블록 밖으로 나가는 폭이 줄어 lg(1024px)부터 보여줄 수 있다.
            시선이 안쪽을 향하도록 전문가가 왼쪽, 고객이 오른쪽. */}
        <div className="relative mx-auto mt-12 max-w-3xl">
          <Image
            src="/images/landing/char/male.png"
            alt=""
            aria-hidden
            width={500}
            height={600}
            className="absolute bottom-0 right-full z-10 -mr-40 hidden h-64 w-auto lg:block 2xl:h-80"
          />
          <Image
            src="/images/landing/char/female.png"
            alt=""
            aria-hidden
            width={300}
            height={600}
            className="absolute bottom-0 left-full z-10 -ml-28 hidden h-64 w-auto lg:block 2xl:h-80"
          />
          {/* 열 제목은 데스크톱에서만. 모바일은 카드 안이 위아래로 갈려 "열"이 없다.
              두 열 모두 가운데 경계 쪽으로 붙여 마주보게 한다 — 양쪽 다 왼쪽 정렬이면
              그냥 두 칸으로 보이고, 마주보면 화살표 없이도 주고받는 관계가 읽힌다. */}
          <div className="hidden gap-x-6 px-6 pb-3 md:grid md:grid-cols-2">
            <p className="text-right text-sm font-semibold text-muted">{t("problem.said_label")}</p>
            <p className="text-left text-sm font-semibold text-primary">{t("problem.asked_label")}</p>
          </div>

          <div className="space-y-3">
            {PAIRS.map(([said, asked]) => (
              <div
                key={said}
                className="overflow-hidden rounded-2xl border border-hairline md:grid md:grid-cols-2"
              >
                <p className="bg-surface px-6 py-5 text-center text-muted md:text-right">{t(said)}</p>
                <p className="border-t border-hairline px-6 py-5 text-center font-semibold text-ink md:border-l md:border-t-0 md:text-left">
                  {t(asked)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 결론은 두 목소리를 다 보여준 뒤에 온다. 먼저 말하면 아래 질문이 근거가 아니라 사족이 된다 */}
        <p className="mt-10 text-center leading-relaxed text-body">{t("problem.transition")}</p>
      </Reveal>

      {/* 브랜드 파트 — 같은 문제를 만든 사람 쪽에서 다시 말하는 코다.
          왼쪽은 서사, 오른쪽은 현장에서 적어둔 메모처럼. 인용 3개를 또 테두리 카드에 담으면
          바로 위 대화(테두리 인용 6개)와 형태가 겹치는데, 점선 밑줄을 그으면 메모지 줄로
          읽혀 형태가 갈린다. 내용도 "현장에서 반복적으로 마주했던 문제"라 메모와 맞는다.
          eyebrow 를 두지 않는 건 여기가 독립 섹션이 아니라 이 섹션의 후반부이기 때문. */}
      <Reveal step={1} className="mx-auto mt-16 max-w-5xl px-6">
        {/* 가로줄이 아니라 아래로 내려가는 화살표. 줄은 "여기서 끊긴다"는 신호인데 이 두 부분은
            이어지는 내용이다 — 고객이 되묻고, 우리도 같은 질문을 했다. */}
        <svg
          viewBox="0 0 24 24"
          className="mx-auto h-16 w-16"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* 두 꺾쇠를 같은 색으로 두면 한 덩어리로 뭉쳐 보인다. 위를 밝은 primary,
              아래를 primary-dark 로 내려가며 진해지게 해서 방향이 읽히게 한다.
              둘 다 토큰 색이라 팔레트가 늘지 않는다. */}
          <path d="M6 5.5 12 11.5 18 5.5" className="stroke-primary" />
          <path d="M6 12.5 12 18.5 18 12.5" className="stroke-primary-dark" />
        </svg>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <h3
              id="brand-story"
              className="scroll-mt-16 text-2xl font-bold leading-tight text-ink md:text-3xl"
            >
              <span>{t("brandstory.title.l1")}</span>{" "}
              <span>{t("brandstory.title.l2")}</span>
            </h3>
            <p className="mt-6 leading-relaxed text-body">{t("brandstory.p1")}</p>
            <p className="mt-3 leading-relaxed text-body">{t("brandstory.p2")}</p>
            <p className="mt-6 leading-relaxed text-body">{t("brandstory.p3")}</p>

            {/* 브랜드 서사의 본편은 별도 페이지에 있다. 두 페이지 모두 한국어 전용이라
                라벨을 사전에 넣지 않는다. */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-primary">
              <PageLink href="/about">브랜드 소개</PageLink>
              <PageLink href="/story">코그모 스토리</PageLink>
            </div>
          </div>

          {/* 서류 두 장이 겹쳐 놓인 모양. 모서리를 둥글리지 않는 게 핵심이다 — 라운드가 붙는
              순간 UI 카드로 읽히고 종이로는 안 읽힌다. 뒤 장을 반대로 기울여 겹침을 만들고,
              괘선이 끝까지 닿게 해서 줄 그어진 종이가 되게 한다. 노랑 없이도 서류로 보인다. */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -rotate-2 border border-hairline bg-surface"
            />
            <div className="relative rotate-1 border border-hairline bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
              {(["q1", "q2", "q3"] as const).map((k) => (
                <p
                  key={k}
                  className="whitespace-pre-line border-b border-hairline px-6 py-5 font-serif text-lg leading-relaxed text-ink last:border-0 md:px-8"
                >
                  {t(`brandstory.${k}`)}
                </p>
              ))}
              {/* 펜 — 종이 오른쪽 모서리 바깥에 세워 둔다. 안쪽에 두려고 행에 오른쪽 여백을
                  주면 본문 폭이 깎여 질문이 불필요하게 줄바꿈되므로, 여백을 주는 대신 펜을
                  바깥으로 뺐다. 원본이 펜촉 좌하단을 향한 60도 기울기라 30도만 되돌리면
                  수직으로 선다(살짝 기운 채로 두는 게 놓아둔 것처럼 보여 정확히 90도는 피함).
                  길이는 종이 높이와 비슷하게 잡고, 오른쪽 모서리 바깥으로 빼서 글을 가리지 않게
                  한다(음수 offset). 안쪽에 두면 2·3번 질문의 끝 글자를 덮는다. */}
              <Image
                src="/images/landing/etc/pen.png"
                alt=""
                aria-hidden
                width={558}
                height={650}
                className="pointer-events-none absolute -right-8 top-1/2 h-56 w-auto -translate-y-1/2 -rotate-[26deg] md:-right-12"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
