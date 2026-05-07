/**
 * 인지기능 검사 '안녕' 서비스 페이지
 * 원본: https://www.cogmo.life/service-hi.html
 */
import Image from "next/image";
import CTASection from "@/components/CTASection";

const FEATURES = [
  { num: "01", title: "인지기능 정기 검사", desc: "6가지 인지영역의 동적 모니터링으로 일상 속 미세한 변화를 추적합니다." },
  { num: "02", title: "근골격계 상태 확인", desc: "낙상 예방과 신체 활동 능력 유지를 위한 간편 평가를 함께 제공합니다." },
  { num: "03", title: "근감소증 테스트", desc: "근감소증 조기 선별과 신체 기능 변화 추적 도구를 제공합니다." },
  { num: "04", title: "맞춤형 운동 처방 · 식단", desc: "검사 결과를 기반으로 개인별 맞춤 운동 프로그램을 제공하며, 식단 처방 기능을 준비 중입니다.", status: "개발중" },
];

const AI_TECH = [
  { tag: "DYNAMIC SET", title: "동적 문제 세트", desc: "반복 검사 시 발생하는 '학습 효과'를 최소화하기 위해 매번 변화하는 문제 로직을 적용하여 객관성을 확보합니다." },
  { tag: "AI VISION", title: "안면 표정 인식 AI", desc: "전면 카메라를 통한 표정 및 응답 패턴 보조 분석으로 인지 검사의 객관성과 정밀도를 극대화합니다.", status: "개발중" },
];

const FLYWHEEL = [
  { step: "01", title: "모바일 일상 검사", desc: "시니어가 앱을 통해 생성하는 지속적인 인지·신체 데이터." },
  { step: "02", title: "클라우드 AI 분석", desc: "누적 빅데이터를 바탕으로 미세한 인지저하 위험 신호를 조기 감지." },
  { step: "03", title: "실시간 대시보드 공유", desc: "정량적 지표 기반의 맞춤형 피드백 리포트를 기관·보호자에게 제공." },
  { step: "04", title: "돌봄 품질 향상", desc: "요양기관의 다수 대상자 통합 관리 효율성을 극대화하고 보호자 안심 확보." },
];

const DASHBOARD = [
  { tag: "REAL-TIME", title: "실시간 통계·분포도", desc: "다수 대상자의 접속 현황, 평가 현황, 인지 상태 분포를 한눈에 파악." },
  { tag: "AI REPORT", title: "AI 맞춤형 리포트", desc: "6가지 인지영역의 누적 점수 모니터링과 자동화된 상세 피드백 보고서." },
  { tag: "EFFICIENCY", title: "운영 효율성", desc: "한정된 돌봄 인력의 한계를 극복하고 기관 서비스의 차별화와 신뢰도 향상." },
];

export default function ServiceHiPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Service · 안녕
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            인지건강 모니터링 &apos;안녕&apos;
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            진단 이전에 시작하는 인지건강 모니터링
            <br />
            검사·추적·관리를 하나의 앱에서,{" "}
            <span className="block md:inline">시니어 스스로 참여할 수 있게 설계했습니다.</span>
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              건강할 때 시작하는{" "}
              <span className="block text-primary md:inline">인지건강 모니터링</span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              기존 인지검사는 이미 증상이 나타난 뒤 &apos;진단&apos;을 위해
              사용됩니다. &apos;안녕&apos;은 아직 건강한 시니어(Young-Old)의 인지
              변화를 정기적으로 추적하여 초기 신호를 감지하는{" "}
              <strong className="text-ink">예방형 모니터링 서비스</strong>입니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              복잡한 지류 설문지에서 탈피해 시니어 스스로 참여할 수 있는 직관적인
              모바일 검사로 설계되었으며, 검사 결과는 즉시 시각화되어
              자녀·보호자와 공유됩니다.
            </p>
            <a
              href="/check"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-lg bg-primary px-7 py-3.5 font-medium text-white transition hover:bg-primary-dark"
            >
              지금 검사 해보기
            </a>
          </div>
          {/* Dual mockup — 좌: 대시보드, 우: 안녕 앱 (메인 히어로와 동일한 겹침 구도) */}
          <div className="relative py-12 md:py-16">
            <Image
              src="/images/service/annyeong/annyeong_main-1.jpg"
              alt="안녕 B2B 관리자 대시보드"
              width={1280}
              height={800}
              priority
              sizes="(max-width: 1024px) 80vw, 640px"
              className="w-[80%] h-auto animate-fade-in-zoom"
              style={{ boxShadow: "0 20px 40px rgba(50, 81, 49, 0.08)" }}
            />
            <div className="absolute right-0 top-1/2 w-[35%] -translate-y-1/2">
              <div className="relative aspect-[9/19] w-full animate-fade-in-zoom rounded-[2rem] bg-ink p-1 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
                <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-white">
                  <Image
                    src="/images/service/annyeong/annyeong_main-2.jpg"
                    alt="안녕 모바일 앱 화면"
                    fill
                    sizes="(max-width: 1024px) 28vw, 280px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Core Features
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              &apos;안녕&apos;의 <span className="text-primary">4대 핵심 기능</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.num} className="rounded-2xl border border-hairline bg-white p-8">
                {/* 상단: 뱃지 우측 정렬 (뱃지 없어도 높이 예약으로 4개 카드 정렬) */}
                <div className="flex min-h-[32px] justify-end">
                  {f.status && (
                    <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white">
                      {f.status}
                    </span>
                  )}
                </div>
                <span className="mt-6 inline-block text-2xl font-black text-primary">
                  {f.num}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              AI Technology
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              시니어 맞춤 UX와{" "}
              <span className="block text-primary md:inline">신뢰도 높은 AI 분석</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {AI_TECH.map((a) => (
              <div key={a.tag} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                  {a.tag}
                </span>
                <div className="mt-4 flex items-center gap-2">
                  <h3 className="text-lg font-bold text-ink">{a.title}</h3>
                  {a.status && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {a.status}
                    </span>
                  )}
                </div>
                <p className="mt-3 leading-relaxed text-body">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHR Data Flywheel */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              PHR Data Flywheel
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              데이터가 쌓일수록 정밀해지는{" "}
              <span className="text-primary">통합 모니터링</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {FLYWHEEL.map((s) => (
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

      {/* B2B Dashboard */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              B2B Dashboard
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              기관을 위한{" "}
              <span className="block text-primary md:inline">통합 관리 대시보드</span>
            </h2>
            <p className="mt-4 text-body">
              방문요양·주야간보호센터 등 요양기관을 위한{" "}
              <span className="block md:inline">데이터 기반 관제 시스템.</span>
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DASHBOARD.map((d) => (
              <div key={d.tag} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                  {d.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="인지건강, 진단 이전에 시작해보세요"
        description={<>개인은 무료 검사로, 기관은 통합 대시보드로{" "}<span className="block md:inline">— 가장 빠르게 시작하는 방법을 선택하세요.</span></>}
        primaryAction={{ label: "무료 검사 시작", href: "/check", external: true }}
        secondaryAction={{ label: "기관 도입 문의", href: "/contact" }}
      />
    </>
  );
}
