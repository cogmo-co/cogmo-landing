"use client";

import { TITLE_MAX_LENGTH } from "@/lib/articles/constants";

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleField({ value, onChange }: TitleFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink">
        제목 <span className="text-primary">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={TITLE_MAX_LENGTH}
        placeholder="아티클 제목"
        className="h-12 w-full rounded-lg border border-hairline px-4 text-base outline-none transition focus:border-primary"
      />
      <div className="mt-1 text-right text-xs text-muted">
        {value.length} / {TITLE_MAX_LENGTH}
      </div>
    </div>
  );
}
