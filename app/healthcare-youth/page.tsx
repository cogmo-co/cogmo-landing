/**
 * 유소년 건강관리 프로그램 상세 페이지
 * 원본: https://www.cogmo.life/healthcare-youth.html
 */
import ImageCarousel from "@/components/ImageCarousel";

const PARTNERS = [
  "롯데백화점 문화센터",
  "키즈모델에이전시",
  "케이팝아카데미 연습생",
  "초·중·고등학교",
];

const MODULES = [
  { num: "01", title: "키 성장 운동", desc: "성장판을 자극하고 척추 정렬을 돕는 점프·스트레칭 중심의 키 성장 루틴." },
  { num: "02", title: "자세 교정", desc: "굽은 등, 거북목, 골반 비대칭 등 학습기 아동·청소년의 대표적인 자세 문제를 바로잡습니다." },
  { num: "03", title: "근력 강화", desc: "성장기에 안전한 체중 기반 근력 운동으로 기초 체력과 코어 안정성을 키웁니다." },
  { num: "04", title: "키즈·틴 모델 트레이닝", desc: "키즈모델·연습생을 위한 자세·라인·기본 체력 트레이닝으로 무대 퍼포먼스를 뒷받침합니다." },
  { num: "05", title: "기초 체력 평가", desc: "유연성·근력·균형을 표준화된 방식으로 측정하여 아이의 현재 상태를 수치로 확인합니다." },
  { num: "06", title: "부상 예방 교육", desc: "아직 완성되지 않은 관절과 근육을 보호하기 위한 워밍업·쿨다운·안전 수칙 교육." },
];

const TARGETS = [
  { title: "문화센터 · 키즈 아카데미", desc: "백화점·지자체 문화센터의 키즈·틴 수강생 단체 프로그램." },
  { title: "키즈모델 · K-POP 아카데미", desc: "연습생·아티스트 지망생을 위한 자세·체형 관리와 기본 체력 트레이닝." },
  { title: "학교 · 유소년 스포츠 클럽", desc: "초·중·고 체육 수업, 학교 스포츠클럽, 유소년 스포츠팀." },
  { title: "지자체 청소년 사업", desc: "보건소·청소년센터·방과후 프로그램 등 지역 단위 청소년 건강 사업." },
  { title: "학원 · 교육 기관", desc: "장시간 앉아서 공부하는 수강생의 자세·체력 관리가 필요한 기관." },
  { title: "발레 · 무용 스튜디오", desc: "기본 체력과 바른 정렬이 기초가 되어야 하는 무용·공연 아카데미." },
];

export default function HealthcareYouthPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Program · Youth
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            유소년 건강관리 프로그램
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            키 성장 체조, 체형 교정, 근력 증진 — 건강한 성장을 위한 그룹 운동
            <br />
            체격·능력 편차가 큰 아이들도 각자의 수준으로 함께 운동할 수 있도록 설계.
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
              { src: "/images/program/young_care/main1.jpeg", alt: "유소년 건강관리 현장 1" },
              { src: "/images/program/young_care/main2.jpeg", alt: "유소년 건강관리 현장 2" },
              { src: "/images/program/young_care/main3.jpeg", alt: "유소년 건강관리 현장 3" },
              { src: "/images/program/young_care/main4.jpeg", alt: "유소년 건강관리 현장 4" },
              { src: "/images/program/young_care/main5.jpeg", alt: "유소년 건강관리 현장 5" },
              { src: "/images/program/young_care/main6.jpeg", alt: "유소년 건강관리 현장 6" },
            ]}
            className="aspect-[7/4] w-full animate-fade-in-zoom rounded-2xl border border-hairline bg-surface"
          />

          {/* 하단 텍스트 블록 */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Youth Program
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              초등 저학년부터 고등학생까지,{" "}
              <span className="text-primary">편차 큰 아이들 모두에게</span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              코그모의 유소년 프로그램은{" "}
              <strong className="text-ink">
                롯데백화점 문화센터, 키즈모델에이전시, 케이팝아카데미 연습생
              </strong>{" "}
              등 다양한 단체의 아이들에게
              <br />
              <strong className="text-ink">
                키 성장, 자세 교정, 근력 강화 운동 프로그램
              </strong>
              을 제공해왔습니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              초등 저학년부터 고등학생까지 체형과 근력의 편차가 큰 성장기
              아이들에게도 일관되게 적용할 수 있도록 설계되어, 한 그룹 안에
              키·체격·운동 능력이 다른 아이들이 섞여 있어도 각자의 수준에 맞춘
              세션을 운영할 수 있는 것이 강점입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h6 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Partners &amp; Groups
          </h6>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-body">
            {PARTNERS.map((p) => (
              <li key={p} className="text-base font-medium">
                {p}
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
              운동 프로그램 <span className="text-primary">구성</span>
            </h2>
            <p className="mt-4 text-body">
              성장기 아이들에게 필요한 6가지 핵심 모듈.
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
              Who It&apos;s For
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              이런 단체에 <span className="text-primary">추천합니다</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TARGETS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-hairline bg-white p-8">
                <h3 className="text-lg font-bold text-ink">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-40 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            아이들의 건강한 성장, 함께 시작합니다
          </h2>
          <p className="mt-5 text-lg text-white/80">
            문화센터·아카데미·학교 단위의 단체 프로그램을 체형·연령·목표에
            맞춰 설계해드립니다.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.cogmo.life/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-7 py-3.5 font-medium text-primary transition hover:bg-white/90"
            >
              프로그램 문의하기
            </a>
            <a
              href="https://www.cogmo.life/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/60 px-7 py-3.5 font-medium text-white transition hover:bg-white hover:text-primary"
            >
              기관 도입 상담
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
