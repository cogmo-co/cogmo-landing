import type { Metadata } from "next";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const SITE_TITLE = "진단 이전에 시작하는 인지건강 모니터링 | Cogmo";
const SITE_DESCRIPTION =
  "건강한 시니어의 인지 변화를 추적하고 초기 신호를 감지하는 디지털 인지건강 모니터링 서비스. 보호자 연계, 기관 도입 지원.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://cogmo.life"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Cogmo",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* Google Analytics (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XLKX9DNFVJ"
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XLKX9DNFVJ');`}
      </Script>
      {/* Microsoft Clarity */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","wn5stpiy92");`}
      </Script>
      {/* LanguageProvider 가 최상단에 있는 건 헤더 때문이다 — 헤더는 전 페이지 공통이라
          layout 에서 렌더되는데, 홈에서는 선택한 언어로 그려져야 한다. 홈이 아닌 페이지는
          헤더 스스로 한국어로 고정한다(components/Nav.tsx 참고). */}
      <body suppressHydrationWarning>
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
