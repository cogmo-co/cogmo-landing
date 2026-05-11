/**
 * 상담신청 페이지
 * 원본: https://www.cogmo.life/contact.html
 * 톤: 화이트 + #325131 primary, about/page.tsx와 동일한 헤더 패턴
 */
"use client";

import { useState } from "react";

const TOPICS = [
  "서비스 도입 문의",
  "파트너십·제휴",
  "재활 프로그램 신청",
  "헬스케어 프로그램 신청",
  "투자·IR",
  "기타",
];

const FAQS = [
  {
    q: "도입 비용은 어떻게 되나요?",
    a: "방문요양·통합재가·재가의료센터 등 기관 유형과 이용자 수에 따라 맞춤 견적을 제공합니다. 상담 신청 시 안내드립니다.",
  },
  {
    q: "설치·준비 기간은 얼마나 걸리나요?",
    a: "대부분 기관은 계약 후 1~2주 이내에 '안녕' 앱 배포와 대시보드 계정 생성을 완료할 수 있습니다.",
  },
  {
    q: "개인정보는 안전하게 관리되나요?",
    a: "모든 데이터는 국내 클라우드에 암호화 저장되며, 개인정보보호법과 관련 법령을 준수합니다.",
  },
  {
    q: "재활·헬스케어 프로그램은 어디서 신청하나요?",
    a: "이 페이지의 상담 신청 폼에 원하시는 프로그램명을 남겨주시면 담당자가 직접 연락드립니다.",
  },
];

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    topic: TOPICS[0],
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "발송에 실패했습니다");
      }
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", topic: TOPICS[0], message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "발송에 실패했습니다");
    }
  };

  return (
    <>
      {/* Page header */}
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            상담신청
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            기관 도입, 파트너십, 프로그램 신청 등 편하게 문의주세요.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-hairline bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Get in Touch
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              코그모와 <span className="text-primary">함께 시작하세요</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-body md:text-lg">
              기관 도입, 파트너십, 투자·협력 등 편하게 연락주세요.
              <br />
              담당자가 확인 후 연락드리겠습니다.
            </p>
          </div>

          <div className="mt-14 rounded-2xl border border-hairline bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="이름"
                  required
                  placeholder="담당자 이름"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  label="소속"
                  required
                  placeholder="기관·회사명"
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                />
                <Field
                  label="이메일"
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Field
                  label="연락처"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">
                  문의 유형
                </label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">
                  문의 내용 <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="상담을 원하시는 내용을 상세히 적어주세요."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 w-full resize-none rounded-lg border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full cursor-pointer rounded-lg bg-primary px-7 py-3.5 font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                  {status === "submitting" ? "전송 중..." : "상담 신청하기"}
                </button>

                {status === "success" && (
                  <p className="mt-4 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
                    상담 신청이 정상적으로 접수되었습니다. 영업일 기준 1~2일 내 회신드리겠습니다.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMsg} — 잠시 후 다시 시도하시거나{" "}
                    <a
                      href="mailto:official@cogmo.life"
                      className="underline underline-offset-2"
                    >
                      official@cogmo.life
                    </a>
                    {" "}으로 직접 연락 부탁드립니다.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              자주 묻는 <span className="text-primary">질문</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-hairline bg-white p-7 transition hover:border-primary/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <h3 className="flex items-start gap-3 text-base font-bold text-ink">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    Q
                  </span>
                  {f.q}
                </h3>
                <p className="mt-4 pl-9 text-sm leading-relaxed text-body">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-hairline bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
