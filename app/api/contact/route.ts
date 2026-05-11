import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const COMPANY_EMAIL = "official@cogmo.life";

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}

function validate(input: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "잘못된 요청" };
  const d = input as Record<string, unknown>;

  for (const f of ["name", "company", "email", "topic", "message"] as const) {
    if (typeof d[f] !== "string" || !(d[f] as string).trim()) {
      return { ok: false, error: `${f} 누락` };
    }
  }
  if (typeof d.email === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    return { ok: false, error: "이메일 형식 오류" };
  }
  return {
    ok: true,
    data: {
      name: (d.name as string).trim(),
      company: (d.company as string).trim(),
      email: (d.email as string).trim(),
      phone: typeof d.phone === "string" ? d.phone.trim() : "",
      topic: (d.topic as string).trim(),
      message: (d.message as string).trim(),
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = validate(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const data = result.data;

    // 1. 회사 알림 메일
    await resend.emails.send({
      from: "Cogmo Contact <noreply@cogmo.life>",
      to: [COMPANY_EMAIL],
      replyTo: data.email,
      subject: `[상담신청] ${data.topic} - ${data.company}`,
      text: [
        `이름: ${data.name}`,
        `소속: ${data.company}`,
        `이메일: ${data.email}`,
        `연락처: ${data.phone || "(미입력)"}`,
        `문의 유형: ${data.topic}`,
        ``,
        `[문의 내용]`,
        data.message,
      ].join("\n"),
    });

    // 2. 잠재고객 자동 회신
    await resend.emails.send({
      from: `Cogmo <${COMPANY_EMAIL}>`,
      to: [data.email],
      subject: "[Cogmo] 상담 신청이 접수되었습니다",
      text: [
        `안녕하세요, ${data.name}님.`,
        ``,
        `Cogmo 에 상담 신청해주셔서 감사합니다.`,
        `영업일 기준 1~2일 이내에 담당자가 연락드리겠습니다.`,
        ``,
        `[신청 내역]`,
        `문의 유형: ${data.topic}`,
        `내용: ${data.message}`,
        ``,
        `— Cogmo 드림`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact 메일 발송 실패:", e);
    return NextResponse.json({ error: "메일 발송 실패" }, { status: 500 });
  }
}