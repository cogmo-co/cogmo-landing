import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "진단 이전에 시작하는 인지건강 모니터링 | Cogmo",
  description:
    "건강한 시니어의 인지 변화를 추적하고 초기 신호를 감지하는 디지털 인지건강 모니터링 서비스. 보호자 연계, 기관 도입 지원.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
