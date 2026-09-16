"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

interface SiteChromeProps {
  children: React.ReactNode;
}

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  // 관리자 화면만 사이트 chrome 을 쓰지 않는다. 나머지는 홈을 포함해 전부 같은 헤더·푸터다 —
  // 헤더가 sticky 라 예전 fixed Nav 시절의 <main> pt-16 보정은 더 이상 필요 없다.
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
