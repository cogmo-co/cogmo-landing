"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export interface NavGroup {
  label: string;
  items: { label: string; href: string }[];
}

interface MobileMenuProps {
  groups: NavGroup[];
}

export default function MobileMenu({ groups }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // 경로가 바뀌면 닫기 — 패널 밖(Nav 의 다운로드·서비스 문의 버튼, 로고)이나
  // 브라우저 뒤로가기로 이동한 경우까지 포함해서 열린 채로 남지 않도록 함
  useEffect(() => {
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

  // 패널: header(backdrop-blur) 의 containing block 영향 회피 위해 body에 portal
  const panel = (
    <div
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="네비게이션 메뉴"
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-hairline bg-white transition-opacity duration-200 md:hidden ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="px-6 py-4">
        {groups.map((g) => {
          const isExpanded = expanded === g.label;
          return (
            <div key={g.label} className="border-b border-hairline">
              <button
                type="button"
                onClick={() =>
                  setExpanded((prev) => (prev === g.label ? null : g.label))
                }
                aria-expanded={isExpanded}
                className={`flex w-full items-center justify-between rounded-md px-3 py-4 text-left text-lg font-semibold ${
                  isExpanded ? "bg-primary text-white" : "text-ink"
                }`}
              >
                {g.label}
                <ChevronDown
                  size={20}
                  className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {isExpanded && (
                <div className="flex flex-col gap-1 pb-4">
                  {g.items.map((i) => (
                    <Link
                      key={i.label}
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-base text-ink/70 transition hover:bg-surface hover:text-primary"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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
