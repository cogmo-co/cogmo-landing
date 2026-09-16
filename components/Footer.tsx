import Link from "next/link";
import { COMPANY } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/cogmo_logo.svg"
              alt="Cogmo"
              className="h-[1.6rem] w-auto brightness-0 invert"
            />
            <p className="mt-4 leading-relaxed">
              사후 대응에서 사전 예방으로.
              <br />
              데이터 기반 시니어 인지건강 플랫폼.
            </p>
          </div>
          <div className="hidden md:block md:col-span-2">
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h6>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm transition hover:text-white">브랜드 소개</Link></li>
              <li><Link href="/story" className="text-sm transition hover:text-white">코그모 스토리</Link></li>
              <li><Link href="/articles" className="text-sm transition hover:text-white">아티클</Link></li>
              <li><Link href="/contact" className="text-sm transition hover:text-white">상담신청</Link></li>
            </ul>
          </div>
          <div className="hidden md:block md:col-span-3">
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h6>
            <ul className="space-y-2">
              <li><Link href="/service-hi" className="text-sm transition hover:text-white">인지기능 검사 &apos;안녕&apos;</Link></li>
              <li><Link href="/service-fea" className="text-sm transition hover:text-white">근골격계 기능 검사 FEA</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h6>
            <address className="text-sm not-italic leading-relaxed">
              {COMPANY.nameKo}
              {COMPANY.addressLines.map((line) => (
                <span key={line}>
                  <br />
                  {line}
                </span>
              ))}
              <br />
              <a
                href={`mailto:${COMPANY.email}`}
                className="transition hover:text-white"
              >
                {COMPANY.email}
              </a>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex flex-wrap justify-between gap-3">
            <span>© 2025 {COMPANY.nameEn} All rights reserved.</span>
            <span>
              사업자등록번호 {COMPANY.registrationNumber} · 대표이사 {COMPANY.ceo}
            </span>
          </div>
          {/* Flaticon 무료 라이선스는 출처 표기가 조건이다. 언어 스위처의 국기 아이콘
              (public/brand/flags/*.png)이 여기서 왔으므로 지우지 말 것. */}
          <p className="mt-3 text-white/40">
            국기 아이콘 제작자:{" "}
            <a
              href="https://www.flaticon.com/kr/free-icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition hover:text-white/70"
            >
              iconset.co – Flaticon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
