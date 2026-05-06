export const metadata = {
  title: "다운로드 | Cogmo",
  description: "Cogmo 앱 다운로드 — 곧 출시 예정",
};

export default function DownloadPage() {
  return (
    <>
      {/* 헤더 — 다른 페이지와 동일 패턴 */}
      <section className="border-b border-hairline bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Download
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
            다운로드
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
            안녕 앱을 다운로드하세요.
          </p>
        </div>
      </section>

      {/* 본문 */}
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          재정비 중입니다.
        </h2>
        <p className="mt-4 text-base text-muted md:text-lg">
          더 나은 모습으로 곧 돌아오겠습니다.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <StoreButton store="apple" />
          <StoreButton store="google" />
        </div>
      </div>
    </>
  );
}

interface StoreButtonProps {
  store: "apple" | "google";
}

function StoreButton({ store }: StoreButtonProps) {
  const isApple = store === "apple";

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      title="준비중"
      className="flex w-56 cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-hairline bg-muted/10 px-5 py-3 text-muted opacity-60"
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
    </button>
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
      fill="currentColor"
      className="h-7 w-7 flex-none"
      aria-hidden
    >
      <path d="M3.6 2.2c-.3.3-.5.7-.5 1.2v17.2c0 .5.2.9.5 1.2l9-9.4-9-9.2zM14.5 12l3.5-3.5 4 2.3c.6.3.6 1.2 0 1.5l-4 2.3-3.5-2.6zM5 22l9.5-9.5 3.5 3.5L7.7 22.5c-.6.3-1.4.3-1.9 0L5 22zM5 2l13 7.5-3.5 3.5L5 2z" />
    </svg>
  );
}
