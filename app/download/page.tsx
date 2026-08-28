import type { CSSProperties } from "react";

/** 행 단위 순차 등장 인덱스 — globals.css 의 .seq-item 이 --i 로 delay 를 계산 */
const seq = (i: number) => ({ "--i": i }) as CSSProperties;

export const metadata = {
  title: "다운로드 | Cogmo",
  description:
    "일상을 살피는 새로운 방법, '안녕'. App Store와 Google Play에서 만나보세요.",
};

const STORE_URLS = {
  apple: "https://apps.apple.com/kr/app/id6756593840",
  google: "https://play.google.com/store/apps/details?id=com.cogmo.annyeong",
} as const;

export default function DownloadPage() {
  return (
    <>
      {/* 헤더 — 흰 지면. 깃펜이 밑줄을 그으며 제목에 서명한다 */}
      <section className="bg-white pt-20 pb-0.5 md:pt-28 md:pb-1">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Download
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            다운로드
          </h1>
          <div className="signature mx-auto mt-11 md:mt-14">
            <span className="signature-rule" />
            <FeatherMark className="signature-feather" />
          </div>
        </div>
      </section>

      {/* 밴드 — 앱 홈 화면과 같은 지면을 풀블리드로. flex-1로 푸터까지 채운다.
          카피는 행 단위로 순차 도착 (헤더는 LCP 후보라 모션 제외) */}
      <section className="surface-annyeong seq flex flex-1 flex-col justify-center py-16 md:py-24">
        <div
          className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center"
          style={{ "--seq-base": "700ms" } as CSSProperties}
        >
          <h2
            className="seq-item text-2xl font-bold leading-snug text-ink motion-safe:animate-reveal md:text-3xl"
            style={seq(0)}
          >
            오늘의 안녕을, 내일의 건강으로
          </h2>
          <p className="mt-6 text-base leading-relaxed text-body md:text-lg">
            <span
              className="seq-item block motion-safe:animate-reveal"
              style={seq(1)}
            >
              매일 마주하는 오늘을 기록하면
            </span>
            <span
              className="seq-item block motion-safe:animate-reveal"
              style={seq(2)}
            >
              작은 변화가 보이기 시작합니다.
            </span>
          </p>
          <p className="mt-4 text-base leading-relaxed text-body md:text-lg">
            <span
              className="seq-item block motion-safe:animate-reveal"
              style={seq(3)}
            >
              그리고 그 변화는
            </span>
            <span
              className="seq-item block motion-safe:animate-reveal"
              style={seq(4)}
            >
              더 건강한 내일을 만드는 기준이 됩니다.
            </span>
          </p>
          <p
            className="seq-item mt-8 text-base font-semibold text-ink motion-safe:animate-reveal md:text-lg"
            style={seq(5)}
          >
            일상을 살피는 새로운 방법,{" "}
            <span className="relative -top-0.5 ml-1.5 inline-block rounded-md bg-primary px-3 py-1.5 align-middle text-lg font-bold leading-none text-white md:text-xl">
              안녕
            </span>
          </p>

          <div
            className="seq-item mt-10 flex flex-col items-center justify-center gap-3 motion-safe:animate-reveal sm:flex-row"
            style={seq(6)}
          >
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </div>
        </div>
      </section>
    </>
  );
}

/** 깃펜 — 서명 애니메이션에서 밑줄 끝을 따라 이동. 촉이 SVG 좌하단에 있다 */
function FeatherMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 121.24 122.88"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.05,96.6C6.38,105.51,1.42,113.97,0,122.88l5.13-0.44c8.1-23.56,15.4-39.4,31.23-59.21 C48.24,48.39,61.13,36.58,77.66,27.2c8.8-5,20.07-10.47,30.21-11.85c2.77-0.38,5.58-0.49,8.46-0.24 c-31.4,7.19-56.26,23.84-76.12,48.8C32.1,74.09,25.05,85.4,18.57,97.32l11.94,2.18l-4.97-2.47l17.78-2.83 c-6.6-2.33-13.12-1.55-15.21-4.06c18.3-0.83,33.34-4.78,43.9-12.45c-3.93-0.55-8.46-1.04-10.82-2.17 c17.69-5.98,27.92-16.73,40.9-26.27c-16.87,3.54-32.48,2.96-37-0.25c29.77,2.21,49-6.02,55.59-26.77c0.57-2.24,0.73-4.5,0.37-6.78 C118.74,0.62,92.49-4.39,83.95,7.77c-1.71,2.43-4.12,4.66-6.11,7.48L85.97,0c-21.88,7.39-23.68,15.54-35,40.09 c0.9-7.47,2.97-14.24,5.66-20.63c-27.34,10.55-36.45,37.11-37.91,59.7c-0.79-7.88,0.67-17.78,3.49-28.9 c-7.98,8-13.41,17.39-11.47,30.79l-3.65-1.63l1.92,7.19l-5.46-2.59L10.05,96.6L10.05,96.6z"
      />
    </svg>
  );
}

interface StoreButtonProps {
  store: "apple" | "google";
}

function StoreButton({ store }: StoreButtonProps) {
  const isApple = store === "apple";

  return (
    <a
      href={STORE_URLS[store]}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${isApple ? "App Store" : "Google Play"}에서 '안녕' 앱 다운로드`}
      className="flex w-56 items-center justify-center gap-3 rounded-xl bg-ink px-5 py-3 text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
    >
      {isApple ? <AppleIcon /> : <GoogleIcon />}
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-wider">
          {isApple ? "Download on the" : "GET IT ON"}
        </span>
        <span className="text-base font-semibold">
          {isApple ? "App Store" : "Google Play"}
        </span>
      </div>
    </a>
  );
}

function AppleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-7 w-7 flex-none"
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-7 w-7 flex-none"
      aria-hidden
    >
      {/* Google Play 브랜드 4색 */}
      <path
        fill="#00A0FF"
        d="M3.6 2.2c-.3.3-.5.7-.5 1.2v17.2c0 .5.2.9.5 1.2l9-9.4-9-9.2z"
      />
      <path
        fill="#FFCE00"
        d="M14.5 12l3.5-3.5 4 2.3c.6.3.6 1.2 0 1.5l-4 2.3-3.5-2.6z"
      />
      <path
        fill="#FF3A44"
        d="M5 22l9.5-9.5 3.5 3.5L7.7 22.5c-.6.3-1.4.3-1.9 0L5 22z"
      />
      <path fill="#00E676" d="M5 2l13 7.5-3.5 3.5L5 2z" />
    </svg>
  );
}
