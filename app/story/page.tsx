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
              PoC 현장에서 시작해 법인 설립, 서비스 출시, 파트너십까지 — 코그모의
              주요 이정표입니다.
            </p>
          </div>
          <ol className="mt-14 space-y-4">
            {HISTORY.map((h, idx) => (
              <li
                key={`${h.year}-${h.month}-${h.title}`}
                className={`flex gap-6 rounded-2xl border bg-white p-6 ${idx === 0 ? "border-primary/40 shadow-[0_10px_30px_rgba(50,81,49,0.08)]" : "border-hairline"}`}
              >
                <div className="flex-none text-center">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {h.year}
                  </div>
                  <div className="text-2xl font-black text-primary">
                    {h.month}
                  </div>
                </div>
                <div className="border-l border-hairline pl-6">
                  <h3 className="text-base font-bold text-ink">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {h.desc}
                  </p>
                </div>
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
