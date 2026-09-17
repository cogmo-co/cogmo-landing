"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";

const QUESTIONS = [1, 2, 3, 4, 5] as const;

function FaqItem({ n }: { n: (typeof QUESTIONS)[number] }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 px-7 py-6 text-left text-lg font-semibold text-ink"
      >
        <span>{t(`faq.q${n}`)}</span>
        {/* + -> - . 글자 "+" 를 45도 돌리면 "x" 가 되어 버리므로, 막대 두 개로 그린다.
            세로 막대만 90도 돌려 가로 막대에 겹치면 "-" 만 남는다. */}
        <span
          className="relative flex h-6 w-6 flex-none items-center justify-center text-primary"
          aria-hidden
        >
          <span className="absolute h-[3px] w-6 rounded-full bg-current" />
          <span
            className={`absolute h-6 w-[3px] rounded-full bg-current transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
          />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="px-7 pb-6 leading-relaxed text-body">{t(`faq.a${n}`)}</div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section className="border-b border-hairline bg-surface py-24">
      <Reveal className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold leading-tight text-ink md:text-4xl">FAQ</h2>
        <div className="mt-12 space-y-4">
          {QUESTIONS.map((n) => (
            <FaqItem key={n} n={n} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
