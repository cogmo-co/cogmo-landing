"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageContext";

/** 위로 이만큼(px) 올리면 감춘다. 한 번에 튀는 흔들림으로는 넘지 않을 만큼 둔다. */
const HIDE_ON_SCROLL_UP = 120;
/** 다시 내릴 때는 이만큼에서 돌아온다 — 감추는 쪽보다 낮게 둬야 필요할 때 빨리 잡힌다. */
const SHOW_ON_SCROLL_DOWN = 40;

/**
 * 화면에 이 중 하나라도 보이면 고정 CTA 를 감춘다.
 * 둘 다 같은 행동(무료로 시작하기)을 가진 실제 버튼이라, 겹치면 같은 버튼이 한 화면에 둘이 된다.
 *   #hero-cta   히어로의 버튼 줄. 섹션(#hero)이 아니라 버튼 줄인 이유는 히어로 아래에
 *               대시보드 목업이 길게 붙어 있어, 섹션 기준이면 버튼이 사라진 뒤로도 한참
 *               아무 CTA 없는 구간이 생기기 때문.
 *   #final-cta  페이지 끝 CTA 섹션. 여기 버튼과 고정 바는 라벨까지 똑같다.
 */
const RIVAL_CTA_IDS = ["hero-cta", "final-cta"];

/**
 * 모바일 하단 고정 CTA. 두 조건을 모두 만족할 때만 뜬다.
 *
 * 1) 화면에 다른 CTA 버튼이 없을 것 (위 RIVAL_CTA_IDS)
 *    고정 CTA 의 역할은 "화면 어디에도 버튼이 없는 구간을 메우는 것"이다.
 *
 * 2) 위로 크게 올리는 중이 아닐 것
 *    위로 올리는 건 앞 내용을 다시 보려는 동작이라 화면을 비워준다. 다만 방향만 보고
 *    토글하면 짧은 왕복마다 깜빡이고, 버튼을 누르려고 엄지를 내리다 화면이 살짝 튀는
 *    순간 목표물이 사라진다. 그래서 방향이 아니라 "누적 이동량"으로 판단한다.
 */
export default function StickyCta() {
  const t = useT();
  const [rivalVisible, setRivalVisible] = useState(true);
  const [scrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    const targets = RIVAL_CTA_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    // 기준이 없는 페이지에서는 가릴 근거가 없으니 그냥 띄운다.
    if (targets.length === 0) {
      setRivalVisible(false);
      return;
    }

    const shown = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) shown.add(entry.target.id);
          else shown.delete(entry.target.id);
        });
        setRivalVisible(shown.size > 0);
      },
      { threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const lastY = useRef(0);
  const travel = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        lastY.current = y;
        if (delta === 0) return;

        // 방향이 바뀌면 누적을 버린다 — 반대로 가던 거리가 남아 있으면 임계값이 의미를 잃는다.
        if (delta > 0 !== travel.current > 0) travel.current = 0;
        travel.current += delta;

        if (travel.current <= -HIDE_ON_SCROLL_UP) setScrollingUp(true);
        else if (travel.current >= SHOW_ON_SCROLL_DOWN) setScrollingUp(false);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const visible = !rivalVisible && !scrollingUp;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white p-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/download"
        tabIndex={visible ? undefined : -1}
        className="block rounded-lg bg-primary py-3 text-center font-semibold text-white"
      >
        {t("hero.cta1")}
      </Link>
    </div>
  );
}
