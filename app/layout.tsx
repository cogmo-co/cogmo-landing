import type { Metadata } from "next";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";
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
      <body suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
