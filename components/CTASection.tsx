import Link from "next/link";

export interface CTAButton {
  label: string;
  href: string;
  external?: boolean; // 외부 링크 → target=_blank
  disabled?: boolean; // 준비중 (비활성)
}

interface CTASectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryAction: CTAButton;
  secondaryAction: CTAButton;
}

export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="bg-primary py-40 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
        <p className="mt-5 text-lg text-white/80">{description}</p>
        <div className="mx-auto mt-10 grid w-fit grid-cols-1 gap-3 sm:grid-cols-2">
          <CTAButtonView button={primaryAction} variant="primary" />
          <CTAButtonView button={secondaryAction} variant="secondary" />
        </div>
      </div>
    </section>
  );
}

function CTAButtonView({
  button,
  variant,
}: {
  button: CTAButton;
  variant: "primary" | "secondary";
}) {
  const baseCls =
    "rounded-lg px-7 py-3.5 text-center font-medium transition";

  if (button.disabled) {
    const disabledCls =
      variant === "primary"
        ? "bg-white/30 text-white/60"
        : "border border-white/30 text-white/60";
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="준비중"
        className={`${baseCls} ${disabledCls} cursor-not-allowed`}
      >
        {/* {button.label}  */}
        점검중
      </button>
    );
  }

  const variantCls =
    variant === "primary"
      ? "bg-white text-primary hover:bg-white/90"
      : "border border-white/60 text-white hover:bg-white hover:text-primary";
  const className = `${baseCls} ${variantCls}`;

  // external true → 항상 새 창 (내부/외부 무관)
  if (button.external) {
    return (
      <a
        href={button.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {button.label}
      </a>
    );
  }

  // 내부 경로 → Next Link (SPA 이동)
  if (button.href.startsWith("/")) {
    return (
      <Link href={button.href} className={className}>
        {button.label}
      </Link>
    );
  }

  // mailto 등 → a 태그
  return (
    <a href={button.href} className={className}>
      {button.label}
    </a>
  );
}