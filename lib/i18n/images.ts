import type { LangCode } from "./dictionary";

export type ImageSlot =
  | "dashboard-home"
  | "hero-mobile"
  | "report-cognitive"
  | "report-physical-radar"
  | "report-trend"
  | "app-home"
  | "app-grip-test";

const BASE = "/images/landing/frame_export";

/**
 * 슬롯별 언어 이미지 맵. vi/th는 아직 촬영된 실사 목업이 없어 사전에 키가 없다 —
 * resolveLocalizedImage()가 자동으로 en으로 폴백한다.
 */
export const LOCALIZED_IMAGES: Record<ImageSlot, Partial<Record<LangCode, string>>> = {
  "dashboard-home": {
    ko: `${BASE}/dashboard-home.ko.jpg`,
    en: `${BASE}/dashboard-home.en.jpg`,
    ja: `${BASE}/dashboard-home.ja.jpg`,
    zh: `${BASE}/dashboard-home.zh.jpg`,
  },
  "hero-mobile": {
    ko: `${BASE}/hero-mobile.ko.jpg`,
    en: `${BASE}/hero-mobile.en.jpg`,
    ja: `${BASE}/hero-mobile.ja.jpg`,
    zh: `${BASE}/hero-mobile.zh.jpg`,
  },
  "report-cognitive": {
    ko: `${BASE}/report-cognitive.ko.jpg`,
    en: `${BASE}/report-cognitive.en.jpg`,
    ja: `${BASE}/report-cognitive.ja.jpg`,
    zh: `${BASE}/report-cognitive.zh.jpg`,
  },
  "report-physical-radar": {
    ko: `${BASE}/report-physical-radar.ko.jpg`,
    en: `${BASE}/report-physical-radar.en.jpg`,
    ja: `${BASE}/report-physical-radar.ja.jpg`,
    zh: `${BASE}/report-physical-radar.zh.jpg`,
  },
  "report-trend": {
    ko: `${BASE}/report-trend.ko.jpg`,
    en: `${BASE}/report-trend.en.jpg`,
    ja: `${BASE}/report-trend.ja.jpg`,
    zh: `${BASE}/report-trend.zh.jpg`,
  },
  "app-home": {
    ko: `${BASE}/app-home.ko.jpg`,
    en: `${BASE}/app-home.en.jpg`,
    ja: `${BASE}/app-home.ja.jpg`,
    zh: `${BASE}/app-home.zh.jpg`,
  },
  "app-grip-test": {
    ko: `${BASE}/app-grip-test.ko.jpg`,
    en: `${BASE}/app-grip-test.en.jpg`,
    ja: `${BASE}/app-grip-test.ja.jpg`,
    zh: `${BASE}/app-grip-test.zh.jpg`,
  },
};

/** slot의 각 언어 이미지가 전부 동일한 intrinsic 크기인지(hero-mobile만 언어별로 실제 리포트
 * 길이가 달라 세로 길이가 다르다 — 그 슬롯만 next/image에 fill을 쓰고 나머지는 width/height 고정). */
export const IMAGE_DIMENSIONS: Record<Exclude<ImageSlot, "hero-mobile">, { width: number; height: number }> = {
  "dashboard-home": { width: 1280, height: 832 },
  "report-cognitive": { width: 595, height: 842 },
  "report-physical-radar": { width: 595, height: 842 },
  "report-trend": { width: 595, height: 842 },
  // 상단 iOS 상태바(55px)를 잘라낸 크기. CustomerManagement 의 폰 목업이 자체 상태바
  // 띠를 그리므로, 스크린샷에도 상태바가 있으면 두 겹이 된다.
  "app-home": { width: 402, height: 819 },
  "app-grip-test": { width: 402, height: 874 },
};

export function resolveLocalizedImage(slot: ImageSlot, lang: LangCode): string {
  const map = LOCALIZED_IMAGES[slot];
  return map[lang] ?? map.en ?? map.ko ?? "";
}
