export const metadata = {
  title: "시스템 점검 중 | Cogmo",
  description: "보다 안정적인 서비스 제공을 위해 시스템 점검을 진행 중입니다.",
};

export default function CheckPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center md:py-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/maintenance.png"
        alt=""
        className="w-48 md:w-56"
      />

      <h1 className="mt-10 text-3xl font-bold text-ink md:text-4xl">
        시스템 점검 중입니다.
      </h1>

      <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
        보다 안정적인 서비스 제공을 위해 시스템 점검을 진행 중입니다.
        <br />
        개선된 서비스로 여러분과 함께 하겠습니다.
      </p>
    </div>
  );
}