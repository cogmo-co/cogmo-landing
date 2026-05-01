import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "cogmo_admin_token";
const EXPIRES_IN = "8h";
const ALLOWED_ORIGINS = [
  "https://cogmo.life",
  "https://www.cogmo.life",
  "https://cogmo-landing.vercel.app", // 도메인 연결 후 제거
  "http://localhost:3000",
];

export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(EXPIRES_IN)
    .sign(SECRET);
}

export async function verifyToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export function validateCredentials(id: string, password: string): boolean {
  return id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD;
}

export async function checkCsrf(): Promise<boolean> {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export { COOKIE_NAME };
