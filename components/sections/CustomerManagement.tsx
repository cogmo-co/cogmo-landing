"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/LanguageContext";
import { useLocalizedImage } from "@/lib/i18n/useLocalizedImage";
import Reveal from "@/components/home/Reveal";

const PAIRS = [1, 2, 3, 4, 5] as const;

/**
 * 폰 목업 — app/service-fea/page.tsx 의 프레임과 같은 형태(짙은 베젤 + 흰 띠 + 아일랜드).
 * 아일랜드를 스크린샷 위에 바로 겹치지 않고 띠를 따로 두는 이유도 거기와 같다 — 겹치면
 * 앱 상단바(뒤로가기·이름)를 가린다.
 *
 * 비율은 프레임이 아니라 화면 쪽에 둔다. 프레임에 두면 베젤·띠 두께만큼 어긋나 좌우가 잘린다.
 *
 * 48/100 은 두 스크린샷의 타협점이다. app-home 은 402x819(상태바를 잘라낸 값, 0.491),
 * 고객 프로필은 1080x2567(0.421)로 비율이 다른데, 한 프레임에 번갈아 넣어야 하니 하나만
 * 고를 수 없다. 0.48 이면 app-home 은 좌우가 2% 깎이고(거의 안 보임) 프로필은 아래
 * 12%(노란 메모)가 잘리는데, "바로가기" 두 번째 줄 라벨은 살아남는다. app-home 비율에
 * 딱 맞추면(0.491) 그 라벨이 반토막 난다.
 */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[240px] max-w-full rounded-[2rem] bg-ink p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        <div className="flex h-6 items-center justify-center">
          <div className="h-2.5 w-10 rounded-full bg-ink" />
        </div>
        <div className="relative aspect-[48/100] w-full">{children}</div>
      </div>
    </div>
  );
}

/**
 * 고객관리 섹션 — before/after 표를 여기로 흡수했다(예전 BeforeAfter 섹션).
 *
 * 표가 독립 섹션이던 시절엔 이 섹션 바로 뒤에 붙어 같은 말을 두 번 하는 꼴이었다.
 * 특히 "담당자마다 다른 평가 → 센터 공통 기준" 은 아래 본문에 문장으로 그대로 있다.
 * 표 자체는 B2B 의사결정자가 훑기 좋은 형태라 버리지 않고, 이 섹션의 근거로 옮겼다.
 *
 * 표는 사실상 페이지 전체 요약이라 제목을 따로 얹는다 — 섹션 제목(기록의 흐름)과
 * 표가 말하는 것(운영 방식의 변화)이 같은 층위가 아니기 때문.
 */
export default function CustomerManagement() {
  const t = useT();
  const appHomeSrc = useLocalizedImage("app-home");

  return (
    <section className="border-b border-hairline bg-white py-24">
      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Customer Management
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("custmgmt.title.l1")}</span>
            <br className="md:hidden" /> <span className="text-primary">{t("custmgmt.title.l2")}</span>
          </h2>
          {/* max-w-3xl — 강제 줄바꿈된 둘째 줄이 2xl(672px)에서는 한 줄에 안 들어간다 */}
          <p className="mx-auto mt-5 max-w-3xl whitespace-pre-line leading-relaxed text-body">
            {t("custmgmt.body")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center justify-items-center gap-12 lg:grid-cols-[auto_auto] lg:justify-center lg:gap-12">
          {/* 표 제목을 카드 밖에 두면 가운데 정렬된 섹션 제목과 정렬 체계가 어긋나 따로 논다.
              카드 머리로 넣으면 왼쪽 열이 하나의 덩어리가 된다. */}
          <div className="w-full overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] lg:w-fit">
            {/* 좌우 패딩은 아래 표 셀과 같은 값을 쓴다 — 어긋나면 머리와 본문 글머리가 안 맞는다 */}
            <h3 className="border-b border-hairline bg-surface px-4 py-5 text-lg font-bold leading-relaxed text-ink md:px-6">
              {t("beforeafter.title.l1")}
              {/* 좁은 화면에서만 끊는다 — 없으면 "고객관리 방식이 / 달라집니다." 로 구가 갈린다 */}
              <br className="md:hidden" />{" "}
              <span className="text-primary">{t("beforeafter.title.l2")}</span>
            </h3>
            {/* 모바일에서 가로 스크롤을 만들지 않는다 — min-w 를 두면 좁은 화면에서 표가
                화면 밖으로 나가 카드 안에 스크롤이 생긴다. 폭은 화면에 맞추고 글자·여백만
                한 단계 줄여, 긴 문구는 body 의 word-break:keep-all 대로 어절 단위로 접히게 둔다.
                md 이상 값은 폰 목업과 맞춰둔 높이(py-7)를 그대로 유지한다. */}
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="px-4 py-4 text-sm font-semibold text-muted md:px-6">Before</th>
                  <th className="px-4 py-4 text-sm font-semibold text-primary md:px-6">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {PAIRS.map((n) => (
                  <tr key={n}>
                    <td className="px-4 py-5 text-muted md:px-6 md:py-7">
                      {t(`beforeafter.pair${n}.before`)}
                    </td>
                    <td className="px-4 py-5 font-medium text-ink md:px-6 md:py-7">
                      {t(`beforeafter.pair${n}.after`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 폰 한 대에 화면 두 장을 번갈아 (5s 구간 x 2장 = 10s 주기) */}
          <PhoneFrame>
            {[
              { src: appHomeSrc, alt: t("custmgmt.img1_alt") },
              { src: "/images/landing/app-customer-profile.jpg", alt: t("custmgmt.img2_alt") },
            ].map((shot, idx) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="240px"
                className="animate-duo-slide object-cover object-top opacity-0"
                style={{ animationDelay: `${idx * 5}s` }}
              />
            ))}
          </PhoneFrame>
        </div>
      </Reveal>
    </section>
  );
}
