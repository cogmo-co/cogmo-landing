import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image
              src="/brand/cogmo_logo.svg"
              alt="Cogmo"
              width={120}
              height={26}
              className="h-[1.6rem] w-auto brightness-0 invert"
            />
            <p className="mt-4 leading-relaxed">
              사후 대응에서 사전 예방으로.
              <br />
              데이터 기반 시니어 인지건강 플랫폼.
            </p>
          </div>
          <div className="md:col-span-2">
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h6>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm transition hover:text-white">브랜드 소개</Link></li>
              <li><Link href="/story" className="text-sm transition hover:text-white">코그모스토리</Link></li>
              <li><Link href="/contact" className="text-sm transition hover:text-white">상담신청</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
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
              코그모 주식회사
              <br />
              인천 미추홀구 인하로 100
              <br />
              인하대학교 인하드림센터 204A
              <br />
              <a href="mailto:official@cogmo.life" className="transition hover:text-white">
                official@cogmo.life
              </a>
            </address>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
          <span>© 2025 Cogmo Co., Ltd. All rights reserved.</span>
          <span>사업자등록번호 702-87-03690 · 대표이사 한석규</span>
        </div>
      </div>
    </footer>
  );
}
