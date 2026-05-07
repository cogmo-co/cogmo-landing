/**
 * Cogmo 랜딩페이지 — 메인
 * 구조: cogmo.life/index.html (9섹션) / 디자인: silviahealth.com 패턴
 * Tone: 화이트 배경 + #325131 primary
 * Nav / Footer는 app/layout.tsx에서 래핑
 */
import Image from "next/image";
import Link from "next/link";
import HeroPhoneMockup from "@/components/HeroPhoneMockup";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
        {/* ==========================================================
            Hero
            ========================================================== */}
        <section className="overflow-hidden border-b border-hairline bg-white">
          <div className="mx-auto max-w-5xl px-6 pt-24 text-center md:pt-32">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Digital Cognitive Health
            </p>
            <h1 className="mt-10 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-6xl">
              진단 이전에 시작하는
              <br />
              <span className="text-primary">인지건강 모니터링</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-body md:text-lg">
              건강한 시니어의 인지변화를 추적하고
              <br />
              초기 신호를 감지하여 선제적 대응을 돕습니다.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="/check"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-7 py-3.5 font-medium text-white transition hover:bg-primary-dark"
              >
                무료 검사 시작
              </a>
              <a
                href="https://www.cogmo.life/contact.html"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-primary/30 bg-white px-7 py-3.5 font-medium text-primary transition hover:border-primary hover:bg-primary/5"
              >
                기관 도입 문의
              </a>
            </div>

            {/* Phone mockup — fade-up 진입 후 종합점수에 슬롯머신 카운터 발동 */}
            <HeroPhoneMockup />
          </div>
        </section>

        {/* ==========================================================
            3. Core Service — 인지기능 검사 '안녕' (dual mockup)
            ========================================================== */}
        <section id="annyeong" className="border-b border-hairline bg-white py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Core Service
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
                인지기능 검사 <span className="text-primary">&apos;안녕&apos;</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
                기존의 인지 검사는 이미 경도인지장애에 도달한 사람을 진단하기 위한
                도구였습니다. 코그모 &apos;안녕&apos;은{" "}
                <strong className="text-ink">아직 건강한 시니어(Young-Old)</strong>의
                인지 기능을 모니터링하여{" "}
                <strong className="text-ink">
                  건강한 상태를 유지하고 초기 변화를 선제적으로 감지
                </strong>
                하는 서비스입니다.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "학습효과를 제거하는 동적 문제 세트",
                  "사용자 맞춤 AI 기반 결과 리포트",
                  "과거 점수 비교 · 동일 연령대 비교",
                  "누적 데이터 기반 변화 추적 · 이상 감지",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-body">
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-10 inline-block rounded-lg bg-primary px-7 py-3.5 font-medium text-white transition hover:bg-primary-dark">
                자세히 보기
              </a>
            </div>

            {/* Dual mockup — 좌: B2B 대시보드, 우: 안녕 앱 (세로로 길게 살짝 겹침) */}
            <div className="relative py-12 md:py-16">
              <Image
                src="/images/main/section2-1.jpg"
                alt="안녕 B2B 관리자 대시보드"
                width={1280}
                height={800}
                sizes="(max-width: 1024px) 80vw, 640px"
                className="w-[80%] h-auto"
                style={{ boxShadow: "0 20px 40px rgba(50, 81, 49, 0.08)" }}
              />
              {/* 우측 폰 — 세로 중앙 정렬, 상하로 대시보드 밖으로 삐져나옴 */}
              <div className="absolute right-0 top-1/2 w-[35%] -translate-y-1/2">
                <div className="relative aspect-[9/19] w-full rounded-[2rem] bg-ink p-1 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
                  {/* Screen */}
                  <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-white">
                    <Image
                      src="/images/main/section2-2.jpg"
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

        {/* ==========================================================
            4. For You — B2C / B2B / B2G
            ========================================================== */}
        <section id="targets" className="border-b border-hairline bg-surface py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                For You
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
                보호자부터 기관까지,{" "}
                <span className="text-primary">목적에 맞는 서비스</span>
              </h2>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  badge: "B2C",
                  title: "보호자",
                  desc: "부모님의 인지건강 점수를 확인하고, 변화를 지속적으로 추적합니다. 멀리 있어도 부모님의 건강 상태를 숫자로 확인할 수 있습니다.",
                  product: "일반사용자 앱 (준비중)",
                },
                {
                  badge: "B2B",
                  title: "돌봄 기관",
                  desc: "방문재활 · 요양보호 수행자가 수집한 데이터를 관리자가 모니터링하고, 보호자에게 리포트를 공유합니다.",
                  product: "기관용 앱 + 웹 대시보드",
                },
                {
                  badge: "B2G",
                  title: "공공기관",
                  desc: "보건소 · 치매안심센터의 담당 인력이 다수 시니어를 모니터링하고 선제적 관리를 수행합니다.",
                  product: "기관용 앱 + 웹 대시보드",
                },
              ].map((t) => (
                <article
                  key={t.badge}
                  className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-8 transition hover:border-primary/30 hover:shadow-[0_10px_30px_rgba(50,81,49,0.08)]"
                >
                  <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                    {t.badge}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink">{t.title}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-body">{t.desc}</p>
                  <span className="mt-6 text-sm font-medium text-primary">
                    {t.product}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
            5. Trust Stats
            ========================================================== */}
        <section id="stats" className="border-b border-hairline bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <dl className="grid grid-cols-2 gap-6 rounded-2xl bg-white px-6 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:grid-cols-5">
              {[
                { num: "3", unit: "차", label: "PoC 완료" },
                { num: "3,000", unit: "+", label: "누적 참여자" },
                { num: "2,300", unit: "+", label: "검사 완료" },
                { num: "4.8", unit: "만", label: "SNS 팔로워" },
                { num: "100", unit: "만", label: "월간 노출" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="flex items-baseline justify-center">
                    <span className="text-3xl font-black text-primary md:text-4xl">
                      {s.num}
                    </span>
                    <span className="ml-1 text-lg font-medium text-primary/80">
                      {s.unit}
                    </span>
                  </dt>
                  <dd className="mt-2 text-sm text-body">{s.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-center text-sm text-muted">
              인하대학교 스포츠재활과학연구소 공동 연구 · 물리치료사 + 스포츠과학
              전공 팀 구성
            </p>
          </div>
        </section>

        {/* ==========================================================
            6. Digital Assessment
            ========================================================== */}
        <section id="tools" className="border-b border-hairline bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Digital Assessment
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
                디지털 <span className="text-primary">검사 도구</span>
              </h2>
              <p className="mt-4 text-body">
                기존 검사를 디지털화하여 정량적 데이터를 수집하고 AI 기반 결과를
                제공합니다.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "인지기능 검사",
                  desc: "동적 문제 세트로 학습효과 없이 반복 측정이 가능합니다. AI 기반 맞춤 결과 리포트를 제공합니다.",
                  icon: "section3-1",
                  status: null,
                },
                {
                  title: "기능운동 검사 FEA",
                  desc: "신체 움직임을 검사하고 AI 기반 운동 처방을 자동 생성합니다. 수행자의 운동 지도를 돕습니다.",
                  icon: "section3-2",
                  status: null,
                },
                {
                  title: "근감소증 검사",
                  desc: "근감소 위험도를 정량적으로 측정하여 시니어의 신체 기능 변화를 객관적으로 추적합니다.",
                  icon: "section3-3",
                  status: "준비중",
                },
              ].map((t) => (
                <a
                  key={t.title}
                  href="#"
                  className="group flex h-full flex-col rounded-2xl border border-hairline bg-white p-8 transition hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(50,81,49,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/main/${t.icon}.svg`}
                      alt=""
                      className="h-7 w-7"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <h4 className="text-lg font-bold text-ink">{t.title}</h4>
                    {t.status && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        {t.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 flex-1 leading-relaxed text-body">{t.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition group-hover:gap-2">
                    자세히 보기 →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
            7. Programs
            ========================================================== */}
        <section id="programs" className="border-b border-hairline bg-surface py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Programs
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
                운동 · 재활 <span className="text-primary">프로그램</span>
              </h2>
              <p className="mt-4 text-body">
                물리치료사로 구성된 전문 팀이 직접 방문하여 운동 프로그램을
                제공합니다.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                {
                  category: "방문재활",
                  items: [
                    { title: "시니어 방문재활", desc: "근감소증 · 체력증진 · 낙상예방 · 보행", href: "/rehab-visit" },
                    { title: "근골격계 방문재활", desc: "척추 · 관절 · 인공관절 수술 후 재활", href: "/rehab-postop" },
                  ],
                },
                {
                  category: "그룹 건강관리",
                  items: [
                    { title: "기업 임직원 건강관리", desc: "오피스 스트레칭 · 체형 교정 · 세미나", href: "/healthcare-corporate" },
                    { title: "시니어 그룹 건강관리", desc: "바르게 걷기 · 근력 운동 · 낙상 예방", href: "/healthcare-senior" },
                    { title: "유소년 건강관리", desc: "키 성장 체조 · 체형 교정 · 근력 증진", href: "/healthcare-youth" },
                  ],
                },
              ].map((g) => (
                <div key={g.category}>
                  <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {g.category}
                  </h6>
                  <div className="mt-4 space-y-3">
                    {g.items.map((i) => (
                      <Link
                        key={i.title}
                        href={i.href}
                        className="group flex items-center justify-between rounded-xl border border-hairline bg-white p-5 transition hover:border-primary/40 hover:shadow-md"
                      >
                        <div>
                          <div className="font-semibold text-ink">{i.title}</div>
                          <div className="mt-1 text-sm text-body">{i.desc}</div>
                        </div>
                        <svg className="h-5 w-5 flex-none text-primary transition group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
            8. Final CTA
            ========================================================== */}
        <CTASection
          title="지금 바로 시작해보세요"
          description="기관 담당자는 도입 상담을, 가족은 무료 검사부터 경험해보세요."
          primaryAction={{ label: "무료 검사 시작", href: "/check", external: true }}
          secondaryAction={{ label: "기관 도입 문의", href: "/contact" }}
        />
    </>
  );
}
