import { NextResponse } from "next/server";
import {
  validateCredentials,
  createToken,
  checkCsrf,
  COOKIE_NAME,
} from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await checkCsrf())) {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 403 });
  }

  try {
    const { id, password } = await req.json();

    if (typeof id !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    if (!validateCredentials(id, password)) {
      return NextResponse.json(
        { error: "ID 또는 비밀번호가 틀렸습니다" },
        { status: 401 }
      );
    }

    const token = await createToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }
}
