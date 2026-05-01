"use client";

import {
  ARTICLE_CATEGORIES,
  CATEGORY_LABEL,
  type ArticleCategory,
} from "@/lib/articles/categories";

interface CategorySelectProps {
  value: ArticleCategory;
  onChange: (value: ArticleCategory) => void;
}

export default function CategorySelect({
  value,
  onChange,
}: CategorySelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink">
        분류 <span className="text-primary">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ArticleCategory)}
        className="h-12 w-full rounded-lg border border-hairline bg-white px-4 text-base outline-none transition focus:border-primary"
      >
        {ARTICLE_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {CATEGORY_LABEL[c]}
          </option>
        ))}
      </select>
    </div>
  );
}
