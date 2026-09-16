"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_GROUPS } from "@/lib/navigation";
import { LANGS, translate, type LangCode } from "@/lib/i18n/dictionary";
import { useSelectLang } from "@/lib/i18n/LanguageContext";
import FlagIcon from "./FlagIcon";

/** 언어 아코디언의 expanded 키. NAV_GROUPS 의 key 와 겹치면 안 된다. */
const LANG_KEY = "__lang";

interface MobileMenuProps {
  /**
   * 한국어일 때만 대분류를 펼쳐 하위 페이지를 보여준다. 그 외 언어에서는 번역본이 홈뿐이라
   * 대분류가 홈 섹션으로 가는 단일 링크가 된다 — 데스크톱과 같은 규칙(components/Nav.tsx 참고).
   */
  showSiteNav: boolean;
  lang: LangCode;
}

export default function MobileMenu({ showSiteNav, lang }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const selectLang = useSelectLang();
  const t = (key: string) => translate(lang, key);

  // 경로가 바뀌면 닫기 — 패널 밖(헤더의 CTA, 로고)이나 브라우저 뒤로가기로 이동한 경우까지
  // 포함해서 열린 채로 남지 않도록 함
  useEffect(() => {
    // 외부 상태(라우터)를 React state 로 끌어오는 동기화라 effect 에서의 setState 가 맞는 자리다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Portal: SSR에서 document 없으므로 mount 후에만 렌더 (cascading render 회피 위해 microtask로)
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  // ESC 로 닫기
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // 메뉴 열림 동안 body 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // 패널: header 가 sticky(=positioned) 라 그 안에 두면 containing block 에 묶인다 — body 로 portal
  const panel = (
    <div
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="네비게이션 메뉴"
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col border-t border-hairline bg-white transition-opacity duration-200 md:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* 스크롤은 루트가 아니라 이 안쪽에 둔다 — 루트에 두면 아래 고정 바까지 같이 밀려 올라간다 */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* 언어는 목적지가 아니라 모드 전환이라 맨 위에 둔다. 한국어가 아니면 아래 대분류가
            하위 페이지 대신 홈 섹션 링크로 바뀌므로, 언어 선택이 메뉴의 내용을 바꾼다.
            접힌 상태에서 현재 언어의 국기와 원어 이름을 보여주므로 펼치지 않아도 알 수 있다.
            expanded 상태를 대분류와 공유해서 한 번에 하나만 열린다 — 키가 겹치지 않게
            NAV_GROUPS 에 없는 이름을 쓴다. */}
        <div className="mb-5 border-b border-hairline">
          <button
            type="button"
            onClick={() => setExpanded((prev) => (prev === LANG_KEY ? null : LANG_KEY))}
            aria-expanded={expanded === LANG_KEY}
            className={`flex w-full items-center justify-between rounded-md px-3 py-4 text-left text-lg font-semibold ${
              expanded === LANG_KEY ? "text-primary" : "text-ink"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FlagIcon lang={lang} size={20} />
              {LANGS.find((l) => l.code === lang)?.label}
            </span>
            <ChevronDown
              size={20}
              className={`transition-transform ${expanded === LANG_KEY ? "rotate-180" : ""}`}
            />
          </button>
          {expanded === LANG_KEY && (
            <div className="grid grid-cols-3 gap-2 pb-4">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  aria-current={l.code === lang}
                  onClick={() => {
                    setOpen(false);
                    selectLang(l.code);
                  }}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${
                    l.code === lang
                      ? "border-primary font-semibold text-primary"
                      : "border-hairline text-ink/80"
                  }`}
                >
                  <FlagIcon lang={l.code} size={16} />
                  {l.short}
                </button>
              ))}
            </div>
          )}
        </div>
        {NAV_GROUPS.map((g) => {
          const label = t(g.labelKey);

          if (!showSiteNav) {
            return (
              <Link
                key={g.key}
                href={g.homeAnchor}
                onClick={() => setOpen(false)}
                className="block border-b border-hairline px-3 py-4 text-lg font-semibold text-ink"
              >
                {label}
              </Link>
            );
          }

          const isExpanded = expanded === g.key;
          return (
            <div key={g.key} className="border-b border-hairline">
              <button
                type="button"
                onClick={() => setExpanded((prev) => (prev === g.key ? null : g.key))}
                aria-expanded={isExpanded}
                className={`flex w-full items-center justify-between rounded-md px-3 py-4 text-left text-lg font-semibold ${
                  isExpanded ? "text-primary" : "text-ink"
                }`}
              >
                {label}
                <ChevronDown
                  size={20}
                  className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {isExpanded && (
                <div className="pb-4">
                  {g.columns.map((col, ci) => (
                    <div key={col.heading ?? ci} className="mt-1">
                      {/* 소분류 머리 — 데스크톱 메가패널은 열로 나뉘어 있어 글자만으로도
                          구분되지만, 모바일은 한 줄로 이어 붙어서 항목들과 섞여 읽힌다.
                          옅은 회색 띠(bg-surface)를 깔아 구획을 만든다. */}
                      {col.heading && (
                        <p className="mb-1 mt-3 rounded-md bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                          {col.heading}
                        </p>
                      )}
                      {col.items.map((i) => (
                        <Link
                          key={i.href}
                          href={i.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-3 py-2.5 transition hover:bg-surface"
                        >
                          <span className="block text-base text-ink/80">{i.label}</span>
                          {i.desc && (
                            <span className="mt-0.5 block text-xs text-muted">{i.desc}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* 데스크톱에서 헤더 오른쪽에 있던 CTA 2개. 헤더 한 줄에 다 넣으면 폭이 모자라
          로고까지 눌리므로 모바일에서는 패널 맨 아래 고정 바로 내린다. 메뉴를 얼마나
          스크롤하든 엄지 닿는 자리에 그대로 있다. */}
      <div className="flex-none border-t border-hairline px-6 py-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="준비중"
            className="cursor-not-allowed rounded-lg border border-hairline px-3 py-3 text-center text-sm font-medium text-muted"
          >
            {t("header.try_assessment")}
          </button>
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-primary px-3 py-3 text-center text-sm font-semibold text-white"
          >
            {t("header.download")}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-10 w-10 items-center justify-center text-ink/80 md:hidden"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
