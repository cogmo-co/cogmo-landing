/**
 * Cogmo 안녕 랜딩페이지 — "평가 기반 고객관리 플랫폼" (B2B)
 * annyeong-landing-preview/preview.html 승인본을 포팅. 6개 언어(ko 기본, en/ja/vi/zh/th)는
 * lib/i18n의 클라이언트 전용 Context로 처리(URL 라우팅 없음).
 *
 * 헤더·푸터는 이 파일에 없다 — 사이트 전 페이지가 같은 chrome 을 쓰고, 그 조립은
 * components/SiteChrome.tsx 가 한다. 홈만 다국어라 헤더가 언어에 따라 목적지를 바꾸는데,
 * 그 분기는 components/Nav.tsx 안에 있다.
 */
import StickyCta from "@/components/home/StickyCta";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Problem from "@/components/sections/Problem";
import CoreValue from "@/components/sections/CoreValue";
import Assessment from "@/components/sections/Assessment";
import Report from "@/components/sections/Report";
import UseCase from "@/components/sections/UseCase";
import CustomerManagement from "@/components/sections/CustomerManagement";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <UseCase />
      <CoreValue />
      <Assessment />
      <Report />
      <CustomerManagement />
      <SocialProof />
      <Pricing />
      <Faq />
      <FinalCta />
      <StickyCta />
    </>
  );
}
