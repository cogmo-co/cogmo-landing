/**
 * 시니어 방문재활 프로그램 상세 페이지
 * 원본: https://www.cogmo.life/rehab-visit.html
 * Nav/Footer는 app/layout.tsx에서 래핑됨
 */
import ImageCarousel from "@/components/ImageCarousel";
import CTASection from "@/components/CTASection";

const MODULES = [
  { num: "01", title: "근감소증 예방", desc: "하지 중심 저항성 운동으로 나이와 함께 빠르게 줄어드는 근육량을 유지·회복합니다." },
  { num: "02", title: "체력 증진", desc: "심폐 지구력과 전신 근력을 균형 있게 향상시키는 시니어 맞춤 운동 프로그램." },
  { num: "03", title: "낙상 예방", desc: "균형 감각·코어 안정성·발목 가동성을 훈련해 넘어짐 사고의 위험을 낮춥니다." },
  { num: "04", title: "보행 훈련", desc: "올바른 보행 패턴과 자세를 교정하여 안정적이고 효율적인 보행을 회복합니다." },
];

const PROCESS = [
  { step: "01", title: "상담∙일정 예약", desc: "전화 또는 온라인 상담을 통해 대상자의 상태와 목표를 확인합니다." },
  { step: "02", title: "FEA 기능 평가", desc: "방문 첫 세션에 근골격계 기능 평가를 진행하여 개입 기준을 수립합니다." },
  { step: "03", title: "맞춤 재활 프로그램 진행", desc: "치료사가 정기적으로 방문하여 운동·도수치료·생활지도를 병행합니다." },
  { step: "04", title: "정기 모니터링·보고", desc: "경과를 기록·분석하여 보호자·기관에 정기 리포트로 전달합니다." },
];

const TARGETS = [
  { title: "근력·체력이 저하된 시니어", desc: "근감소증이 진행 중이거나 전반적인 체력 저하로 일상 활동이 어려운 분." },
  { title: "낙상 위험이 높은 분", desc: "균형·근력이 약해져 낙상 위험이 증가한 어르신." },
  { title: "보행 불안정 시니어", desc: "보행 시 통증, 불안정, 기능 저하로 이동에 어려움을 겪는 분." },
];

export default function RehabVisitPage() {
  return (
    <>
      {/* Page Header */}
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Program · Senior Rehab
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            시니어 방문 재활 프로그램
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            근감소증, 체력증진, 낙상예방, 보행{" "}
            <span className="block md:inline">- 시니어에 최적화된 방문 재활</span>
            <br />
            전문치료사가 직접 방문해 근력∙균형∙보행을{" "}
            <span className="block md:inline">1:1로 회복시켜 드립니다.</span>
          </p>
        </div>
      </section>

      {/* Intro — 슬라이드쇼 + 하단 텍스트 */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* 이미지 슬라이드 캐러셀 (좌우 화살표 + 하단 콩단추)
              aspect-[7/4] + object-top으로 하단 ~14% 자동 크롭 → 워터마크 제거 */}
          <ImageCarousel
            images={[
              { src: "/images/program/senior_rehab/main1.jpg", alt: "방문재활 현장 1" },
              { src: "/images/program/senior_rehab/main2.jpg", alt: "방문재활 현장 2" },
              { src: "/images/program/senior_rehab/main3.jpg", alt: "방문재활 현장 3" },
              { src: "/images/program/senior_rehab/main4.jpg", alt: "방문재활 현장 4" },
              { src: "/images/program/senior_rehab/main5.jpg", alt: "방문재활 현장 5" },
            ]}
            className="aspect-[7/4] w-full animate-fade-in-zoom rounded-2xl border border-hairline bg-surface"
          />

          {/* 하단 텍스트 블록 */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Senior Visit Rehabilitation
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              시니어에 최적화된{" "}
              <span className="block text-primary md:inline">방문 재활 운동</span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              근감소증, 체력 저하, 낙상 위험, 보행 불안정 —
              <br />
              시니어가 가장 자주 겪는 신체 기능 저하에 집중한{" "}
              <span className="block md:inline">방문 재활 프로그램입니다.</span>
              <br />
              전문 치료사가 직접 가정·기관을 방문하여{" "}
              <span className="block md:inline">1:1 맞춤 운동을 제공합니다.</span>
            </p>
            <p className="mt-4 leading-relaxed text-body">
              FEA 기능 평가 결과를 기반으로 개인별 운동처방을 설계하고, 지속적인
              모니터링을 통해 회복 경과를 기록·추적합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Program modules */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Program
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              프로그램 <span className="text-primary">구성</span>
            </h2>
            <p className="mt-4 text-body">
              시니어 신체 기능 유지·회복을 위한 4가지 핵심 모듈.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m) => (
              <div key={m.num} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="text-2xl font-black text-primary">{m.num}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Process
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              서비스 <span className="text-primary">진행 프로세스</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PROCESS.map((s) => (
              <div key={s.step} className="flex gap-5 rounded-xl border border-hairline bg-white p-6">
                <span className="flex-none text-sm font-black text-primary">{s.step}</span>
                <div>
                  <h3 className="text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Target
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              이런 분들께 <span className="text-primary">권장합니다</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TARGETS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-hairline bg-white p-8">
                <h3 className="text-lg font-bold text-ink">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="지금 부모님의 회복을 시작해보세요"
        description={<>방문재활 일정 예약부터 기관 도입 상담까지,{" "}<span className="block md:inline">편한 방법으로 연락주세요.</span></>}
        primaryAction={{ label: "프로그램 문의", href: "/contact" }}
      />
    </>
  );
}
