"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/navigation";
import { DEFAULT_LANG, translate } from "@/lib/i18n/dictionary";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnnyeongLogo from "./AnnyeongLogo";
import LangSwitcher from "./LangSwitcher";
import MobileMenu from "./MobileMenu";

/** 브랜드 한 줄에서 A·B·C 이니셜만 살리는 표시용 래퍼 */
function Initial({ children }: { children: string }) {
  return <span className="font-bold text-primary">{children}</span>;
}

/**
 * 사이트 공통 헤더 — 홈과 나머지 페이지가 같은 컴포넌트를 쓴다.
 *
 * 언어에 따라 **라벨과 위치는 그대로 두고 목적지만 바뀐다**:
 * - 한국어: 대분류를 펼치면 하위 페이지(/service-hi, /about …)로 나간다.
 * - 그 외 언어: 번역본이 있는 페이지가 홈뿐이라 하위 페이지로 보내면 읽을 수 없는 막다른
 *   링크가 된다. 그래서 드롭다운 없이 홈 안의 섹션 앵커로만 보낸다.
 *
 * 홈이 아닌 페이지는 본문이 한국어 전용이므로 저장된 언어를 무시하고 항상 한국어로 그리고,
 * 언어 스위처도 감춘다 — 거기서 언어를 고를 수 있으면 헤더만 영어가 되는 상태가 만들어진다.
 *
 * 하위 페이지들이 번역되면 `isMultilingual` 조건만 넓히면 그대로 확장된다.
 */
export default function Nav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  // 패널을 여는 건 CSS(hover/focus-within)지만 **닫는 건 CSS 로 안 된다** — 링크를 누른 자리가
  // 패널 안이라 라우팅이 끝나도 마우스는 여전히 li 위에 있고, 누른 링크는 포커스를 쥔 채 남는다.
  // 그래서 "방금 눌렀음" 상태를 두고 그동안만 패널을 강제로 감춘다. 다시 네비 항목에 마우스를
  // 올리면(pointerenter) 풀린다. JS 가 없으면 이 상태가 아예 켜지지 않으므로 CSS 동작 그대로다.
  const [dismissed, setDismissed] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 첫 렌더에는 닫을 게 없다. 뒤로가기/앞으로가기 같은 경로 변경만 잡는다.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(true);
  }, [pathname]);

  const isMultilingual = pathname === "/";
  const effectiveLang = isMultilingual ? lang : DEFAULT_LANG;
  const showSiteNav = effectiveLang === DEFAULT_LANG;
  const t = (key: string) => translate(effectiveLang, key);

  // 헤더 지면은 불투명 흰색이다. 예전 bg-white/90 + backdrop-blur 는 스크롤된 페이지가 비쳐
  // 네비 라벨과 겹쳐 읽혔고, 메가 패널(불투명)이 열리면 헤더만 비쳐 두 장으로 갈려 보였다.
  return (
    <header
      className="group/nav sticky top-0 z-50 border-b border-hairline bg-white"
      data-dismissed={dismissed ? "true" : undefined}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        {/* 좌: 로고 + 언어.
            언어 스위처는 홈이 아닌 페이지에도 둔다 — 홈에서만 보이면 왼쪽 그룹의 폭이 달라져
            가운데 대분류 메뉴 위치가 페이지마다 흔들린다. 대신 번역본이 홈뿐이라, 다른 페이지에서
            비-한국어를 고르면 LangSwitcher 가 홈으로 보낸다. */}
        <div className="flex flex-none items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/cogmo_logo.svg" alt="Cogmo" className="h-4 w-auto" />
            <AnnyeongLogo className="h-6 w-auto text-primary" />
          </Link>
          {/* 모바일에서는 헤더에 로고와 햄버거만 둔다 — 언어와 CTA 까지 한 줄에 넣으면
              폭이 모자라 눌린다. 둘 다 햄버거 패널 안에 있다. */}
          <div className="hidden md:block">
            <LangSwitcher current={effectiveLang} />
          </div>
        </div>

        {/* 중앙: 대분류 3개 */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_GROUPS.map((g) => (
            // li 를 헤더 높이만큼 채운다 — 버튼과 패널 사이에 li 바깥 영역이 생기면
            // 마우스가 그 틈을 지나는 순간 group-hover 가 풀려 패널이 닫힌다.
            // relative 를 주지 않는 것도 의도 — 패널이 li 가 아니라 sticky 인 <header> 를
            // 기준으로 잡혀야 전체폭 시트가 된다.
            <li
              key={g.key}
              className="group flex h-16 items-center"
              onPointerEnter={() => setDismissed(false)}
            >
              {showSiteNav ? (
                <>
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-ink/80 transition group-hover:text-primary group-focus-within:text-primary"
                  >
                    {t(g.labelKey)}
                    <svg
                      className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M3 4.5 6 7.5 9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {/* 패널 — 헤더에 붙는 전체폭 시트. 떠 있는 카드가 아니라 지면이 한 장 더
                      내려오는 인상이라 라운드·그림자를 쓰지 않는다.
                      hover 뿐 아니라 focus-within 으로도 열려야 키보드로 닿는다. JS 는 안 쓴다. */}
                  <div className="pointer-events-none invisible absolute inset-x-0 top-full z-50 group-data-[dismissed=true]/nav:hidden border-b border-hairline bg-white opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
                    <div className="mx-auto w-full max-w-5xl px-6 py-12">
                      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                        {g.columns.map((col, ci) => (
                          <div key={col.heading ?? ci} className="min-w-56">
                            {col.heading && (
                              <p className="mb-4 text-sm font-semibold text-primary">
                                {col.heading}
                              </p>
                            )}
                            <div className="space-y-5">
                              {col.items.map((i) => (
                                <Link
                                  key={i.href}
                                  href={i.href}
                                  onClick={() => setDismissed(true)}
                                  className="group/item block"
                                >
                                  <span className="block text-base font-bold text-ink transition group-hover/item:text-primary">
                                    {i.label}
                                  </span>
                                  {i.desc && (
                                    <span className="mt-1 block text-sm text-muted">{i.desc}</span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* 패널을 닫는 브랜드 한 줄. 링크를 두지 않는 건 여기 놓을 만한 게 전부
                        이미 화면에 있기 때문 — 앱 다운로드는 바로 위 헤더 버튼이고 서비스 문의는
                        비즈니스 패널 안에 있다. A·B·C 첫 글자만 살려 약어를 설명하지 않고 보여준다. */}
                    <div className="border-t border-hairline bg-surface">
                      <p className="mx-auto w-full max-w-5xl px-6 py-4 text-center text-sm tracking-wide text-muted">
                        <Initial>A</Initial>ssessment <Initial>B</Initial>ased{" "}
                        <Initial>C</Initial>ustomer 플랫폼, 안녕
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={g.homeAnchor}
                  className="block rounded-md px-4 py-2 text-sm font-medium text-ink/80 transition hover:text-primary"
                >
                  {t(g.labelKey)}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* 우: CTA 2개 + 모바일 햄버거 */}
        <div className="flex flex-none items-center gap-2">
          {/* 안녕 인지기능 검사 미니 웹(annyeong-check-app)이 미배포라 비활성으로 둔다.
              TODO: 배포 후 <a href={주소} target="_blank" rel="noopener noreferrer"> 로 교체. */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="준비중"
            className="hidden cursor-not-allowed rounded-lg border border-hairline px-4 py-2.5 text-sm font-medium text-muted md:inline-block"
          >
            {t("header.try_assessment")}
          </button>
          <Link
            href="/download"
            className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark md:inline-block"
          >
            {t("header.download")}
          </Link>
          <MobileMenu showSiteNav={showSiteNav} lang={effectiveLang} />
        </div>
      </nav>
    </header>
  );
}
