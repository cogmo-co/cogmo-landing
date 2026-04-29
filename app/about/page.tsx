/**
 * 브랜드 소개 페이지
 * 원본: https://www.cogmo.life/about.html
 */
import Image from "next/image";

const CARE_GAP = [
  { tag: "SENIOR", title: "시니어", desc: "병원 중심의 일회성 평가로 인해 일상 속 미세한 초기 변화(경도인지저하)를 놓치고 방치되는 경우가 많습니다." },
  { tag: "INSTITUTION", title: "재가 · 요양기관", desc: "다수 대상자의 상태 변화를 객관적으로 기록·통합 관리할 수 있는 표준화된 디지털 도구가 부재해 관리 효율이 떨어집니다." },
  { tag: "FAMILY", title: "보호자", desc: "퇴원 및 재가 전환 후 부모님의 상태를 체계적으로 파악하기 어려워 심리적 불안감과 돌봄 부담이 가중됩니다." },
];

const PARADIGM = [
  { num: "01", title: "일상 속 AI 모니터링", desc: "노화 과정에서 발생하는 점진적 인지 변화를 추적하여, 사후 진단이 아닌 위험 신호 단계에서 조기에 발견합니다." },
  { num: "02", title: "발병 지연 및 삶의 질 수호", desc: "사후 대응에서 벗어나 발병 시기를 늦추는 예방 패러다임으로 전환하여, 사회적 비용의 근본적 절감을 도모합니다." },
];

const COMPARE = [
  { label: "개입 시점 및 목적", old: "상당히 진행된 후의 사후 진단 및 단편적 평가", cogmo: "미세한 변화 조기 발견 및 발병 지연을 위한 선제적 예방" },
  { label: "관리 환경", old: "병원 중심의 일회성, 고비용 검사", cogmo: "재가·방문·커뮤니티 중심, 일상 속 정기적 모바일 모니터링" },
  { label: "생태계 연결성", old: "파편화된 정보, 기관–보호자 간 소통 단절", cogmo: "기관용 대시보드와 보호자 앱을 통한 실시간 데이터 연계·통합 관리" },
];

const TEAM = [
  { num: "01", title: "의료 · 재활 현장 전문가", desc: "물리치료·운동·재활 실무 경험을 바탕으로 시니어 인지·신체 기능 케어의 공백을 정확히 타겟팅합니다." },
  { num: "02", title: "탄탄한 현장 인프라", desc: "방문재활 및 요양 서비스 운영 구조에 대한 깊은 이해도를 바탕으로, 시니어 관련 기관 파트너십을 이미 확보하고 있습니다." },
  { num: "03", title: "실행력 (Execution)", desc: "현장 경험에서 출발해 SNS 마케팅 채널 구축, 실증 데이터 확보, 서비스 출시까지 이뤄낸 압도적 실행력이 코그모의 핵심 DNA입니다." },
];

const ACHIEVEMENTS = [
  { tag: "선정", title: "2025 예비창업패키지 선정", desc: "중소벤처기업부 주관 사업 선정으로 비즈니스 모델의 공공성 및 사업성 공식 검증." },
  { tag: "특허 2건", title: "핵심 기술 단독 출원", desc: "'인공지능 기반 인지 건강관리 방법 및 시스템', '맞춤형 인지기능검사 결과 제공 로직' 특허 출원." },
  { tag: "등록 완료", title: "상표권 등록", desc: "'코그모' 브랜드 상표권(42류·44류·09류) 조기 확보를 통해 강력한 기술 보호막 구축." },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-5 md:py-7">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            About Cogmo
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            브랜드 소개
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            초고령 시대, 인지건강 관리의 새로운 기준을 만들겠습니다.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-hairline bg-white pb-36 pt-14">
        <div className="mx-auto max-w-5xl px-6">
          {/* 상단: 16:9 브랜드 메인 이미지 */}
          <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-hairline bg-surface">
            <Image
              src="/images/about/brand-main-2.png"
              alt="스마트폰으로 '안녕' 앱을 함께 보는 시니어 커플"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </figure>

          {/* 하단: 이미지와 동일 폭으로 텍스트 */}
          <div className="mt-[4.5rem]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Mission &amp; Vision
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              사후 대응에서 <span className="text-primary">사전 예방</span>으로,
              <br />
              시니어 헬스케어의 새로운 패러다임
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              코그모는 초고령사회 진입과 함께 커지는 시니어 건강관리 공백을
              해결하기 위해 설립되었습니다. 현장에서 시니어를 직접 만나며,
              신체기능이 비교적 양호한 경우에도 인지기능 저하가 발생하면 일상과
              사회적 활동 전반에 큰 제약이 생기는 모습을 확인하였고, 이를 조기에
              관리할 수 있는 서비스의 필요성을 절감하였습니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              <strong className="text-ink">우리의 미션</strong>은 시니어의
              인지건강과 기능 저하를 더 이른 시점에 발견하고 지속적으로 관리할 수
              있는 환경을 만드는 것입니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              <strong className="text-ink">우리의 비전</strong>은 데이터 기반의
              예방형 시니어 헬스케어 서비스를 통해 재가·방문·커뮤니티 환경에서도
              활용 가능한 새로운 건강관리 기준을 제시하는 것입니다.
            </p>
          </div>
        </div>
      </section>

      {/* The Care Gap */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              The Care Gap
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              현장에서 발생하는 <span className="text-primary">3중 관리 공백</span>
            </h2>
            <p className="mt-4 text-body">
              사후 진단 중심 체계가 놓치는 세 영역의 공백을 해결합니다.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CARE_GAP.map((c) => (
              <div key={c.tag} className="rounded-2xl border border-hairline bg-white p-8">
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

      {/* Paradigm Shift */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Paradigm Shift
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              진단이 아닌{" "}
              <span className="text-primary">&apos;일상 속 조기 발견&apos;</span>으로
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PARADIGM.map((p) => (
              <div key={p.num} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="text-2xl font-black text-primary">{p.num}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Differentiation
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              기존 관리 방식의 한계를 극복하는{" "}
              <span className="text-primary">3대 차별성</span>
            </h2>
          </div>
          <div className="mt-14 overflow-hidden rounded-2xl border border-hairline bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-surface text-sm">
                  <th className="w-1/4 px-6 py-4 text-left font-semibold text-ink">비교 항목</th>
                  <th className="px-6 py-4 text-left font-semibold text-ink">기존 치매 관리 체계</th>
                  <th className="bg-primary/10 px-6 py-4 text-left font-semibold text-primary">코그모 (예방형 관리 모델)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.label} className="border-t border-hairline text-sm">
                    <td className="px-6 py-4 font-semibold text-ink">{r.label}</td>
                    <td className="px-6 py-4 text-body">{r.old}</td>
                    <td className="bg-primary/10 px-6 py-4 font-medium text-ink">{r.cogmo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Core Team
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              현장의 문제를 가장 잘 아는{" "}
              <span className="text-primary">실무 밀착형 전문가 팀</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TEAM.map((t) => (
              <div key={t.num} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="text-2xl font-black text-primary">{t.num}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Achievements
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              진입장벽 구축:{" "}
              <span className="text-primary">기술 특허 및 주요 성과</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="rounded-2xl border border-hairline bg-white p-8 text-center">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                  {a.tag}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-40 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            초고령 시대, 함께 새로운 기준을 만들어갑니다
          </h2>
          <p className="mt-5 text-lg text-white/80">
            기관 도입, 협력 제안, 공공사업 참여 — 어떤 형태든 편하게 문의주세요.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.cogmo.life/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-7 py-3.5 font-medium text-primary transition hover:bg-white/90"
            >
              협력 · 도입 문의
            </a>
            <a
              href="mailto:official@cogmo.life"
              className="rounded-lg border border-white/60 px-7 py-3.5 font-medium text-white transition hover:bg-white hover:text-primary"
            >
              이메일로 연락
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
