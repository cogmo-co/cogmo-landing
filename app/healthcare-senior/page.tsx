/**
 * 시니어 그룹 건강관리 프로그램 상세 페이지
 * 원본: https://www.cogmo.life/healthcare-senior.html
 */
import ImageCarousel from "@/components/ImageCarousel";
import CTASection from "@/components/CTASection";

const PARTNERS = [
  "제이액터스 시니어 모델에이전시",
  "지역 복지관",
  "백화점·지자체 문화센터",
  "시니어 커뮤니티",
];

const MODULES = [
  { num: "01", title: "건강하게 걷기", desc: "올바른 자세와 호흡, 보폭으로 일상 걷기를 '운동'으로 바꾸는 교정 프로그램." },
  { num: "02", title: "근감소증 예방", desc: "하체 중심의 저항성 운동으로 나이와 함께 빠르게 감소하는 근육량을 지켜냅니다." },
  { num: "03", title: "낙상 예방", desc: "균형 감각·코어 안정성·발목 가동성을 훈련해 넘어짐 사고의 위험을 낮춥니다." },
  { num: "04", title: "자세 교정 스트레칭", desc: "오랜 시간 고착된 라운드 숄더·굽은 등을 풀어주는 시니어 맞춤 이완 루틴." },
  { num: "05", title: "액티브 시니어 서킷", desc: "시니어 모델 에이전시와 공동 개발한, 보다 활동적인 시니어를 위한 중강도 서킷 트레이닝." },
  { num: "06", title: "인지 운동 결합", desc: "간단한 동작에 인지 과제를 결합하여 치매 예방 효과까지 도모합니다." },
];

const TARGETS = [
  { title: "지역 복지관", desc: "회원 단위 정기 운동 프로그램·건강 강좌 운영이 필요한 종합·노인 복지관." },
  { title: "문화센터", desc: "백화점·지자체 문화센터의 시니어 회원 대상 강좌." },
  { title: "시니어 커뮤니티", desc: "동호회·종교 기관·시니어 모델 등 액티브 시니어 모임." },
  { title: "지자체 사업", desc: "보건소·치매안심센터·주민센터 등 공공 시니어 건강 사업." },
  { title: "기업 시니어 복지", desc: "퇴직자·은퇴자 대상 건강 프로그램을 운영하는 기업." },
  { title: "요양·케어 기관", desc: "입소자·이용자의 기능 유지·낙상 예방을 위한 정기 세션이 필요한 기관." },
];

export default function HealthcareSeniorPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Program · Senior Group
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            시니어 그룹{" "}
            <span className="block md:inline">건강관리 프로그램</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            문화센터·복지관·시니어 커뮤니티를 위한{" "}
            <span className="block md:inline">전문 운동 프로그램</span>
            {/* <br /> */}
            정적인 &apos;노인 체조&apos;를 넘어,
            지금의 액티브 시니어에게 맞는 운동.
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
              { src: "/images/program/senior_health/main1.jpg", alt: "시니어 그룹 건강관리 현장 1" },
              { src: "/images/program/senior_health/main2.jpg", alt: "시니어 그룹 건강관리 현장 2" },
            ]}
            className="aspect-[7/4] w-full animate-fade-in-zoom rounded-2xl border border-hairline bg-surface"
          />

          {/* 하단 텍스트 블록 */}
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Active Senior Care
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              지금의 시니어는{" "}
              <span className="block md:inline">
                <span className="text-primary">young-old</span>입니다
              </span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              코그모는 복지관, 문화센터, 시니어 커뮤니티의 회원들과 시니어
              모델에게{" "}
              <strong className="text-ink">
                건강하게 걷기, 근감소증 예방, 낙상 예방
              </strong>
              을 중심으로 한 다양한 운동 프로그램을 제공해왔습니다. 기존의 정적인
              &apos;노인 체조&apos;와는 결이 다른, 지금의 액티브 시니어에게 맞는
              운동을 목표로 합니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              특히{" "}
              <strong className="text-ink">
                액티브 시니어의 대명사 시니어 모델 에이전시 제이액터스
              </strong>
              와 함께 공동 개발한 운동 프로그램을 보유하고 있어, 단순한 건강
              유지를 넘어 시니어 세대의 실제 라이프스타일과 니즈에 맞는 운동을
              제공합니다.
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
              걷기부터 낙상 예방까지, 시니어 세대에게 꼭 필요한 6가지 핵심 모듈.
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
              이런 기관·단체에 <span className="text-primary">추천합니다</span>
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

      <CTASection
        title={<>액티브 시니어의 일상,{" "}<span className="block md:inline">함께 설계해드립니다</span></>}
        description={<>복지관·문화센터·시니어 커뮤니티 단위의 정기 프로그램부터 단체세미나까지,<br />규모에 맞춰 제안드릴게요.</>}
        primaryAction={{ label: "프로그램 문의", href: "/contact" }}
        secondaryAction={{ label: "기관 도입 상담", href: "/contact" }}
      />
    </>
  );
}
