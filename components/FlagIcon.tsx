import type { LangCode } from "@/lib/i18n/dictionary";

/**
 * 언어 스위처용 원형 국기 아이콘. public/brand/flags 의 64x64 PNG 를 그대로 쓴다.
 *
 * 이모지 국기(🇰🇷)를 쓰지 않는 이유: Windows 는 국기 이모지를 지원하지 않아 Chrome/Edge 에서
 * 국기 대신 "KR" 같은 두 글자 코드가 그대로 렌더된다. 국내 사용자 비중을 생각하면 쓸 수 없다.
 *
 * next/image 가 아니라 <img> 인 이유: 한 장이 2~3KB 라 최적화로 얻을 게 없고,
 * 최적화를 거치면 /_next/image 캐시(기본 TTL 4시간)에 묶여 파일을 교체해도 한동안 옛 이미지가
 * 나간다. 사이트 로고(components/Nav.tsx)도 같은 이유로 <img> 를 쓴다.
 *
 * en 은 특정 국가가 아니라 공용어 자리라 국기 대신 지구본이다.
 *
 * 출처: Flaticon "World flags circular" 팩 (제작자 iconset.co).
 * 무료 라이선스라 **출처 표기가 조건**이고, 그 크레딧은 components/Footer.tsx 하단에 있다.
 * 아이콘을 다른 세트로 교체하지 않는 한 그 줄을 지우면 안 된다.
 */

/** 파일명은 kr/jp(국가코드)와 vi/zh/th/en(언어코드)이 섞여 있어 매핑을 명시한다 */
const FLAG_FILE: Record<LangCode, string> = {
  ko: "kr-flag.png",
  en: "en-flag.png",
  ja: "jp-flag.png",
  vi: "vi-flag.png",
  zh: "zh-flag.png",
  th: "th-flag.png",
};

export default function FlagIcon({
  lang,
  size = 18,
  className = "",
}: {
  lang: LangCode;
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/flags/${FLAG_FILE[lang]}`}
      alt=""
      width={size}
      height={size}
      // 일장기처럼 흰 면적이 넓은 국기가 흰 배경에 묻히지 않도록 얇은 테두리를 둔다
      className={`flex-none rounded-full ring-1 ring-black/10 ${className}`}
    />
  );
}
