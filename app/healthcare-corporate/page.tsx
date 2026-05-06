/**
 * 기업 임직원 건강관리 프로그램 상세 페이지
 * 원본: https://www.cogmo.life/healthcare-corporate.html
 */
import ImageCarousel from "@/components/ImageCarousel";
import CTASection from "@/components/CTASection";

const CLIENTS = [
  "인천지방해양청",
  "롯데카드",
  "롯데백화점 문화센터",
  "그 외 다수 기업·기관",
];

const MODULES = [
  { num: "01", title: "자세 교정 평가", desc: "어깨 라운딩, 목·허리 정렬, 골반 비대칭 등 사무직에 흔한 자세 문제를 전문가가 직접 평가합니다." },
  { num: "02", title: "교정 운동 세션", desc: "평가 결과를 바탕으로 약해진 근육을 강화하고 긴장된 근육은 이완시키는 1:1 또는 소그룹 맞춤 운동." },
  { num: "03", title: "오피스 스트레칭", desc: "책상·의자만 있으면 바로 따라 할 수 있는 10–15분 데일리 루틴. 업무 사이 바로 실행 가능한 동작으로 구성." },
  { num: "04", title: "원데이 특강", desc: "기업 내부 교육일, 사내 행사, 웰니스 데이에 맞춘 90–120분 단회성 프로그램." },
  { num: "05", title: "개인 맞춤 프로그램", desc: "근골격계 FEA 평가와 연동한 개인별 운동 처방. 집중 관리가 필요한 임원·고위험군 대상." },
  { num: "06", title: "정기 단체 운영", desc: "주 1회·월 1회 등 주기적 방문 세션으로 지속적인 습관 형성과 통증 감소 효과를 유도합니다." },
];

const OUTCOMES = [
  { title: "통증·피로 감소", desc: "만성 어깨·목·허리 통증과 VDT 증후군 관련 불편감이 눈에 띄게 줄어듭니다." },
  { title: "업무 집중도 향상", desc: "자세·호흡이 바로잡히면 집중력과 업무 생산성이 자연스럽게 개선됩니다." },
  { title: "복지 만족도 상승", desc: "임직원이 직접 체감하는 복지 프로그램으로 만족도·조직 몰입도가 높아집니다." },
];

export default function HealthcareCorporatePage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Program · Corporate Wellness
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            기업 임직원{" "}
            <span className="block md:inline">건강관리 프로그램</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            오피스 스트레칭, 체형 교정 원데이 클래스,{" "}
            <span className="block md:inline">건강 관리 세미나</span>
            <br />
            사무실 현장에 맞춘 자세·통증·업무 집중 개선 솔루션.
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
              { src: "/images/program/company_healthcare/main1.jpg", alt: "기업 헬스케어 현장 1" },
              { src: "/images/program/company_healthcare/main2.jpg", alt: "기업 헬스케어 현장 2" },
              { src: "/images/program/company_healthcare/main3.jpg", alt: "기업 헬스케어 현장 3" },
              { src: "/images/program/company_healthcare/main4.jpg", alt: "기업 헬스케어 현장 4" },
            ]}
            className="aspect-[7/4] w-full animate-fade-in-zoom rounded-2xl border border-hairline bg-surface"
          />

          {/* 하단 텍스트 블록 */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Corporate Wellness
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              책상 앞 8시간,{" "}
              <span className="block text-primary md:inline">몸이 보내는 신호</span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              장시간 컴퓨터 앞에 앉아 있는 사무직 임직원에게 가장 먼저 나타나는
              것은 어깨 결림, 목·허리 통증, 눈의 피로 그리고 만성적인 자세
              불균형입니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              코그모는 이런 현장의 고충을 바로 해결하기 위해{" "}
              <strong className="text-ink">자세 교정 · 교정 운동 · 오피스 스트레칭</strong>을 중심으로 한
              <br />
              임직원 맞춤 헬스케어 프로그램을 제공합니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              원데이 특강부터 주기적인 단체 세션, 개인 맞춤 1:1 프로그램까지
              기업의 규모와 예산, 근무 환경에 따라 유연하게 설계합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Selected Clients
          </h6>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-body">
            {CLIENTS.map((c) => (
              <li key={c} className="text-base font-medium">
                {c}
              </li>
            ))}
          </ul>
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
              자세 평가부터 실전 운동까지, 사무 환경에 최적화된 6가지 모듈.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Expected Outcomes
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              도입 <span className="text-primary">효과</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="rounded-2xl border border-hairline bg-white p-8">
                <h3 className="text-lg font-bold text-ink">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="임직원 건강, 기업의 자산입니다"
        description="원데이 특강부터 정기 단체 프로그램까지, 기업 규모와 예산에 맞춰 제안드릴게요."
        primaryAction={{ label: "프로그램 문의하기", href: "/contact" }}
        secondaryAction={{ label: "제안서 요청", href: "/contact" }}
      />
    </>
  );
}
