"use client";

interface SubmitBarProps {
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function SubmitBar({ saving, onSave, onCancel }: SubmitBarProps) {
  return (
    <div className="flex items-center justify-between border-t border-hairline pt-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="rounded-lg border border-hairline bg-white px-4 py-2.5 text-sm font-medium text-body transition hover:bg-surface disabled:opacity-50"
      >
        취소
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
      >
        {saving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
