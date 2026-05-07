/**
 * 근골격계 방문재활 프로그램 상세 페이지
 * 원본: https://www.cogmo.life/rehab-postop.html
 */
import ImageCarousel from "@/components/ImageCarousel";
import CTASection from "@/components/CTASection";

const MODULES = [
  { num: "01", title: "척추 수술 후 재활", desc: "디스크·협착증·척추 고정술 이후 코어 안정성 회복과 통증 관리를 위한 단계별 운동." },
  { num: "02", title: "관절 수술 후 재활", desc: "어깨·무릎·고관절 등 관절 수술 이후 관절 가동범위 회복과 근력 강화 프로그램." },
  { num: "03", title: "인공관절 수술 후 재활", desc: "고관절·슬관절 치환술 이후 보행 훈련과 일상 기능 복귀를 위한 체계적 재활." },
];

const CARE_FLOW = [
  { step: "01", title: "퇴원 전 상담·계획 수립", desc: "병원·가족과 협의해 재가 전환 시점의 재활 목표와 위험 요인을 점검합니다." },
  { step: "02", title: "초기 방문 평가", desc: "수술 부위·근력·관절가동범위·통증 상태를 평가하여 기준 데이터를 확보합니다." },
  { step: "03", title: "주기별 재활 집중기", desc: "1·3·6개월 단위로 목표를 세분화해 치료·운동·생활지도를 진행합니다." },
  { step: "04", title: "유지·모니터링 단계", desc: "FEA 평가와 '안녕' 앱을 통한 모니터링으로 회복 유지와 재손상 예방을 지원합니다." },
];

export default function RehabPostopPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Program · Musculoskeletal Rehab
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            근골격계{" "}
            <span className="block md:inline">방문재활 프로그램</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            척추·관절·인공관절 수술 후 재활 운동 전문{" "}
            <span className="block md:inline">방문 프로그램</span>
            <br />
            퇴원 직후부터 일상 복귀까지, 전문 치료사가{" "}
            <span className="block md:inline">끊김 없이 함께합니다.</span>
          </p>
        </div>
      </section>

      {/* Intro — 슬라이드 캐러셀 + 하단 텍스트 */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* 이미지 슬라이드 캐러셀 (좌우 화살표 + 하단 콩단추)
              aspect-[7/4] + object-top으로 하단 ~14% 자동 크롭 → 워터마크 제거 */}
          <ImageCarousel
            images={[
              { src: "/images/program/musculoskeletal_rehab/main1.jpg", alt: "근골격계 방문재활 현장 1" },
              { src: "/images/program/musculoskeletal_rehab/main2.jpg", alt: "근골격계 방문재활 현장 2" },
              { src: "/images/program/musculoskeletal_rehab/main3.jpg", alt: "근골격계 방문재활 현장 3" },
              { src: "/images/program/musculoskeletal_rehab/main4.jpg", alt: "근골격계 방문재활 현장 4" },
            ]}
            className="aspect-[7/4] w-full animate-fade-in-zoom rounded-2xl border border-hairline bg-surface"
          />

          {/* 하단 텍스트 블록 */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Musculoskeletal Rehab
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              수술 후 빠른 일상 복귀를 위한{" "}
              <span className="text-primary">근골격계 방문재활</span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              척추 수술, 관절 수술, 인공관절 치환술 후 재활 — 수술 이후 가장
              중요한 시기에 전문 치료사가 직접 방문하여 근골격계 재활 운동을
              제공합니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              수술 부위의 안정적 회복과 일상 기능 복귀를 동시에 목표로, 단계별
              운동 프로그램을 설계합니다. 보호자의 돌봄 부담도 덜어드립니다.
            </p>
          </div>
        </div>
      </section>

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
              수술 유형별로 최적화된 3가지 재활 트랙.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
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

      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Care Flow
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              수술에서 일상 복귀까지,{" "}
              <span className="text-primary">끊김 없는 케어</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CARE_FLOW.map((s) => (
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

      <CTASection
        title="수술 후 회복, 지금 함께 시작해보세요"
        description="방문재활 일정 예약부터 병원·기관 협력 상담까지, 편한 방법으로 연락주세요."
        primaryAction={{ label: "서비스 도입 문의", href: "/contact" }}
      />
    </>
  );
}
