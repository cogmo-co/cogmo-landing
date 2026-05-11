import Link from "next/link";
import MobileMenu, { type NavGroup } from "./MobileMenu";

const NAV_GROUPS: NavGroup[] = [
  {
    label: "소개",
    items: [
      { label: "브랜드 소개", href: "/about" },
      { label: "코그모스토리", href: "/story" },
      { label: "다운로드", href: "/download" },
      { label: "아티클", href: "/articles" },
    ],
  },
  {
    label: "서비스",
    items: [
      { label: "인지기능 검사 '안녕'", href: "/service-hi" },
      { label: "근골격계 기능 검사 FEA", href: "/service-fea" },
    ],
  },
  {
    label: "프로그램",
    items: [
      { label: "시니어 방문재활", href: "/rehab-visit" },
      { label: "근골격계 방문재활", href: "/rehab-postop" },
      { label: "기업 임직원 건강관리", href: "/healthcare-corporate" },
      { label: "시니어 그룹 건강관리", href: "/healthcare-senior" },
      { label: "유소년 건강관리", href: "/healthcare-youth" },
    ],
  },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/cogmo_logo.svg" alt="Cogmo" className="h-[1.4rem] w-auto" />
        </Link>

        {/* 우측: 데스크탑 nav 그룹 + CTA + 모바일 햄버거 */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 데스크탑 nav 그룹 (md 이상에서만) */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_GROUPS.map((g) => (
              <li key={g.label} className="group relative">
                <button type="button" className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-ink/80 transition hover:font-bold hover:text-primary">
                  {g.label}
                  <svg className="h-3 w-3 opacity-60" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="pointer-events-none invisible absolute left-0 top-full min-w-[220px] translate-y-1 rounded-xl border border-hairline bg-white p-2 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {g.items.map((i) => (
                    <Link key={i.label} href={i.href} className="block rounded-md px-3 py-2 text-sm text-ink/80 transition hover:bg-surface hover:font-bold hover:text-primary">
                      {i.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/download"
            className="rounded-lg border border-primary px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white md:px-5 md:py-2.5"
          >
            다운로드
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-dark md:px-5 md:py-2.5"
          >
            서비스 문의
          </Link>
          <MobileMenu groups={NAV_GROUPS} />
        </div>
      </nav>
    </header>
  );
}
