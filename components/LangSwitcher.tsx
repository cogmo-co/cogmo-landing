"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, type LangCode } from "@/lib/i18n/dictionary";
import { useSelectLang } from "@/lib/i18n/LanguageContext";
import FlagIcon from "./FlagIcon";

/**
 * 언어 스위처 — 국기 + 두 글자 언어 코드. 전 페이지에 렌더한다.
 *
 * `current` 는 지금 화면이 실제로 그려진 언어다(components/Nav.tsx 의 effectiveLang).
 * 홈이 아닌 페이지는 본문이 한국어 전용이라 저장된 언어와 무관하게 ko 가 들어오고, 버튼에도
 * 한국어가 표시된다 — 버튼이 EN 인데 화면은 한국어인 상태를 만들지 않으려는 것.
 *
 * 그 페이지에서 비-한국어를 고르면 홈으로 보낸다. 번역본이 있는 페이지가 홈뿐이라, 그대로 두면
 * 고르고도 아무 일이 일어나지 않는 막다른 조작이 된다.
 */
export default function LangSwitcher({ current: currentCode }: { current: LangCode }) {
  const selectLang = useSelectLang();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === currentCode) ?? LANGS[0];

  function select(code: LangCode) {
    setOpen(false);
    selectLang(code);
  }

  // 바깥 클릭 시 닫기 — 해시 앵커 클릭처럼 pathname이 안 바뀌는 경우도
  // document 전체 클릭 리스너라 함께 커버됨.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`언어 선택 — 현재 ${current.label}`}
        className="flex items-center gap-1.5 rounded-lg border border-hairline px-2.5 py-1.5 text-xs font-semibold tracking-wide text-ink/80 transition hover:border-primary hover:text-primary"
      >
        <FlagIcon lang={current.code} />
        <span>{current.short}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-hairline bg-white py-1 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === currentCode}
              onClick={() => select(l.code)}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-surface ${
                l.code === currentCode ? "font-semibold text-primary" : "text-ink/80"
              }`}
            >
              <FlagIcon lang={l.code} size={16} />
              <span className="flex-1">{l.label}</span>
              <span className="text-xs text-muted">{l.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
