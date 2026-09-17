"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageContext";
import Reveal from "@/components/home/Reveal";

export default function Pricing() {
  const t = useT();

  return (
    <section id="pricing" className="scroll-mt-16 border-b border-hairline bg-white py-24">
      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Pricing</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            <span>{t("pricing.title.l1")}</span>
            <br />
            <span className="text-primary">{t("pricing.title.l2")}</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Starter */}
          <div className="flex flex-col rounded-2xl border border-hairline bg-white p-8">
            <h3 className="text-xl font-bold text-ink">Starter</h3>
            <p className="mt-1 text-sm text-muted">{t("pricing.starter.subtitle")}</p>
            <p className="mt-6">
              <span className="text-4xl font-black text-ink">{t("pricing.starter.price")}</span>{" "}
              <span className="text-body">{t("pricing.starter.price_suffix")}</span>
            </p>
            <ul className="mb-8 mt-6 space-y-3 text-sm text-body">
              {(["feature1", "feature2", "feature3", "feature4", "feature5"] as const).map((k) => (
                <li key={k} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>{t(`pricing.starter.${k}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/download"
              className="mt-auto block rounded-lg border border-ink py-3.5 text-center font-semibold text-ink hover:bg-surface"
            >
              {t("pricing.starter.cta")}
            </Link>
          </div>

          {/* Professional */}
          <div className="flex flex-col rounded-2xl border border-hairline bg-white p-8">
            <h3 className="text-xl font-bold text-ink">Professional</h3>
            <p className="mt-1 text-sm text-muted">{t("pricing.pro.subtitle")}</p>
            <p className="mt-6">
              <span className="text-4xl font-black text-ink">{t("pricing.pro.price")}</span>{" "}
              <span className="text-body">{t("pricing.pro.price_suffix")}</span>
            </p>
            <p className="text-sm text-muted">{t("pricing.vat")}</p>
            <ul className="mb-8 mt-6 space-y-3 text-sm text-body">
              {(["feature1", "feature2", "feature3", "feature4", "feature5", "feature6", "feature7"] as const).map(
                (k) => (
                  <li key={k} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    <span>{t(`pricing.pro.${k}`)}</span>
                  </li>
                )
              )}
            </ul>
            {/* Professional 결제 흐름이 아직 없어 비활성으로 둔다 (Nav 의 "검사 체험하기" 와 같은 처리).
                TODO: 결제 붙으면 <Link href={...}> 로 교체. */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="mt-auto block w-full cursor-not-allowed rounded-lg border border-hairline py-3.5 text-center font-semibold text-muted"
            >
              {t("pricing.pro.cta")}
            </button>
          </div>

          {/* Business (강조) */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-white p-8 shadow-[0_16px_40px_rgba(0,135,77,0.12)]">
            <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
              {t("pricing.biz.badge")}
            </span>
            <h3 className="text-xl font-bold text-ink">Business</h3>
            <p className="mt-1 text-sm text-muted">{t("pricing.biz.subtitle")}</p>
            <p className="mt-6">
              <span className="text-4xl font-black text-ink">{t("pricing.biz.price")}</span>{" "}
              <span className="text-body">{t("pricing.biz.price_suffix")}</span>
            </p>
            <p className="text-sm text-muted">{t("pricing.vat")}</p>
            {/* Pro 포함 사실을 한 줄 텍스트로 두면 못 보고 지나가서 면(面)으로 강조한다. */}
            <div className="mt-4 rounded-lg bg-primary/5 px-4 py-3">
              <p className="flex gap-2 text-sm font-bold text-primary">
                <span>✓</span>
                <span>{t("pricing.biz.included_label")}</span>
              </p>
            </div>
            <p className="mt-5 text-sm font-semibold text-ink">{t("pricing.biz.extra_label")}</p>
            <ul className="mb-8 mt-3 space-y-3 text-sm text-body">
              {(["feature1", "feature2", "feature3", "feature4", "feature5"] as const).map((k) => (
                <li key={k} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>{t(`pricing.biz.${k}`)}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-auto block rounded-lg bg-primary py-3.5 text-center font-semibold text-white hover:bg-primary-dark"
            >
              {t("pricing.biz.cta")}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
