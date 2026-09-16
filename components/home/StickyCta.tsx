"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageContext";

export default function StickyCta() {
  const t = useT();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white p-3 md:hidden">
      <Link
        href="/download"
        className="block rounded-lg bg-primary py-3 text-center font-semibold text-white"
      >
        {t("hero.cta1")}
      </Link>
    </div>
  );
}
