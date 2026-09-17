"use client";

import CTASection from "@/components/CTASection";
import { useT } from "@/lib/i18n/LanguageContext";

/**
 * 최종 CTA — 마크업을 따로 짜지 않고 사이트 공용 CTASection 을 그대로 쓴다.
 * 이 컴포넌트가 하는 일은 i18n 문구를 넣어주는 것뿐임. 공용 컴포넌트를 쓰면 준비중(disabled)·
 * 외부링크 처리와 py-40 리듬이 다른 9개 페이지의 CTA 와 자동으로 같아진다.
 */
export default function FinalCta() {
  const t = useT();

  return (
    <CTASection
      id="final-cta"
      title={<span className="whitespace-pre-line">{t("finalcta.title")}</span>}
      // 줄바꿈은 사전의 \n 이 갖고 있다. CTASection 의 <p> 에 whitespace 를 걸면 이 컴포넌트를
      // 같이 쓰는 9개 페이지에 다 영향이 가므로, 여기서 감싸는 span 에만 건다.
      description={<span className="whitespace-pre-line">{t("finalcta.body")}</span>}
      primaryAction={{ label: t("finalcta.cta1"), href: "/download" }}
      secondaryAction={{ label: t("finalcta.cta2"), href: "/contact" }}
    />
  );
}
