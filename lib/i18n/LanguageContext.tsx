"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { DEFAULT_LANG, I18N, translate, type LangCode } from "./dictionary";

const STORAGE_KEY = "annyeong_landing_lang";

interface LanguageContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR과 첫 클라이언트 렌더는 항상 기본값(ko)으로 시작 — hydration mismatch 방지.
  // 저장된 언어 선호는 마운트 후 useEffect에서 동기화한다(재방문자는 한 프레임 깜빡일 수 있음, 합의된 트레이드오프).
  const [lang, setLangState] = useState<LangCode>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (saved && I18N[saved]) {
        // localStorage 동기화는 외부 시스템(브라우저 저장소)에서 React state로 값을 끌어오는
        // 것이므로 useEffect에서의 setState가 맞는 패턴이다(MobileMenu.tsx의 기존 전례와 동일).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage 접근 불가 환경(프라이빗 모드 등) — 기본값 유지
    }
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
    document.documentElement.lang = code;
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export function useT() {
  return useLanguage().t;
}

/**
 * 언어 선택 동작. 데스크톱 드롭다운(components/LangSwitcher.tsx)과 모바일 패널
 * (components/MobileMenu.tsx)이 같은 규칙을 쓰도록 한곳에 둔다.
 *
 * 번역본이 있는 페이지가 홈뿐이라, 홈이 아닌 곳에서 비-한국어를 고르면 홈으로 보낸다.
 * 그러지 않으면 고르고도 아무 일이 일어나지 않는 막다른 조작이 된다.
 */
export function useSelectLang() {
  const { setLang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (code: LangCode) => {
      setLang(code);
      if (code !== DEFAULT_LANG && pathname !== "/") router.push("/");
    },
    [setLang, pathname, router]
  );
}
