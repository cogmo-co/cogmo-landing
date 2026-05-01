export default function ArticlePageHeader() {
  return (
    <section className="border-b border-hairline bg-white py-5 md:py-7">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Articles
        </p>
        <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-ink md:text-5xl">
          아티클
        </h1>
        <p className="mt-5 text-base leading-relaxed text-body md:text-lg">
          코그모 소식과 건강정보를 모아봅니다.
        </p>
      </div>
    </section>
  );
}
