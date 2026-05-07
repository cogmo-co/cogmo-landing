"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

interface SiteChromeProps {
  children: React.ReactNode;
}

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col pt-16">{children}</main>
      <Footer />
    </div>
  );
}