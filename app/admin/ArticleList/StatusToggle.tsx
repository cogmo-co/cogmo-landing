"use client";

import type { ArticleStatus } from "@/lib/articles/status";
import { STATUS_LABEL } from "@/lib/articles/status";

interface StatusToggleProps {
  status: ArticleStatus;
  disabled?: boolean;
  onChange: () => void;
}

export default function StatusToggle({
  status,
  disabled,
  onChange,
}: StatusToggleProps) {
  const isOn = status === "published";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={isOn ? "비공개로 전환" : "공개로 전환"}
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-14 flex-none items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        isOn ? "bg-primary" : "bg-hairline"
      }`}
    >
      <span
        className={`absolute top-0.5 inline-flex h-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold shadow-sm transition-all duration-200 ${
          isOn
            ? "left-[26px] w-7 text-primary"
            : "left-0.5 w-5 text-transparent"
        }`}
      >
        {STATUS_LABEL[status]}
      </span>
    </button>
  );
}
