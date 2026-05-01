"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ARTICLE_CATEGORIES, CATEGORY_LABEL } from "@/lib/articles/categories";

interface Tab {
  href: string;
  label: string;
}

const TABS: Tab[] = [
  { href: "/articles", label: "All" },
  ...ARTICLE_CATEGORIES.map((c) => ({
    href: `/articles/category/${c}`,
    label: CATEGORY_LABEL[c],
  })),
];

export default function CategoryTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const isActive =
          tab.href === "/articles"
            ? pathname === "/articles"
            : pathname?.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-ink text-white"
                : "text-muted hover:bg-surface hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
