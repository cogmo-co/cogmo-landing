/**
 * 기능적 움직임 평가 FEA 서비스 페이지
 * 원본: https://www.cogmo.life/service-fea.html
 */

const OVERALL_TESTS = [
  { num: "01", title: "Body Rotation", desc: "체간 회전 능력을 평가합니다. 좌식 체간 회전, 고관절 내회전, 고관절 Figure 4 등 세부 테스트를 포함합니다." },
  { num: "02", title: "Body Extension", desc: "신체 신전 능력을 평가합니다. 어깨 굴곡, 체간 신전, 고관절 신전 등 세부 테스트로 구성됩니다." },
  { num: "03", title: "Body Flexion", desc: "신체 굴곡 능력을 평가합니다. 힙 힌지, 한 다리 들기, 롤업 등을 통해 굴곡 패턴을 확인합니다." },
  { num: "04", title: "Single Leg Step", desc: "한 다리 지지 능력을 평가합니다. 한 발 균형, 고관절 외전 등으로 보행과 일상 활동 기능을 확인합니다." },
  { num: "05", title: "Overhead Squat", desc: "스쿼트 패턴의 통합 움직임을 평가합니다. 스플릿 스쿼트, 무릎 전진, 한 다리 브릿지 등을 포함합니다." },
  { num: "06", title: "Shoulder 3-Point Reach", desc: "어깨 가동 범위를 3방향으로 평가합니다. 어깨 외회전, 어깨 Figure T 등 세부 테스트를 수행합니다." },
  { num: "07", title: "Standing Pull", desc: "당기기 패턴의 기능을 평가합니다. 어깨 신전, 어깨 외전 테스트를 통해 상지 기능을 확인합니다." },
  { num: "08", title: "Bird-Dog", desc: "코어 안정성과 밀기 패턴을 평가합니다. 푸시업, 백 아치 홀드 등으로 체간 안정화 능력을 확인합니다." },
];

const SCORING = [
  { tag: "O", title: "정상 수행", desc: "Overall Test를 정상적으로 수행하면 O 판정. 해당 항목의 Detail Test는 생략하고 만점을 부여합니다." },
  { tag: "X", title: "수행 불가", desc: "Overall Test를 수행하지 못하면 X 판정. Detail Test를 진행하여 제한의 원인을 세부적으로 분석합니다." },
  { tag: "⚠", title: "Alarm", desc: "통증이 발생하면 Alarm 판정.\n해당 영역의 점수는 0점 처리되며, 전문가 상담을 우선 권고합니다." },
];

const FOUNDATIONS = [
  { tag: "POSITIVE HEALTH", title: "건강 자산 관점", desc: "질병 유무가 아닌 개인이 보유한 건강 자산(Health Assets)에 집중합니다. 건강 증진(Health Promotion)을 통해 자산을 키우고 유지하는 것이 핵심입니다." },
  { tag: "FLIGHT ENVELOPE", title: "안전 움직임 영역", desc: "Flight Envelope Theory를 인체에 적용하여, 안전하게 움직일 수 있는 영역과 위험 영역의 경계를 파악하고 움직임 역량을 확장합니다." },
  { tag: "CONSTRAINT", title: "제약 주도 접근법", desc: "개인·과제·환경의 세 가지 제약 요인(Constraint Led Approach)을 고려하여 움직임을 분석하고 최적의 운동 방향성을 설계합니다." },
  { tag: "CATABOLISM", title: "사용하지 않으면 잃는다", desc: "이화작용(Catabolism)과 동화작용(Anabolism)의 균형 원리에 기반합니다. 움직이지 않으면 근력·유연성·균형 능력이 감소합니다." },
];

const USAGES = [
  { tag: "운동 방향성", title: "개인별 맞춤 운동처방", desc: "영역별 점수를 기반으로 개선이 필요한 움직임 패턴을 파악하고, 맞춤형 운동 프로그램으로 연결합니다." },
  { tag: "정기 모니터링", title: "변화 추적·비교", desc: "정기적 재평가를 통해 운동 효과를 정량적으로 비교하고, 프로그램의 방향을 조정합니다." },
  { tag: "현장 적용", title: "방문재활·헬스케어", desc: "20분 내외의 간결한 평가로 방문재활·그룹 헬스케어 현장에서 즉시 활용할 수 있습니다." },
];

export default function ServiceFeaPage() {
  return (
    <>
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Service · FEA
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            기능적 움직임 평가 FEA
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            20분 내외, 8가지 움직임으로 신체 기능 역량을 파악합니다.
            <br />
            100점 만점의 정량적 점수로 운동 방향성을 즉시 제시합니다.
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
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              움직임 역량을 파악하는
              <br />
              <span className="text-primary">기능적 운동 평가</span>
            </h2>
            <p className="mt-5 leading-relaxed text-body">
              FEA(Functional Exercise Assessment)는 인체의 주요 움직임 패턴을
              8가지 Overall Test와 18가지 Detail Test로 체계적으로 평가하는 기능
              검사 도구입니다. 총 100점 만점의 정량적 점수로 현재 신체 기능
              수준을 객관적으로 확인합니다.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              Positive Health 관점에서 &apos;질병이 없는 상태&apos;가 아닌{" "}
              <strong className="text-ink">건강 자산(Health Assets)</strong>에
              집중합니다. &quot;사용하지 않으면 잃는다(If you don&apos;t use it,
              lose it)&quot;는 원칙 아래, 개인의 움직임 역량을 파악하고 운동
              방향성을 제시합니다.
            </p>
          </div>
          {/* 폰 목업 + 4장 자동 슬라이드 (4s 구간 × 4장 = 16s 주기) */}
          <div className="relative mx-auto aspect-[9/19] w-full max-w-[260px] animate-fade-in-zoom rounded-[2rem] bg-ink p-1 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
            <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-white">
              {[1, 2, 3, 4].map((n, idx) => (
                <img
                  key={n}
                  src={`/images/service/FEA/main${n}.jpg`}
                  alt={`FEA 앱 화면 ${n}`}
                  className="absolute inset-0 h-full w-full animate-fea-slide object-cover object-top opacity-0"
                  style={{ animationDelay: `${idx * 4}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 Overall Tests */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              8 Overall Tests
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              8가지 <span className="text-primary">움직임 평가</span>
            </h2>
            <p className="mt-4 text-body">
              인체의 핵심 움직임 패턴을 8가지 테스트로 평가하고, 필요 시 18가지
              세부 테스트로 원인을 분석합니다.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {OVERALL_TESTS.map((t) => (
              <div key={t.num} className="rounded-2xl border border-hairline bg-white p-6">
                <span className="text-2xl font-black text-primary">{t.num}</span>
                <h3 className="mt-3 text-base font-bold text-ink">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring System */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Scoring System
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              100점 만점{" "}
              <span className="text-primary">O / X / Alarm</span> 평가 체계
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SCORING.map((s) => (
              <div key={s.tag} className="rounded-2xl border border-hairline bg-white p-8 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-black text-primary">
                  {s.tag}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-body">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-hairline bg-surface p-8 text-center">
            <h3 className="text-lg font-bold text-ink">5개 신체 영역별 점수</h3>
            <p className="mt-3 leading-relaxed text-body">
              총 100점은{" "}
              <strong className="text-ink">
                Core &amp; Balance · Vertebral Column · Hip · Shoulder · Lower Limb
              </strong>{" "}
              5개 영역으로 나뉘어 감산 방식으로 산출됩니다.
              <br />
              영역별 점수를 통해 개선이 필요한 부위를 명확히 파악할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section className="border-b border-hairline bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Foundation
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              FEA의 <span className="text-primary">이론적 기반</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {FOUNDATIONS.map((f) => (
              <div key={f.tag} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                  {f.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Usage
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              FEA는 이렇게 <span className="text-primary">활용됩니다</span>
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {USAGES.map((u) => (
              <div key={u.tag} className="rounded-2xl border border-hairline bg-white p-8">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary">
                  {u.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{u.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-40 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            움직임 역량, 20분 만에 확인하세요
          </h2>
          <p className="mt-5 text-lg text-white/80">
            방문재활·기업 헬스케어·연구 협력 등 FEA를 현장에 도입하고자 하신다면
            편하게 문의주세요.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.cogmo.life/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-7 py-3.5 font-medium text-primary transition hover:bg-white/90"
            >
              FEA 도입 문의
            </a>
            <a
              href="mailto:official@cogmo.life"
              className="rounded-lg border border-white/60 px-7 py-3.5 font-medium text-white transition hover:bg-white hover:text-primary"
            >
              연구 · 협력 제안
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
