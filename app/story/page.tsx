/**
 * 코그모스토리 페이지
 * 원본: https://www.cogmo.life/story.html
 */
import CTASection from "@/components/CTASection";

const CATEGORIES = [
  { tag: "NEWS", title: "보도자료", desc: "주요 언론에 소개된 코그모의 기사 및 보도자료를 모아 전해드립니다." },
  { tag: "UPDATES", title: "서비스 업데이트", desc: "'안녕' 앱과 통합 대시보드의 주요 기능 업데이트 소식." },
  { tag: "PARTNERSHIP", title: "파트너십 소식", desc: "기관·기업·지자체와의 협력 및 MOU 체결 소식을 전합니다." },
];

const HISTORY = [
  { year: "2026", month: "07", title: "대한방문재활협회 업무협약 체결", desc: "대한방문재활협회와 방문재활 현장 적용, 서비스 제공자 교육 및 데이터 기반 건강관리 모델 확산을 위한 업무협약 체결." },
  { year: "2026", month: "05", title: "아파트 커뮤니티 서비스 데모 진행", desc: "인천 부평구·계양구 5개 아파트 단지에서 '안녕' 서비스 데모를 진행하고, 운동지도자 대상 기능적 움직임 검사 교육을 통해 커뮤니티 실증 기반 확보." },
  { year: "2026", month: "05", title: "써니요양원 업무협약 체결", desc: "요양원 입소 어르신을 대상으로 인지기능·근골격계 평가 및 운동처방의 현장 적용성과 사용성을 검증하기 위한 업무협약 체결." },
  { year: "2026", month: "05", title: "피엔피헬스케어 업무협약 체결", desc: "방문재활·방문운동 현장에서 '안녕'의 평가 및 운동처방 흐름을 검증하기 위한 B2B 실증 채널 확보." },
  { year: "2026", month: "05", title: "근골격계 평가·운동처방 기능 개발 완료", desc: "FEA 기반 근골격계 평가 알고리즘과 운동처방 로직, 일러스트·애니메이션 콘텐츠를 완성해 인지·신체기능 통합관리 기반 구축." },
  { year: "2026", month: "04", title: "청년창업사관학교 16기 선정", desc: "중소벤처기업진흥공단 청년창업사관학교 16기 입교." },
  { year: "2026", month: "02", title: "3차 PoC 진행", desc: "시니어 인지건강 서비스 현장 검증 3차 실증 사업." },
  { year: "2026", month: "01", title: "App Store 서비스 등록", desc: "인지기능 검사 '안녕' iOS 앱 출시." },
  { year: "2025", month: "12", title: "Google Play Store 서비스 등록", desc: "인지기능 검사 '안녕' Android 앱 출시." },
  { year: "2025", month: "10", title: "인천 SURF 박람회 참가", desc: "인천 스타트업·혁신 박람회(SURF)에서 코그모 솔루션 시연." },
  { year: "2025", month: "08", title: "시니어모델에이전시 제이액터스 MoU 체결", desc: "시니어 콘텐츠·홍보 파트너십을 위한 업무 협약 체결." },
  { year: "2025", month: "06", title: "코그모 주식회사 법인 설립", desc: "대표이사 한석규 · 인천 미추홀구 인하드림센터 기반 법인 출범." },
  { year: "2025", month: "04", title: "예비창업패키지 선정", desc: "중소벤처기업부 예비창업패키지 최종 선정." },
  { year: "2025", month: "02", title: "2차 PoC 진행", desc: "현장 피드백 기반 서비스 고도화 2차 실증 사업." },
  { year: "2024", month: "10", title: "1차 PoC 진행", desc: "시니어 인지건강 서비스 최초 현장 검증의 시작." },
];

// 같은 연·월 항목을 하나의 마커 아래로 묶음 (HISTORY 는 최신순 정렬 전제)
const HISTORY_GROUPS: { year: string; month: string; items: typeof HISTORY }[] =
  [];
for (const h of HISTORY) {
  const last = HISTORY_GROUPS[HISTORY_GROUPS.length - 1];
  if (last && last.year === h.year && last.month === h.month) {
    last.items.push(h);
  } else {
    HISTORY_GROUPS.push({ year: h.year, month: h.month, items: [h] });
  }
}

// 연도 단위로 다시 묶음 → 연도 칩 헤더 + 월별 타임라인
const HISTORY_YEARS: { year: string; months: typeof HISTORY_GROUPS }[] = [];
for (const g of HISTORY_GROUPS) {
  const last = HISTORY_YEARS[HISTORY_YEARS.length - 1];
  if (last && last.year === g.year) {
    last.months.push(g);
  } else {
    HISTORY_YEARS.push({ year: g.year, months: [g] });
  }
}

export default function StoryPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Cogmo Story
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            코그모스토리
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            현장 이야기, 보도자료, 파트너십 소식을{" "}
            <span className="block md:inline">한 곳에서 만나보세요.</span>
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Cogmo Story
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              코그모의 <span className="text-primary">소식을 전합니다</span>
            </h2>
            <p className="mt-4 text-body">
              보도자료, 현장 이야기, 파트너십 소식을{" "}
              <span className="block md:inline">한 곳에서 확인하실 수 있습니다.</span>
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div key={c.tag} className="rounded-2xl border border-hairline bg-white p-8 text-center">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                  {c.tag}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              History
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              코그모가 걸어온 <span className="text-primary">길</span>
            </h2>
            <p className="mt-4 text-body">
              작은 현장 검증에서 출발해 오늘에 이르기까지, 코그모가 걸어온
              순간들입니다.
            </p>
          </div>
          <ol className="mt-14">
            {HISTORY_YEARS.map((y, yIdx) => (
              <li key={y.year} className={yIdx > 0 ? "mt-10" : ""}>
                {/* 연도 헤더 */}
                <div className="mb-5 text-2xl font-black leading-none text-primary tabular-nums sm:text-3xl">
                  {y.year}
                </div>
                {/* 월별 타임라인 — 연도 내 연속 라인 */}
                <ol>
                  {y.months.map((g, mIdx) => {
                    const isLastMonth = mIdx === y.months.length - 1;
                    const isVeryFirst = yIdx === 0 && mIdx === 0;
                    return (
                      <li
                        key={`${g.year}-${g.month}`}
                        className="flex gap-3 sm:gap-4"
                      >
                        {/* 월 — 고정폭 → 라인·마커 x 일정 */}
                        <div className="w-7 flex-none text-right text-base font-bold leading-6 text-primary tabular-nums sm:text-lg">
                          {g.month}
                        </div>
                        {/* 세로 라인 + 마커 + 이벤트 */}
                        <div
                          className={`relative flex-1 border-l-2 border-hairline pl-6 sm:pl-8 ${
                            isLastMonth ? "pb-0" : "pb-10"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute -left-2.25 top-1 h-4 w-4 rounded-full border-2 border-primary ${
                              isVeryFirst ? "bg-primary" : "bg-white"
                            }`}
                          />
                          <div className="space-y-5">
                            {g.items.map((it) => (
                              <div key={it.title}>
                                <div className="flex items-start gap-2.5">
                                  <span
                                    aria-hidden
                                    className="mt-2.25 h-1.5 w-1.5 flex-none rounded-full bg-primary"
                                  />
                                  <h3 className="text-[1.1rem] font-bold leading-6 text-ink">
                                    {it.title}
                                  </h3>
                                </div>
                                <p className="mt-1.5 pl-4.5 text-[0.9rem] leading-relaxed text-muted">
                                  {it.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title={<>코그모의 다음 걸음을{" "}<span className="block md:inline">함께하실 분을 찾습니다</span></>}
        description={<>기관 도입, 파트너십, 미디어 문의{" "}<span className="block md:inline">— 무엇이든 편하게 연락주세요.</span></>}
        primaryAction={{ label: "협력 · 도입 문의", href: "/contact" }}
      />
    </>
  );
}
