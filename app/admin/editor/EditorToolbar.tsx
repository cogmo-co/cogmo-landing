"use client";

import { useRef, useState, useEffect } from "react";
import type { Editor } from "@tiptap/react";
import {
  Undo2,
  Redo2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Ban,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  ImagePlus,
} from "lucide-react";
import { useImageUpload } from "./useImageUpload";

type Mode = "visual" | "html";

interface EditorToolbarProps {
  editor: Editor | null;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function EditorToolbar({
  editor,
  mode,
  onModeChange,
}: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading } = useImageUpload();

  if (!editor) return null;

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file);
    if (url) {
      const defaultWidth = 400;
      editor!
        .chain()
        .focus()
        .insertContent({
          type: "imageResize",
          attrs: {
            src: url,
            alt: "",
            width: defaultWidth,
            containerStyle: `position: relative; width: ${defaultWidth}px; cursor: pointer;`,
            wrapperStyle: "display: flex;",
          },
        })
        .run();
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="flex min-h-[44px] flex-wrap items-center gap-0.5 border-b border-hairline bg-white px-2 py-1.5">
      {/* History */}
      <ToolBtn
        active={false}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        label="실행 취소"
      >
        <Undo2 size={16} />
      </ToolBtn>
      <ToolBtn
        active={false}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        label="다시 실행"
      >
        <Redo2 size={16} />
      </ToolBtn>

      <Divider />

      {/* Heading dropdown */}
      <HeadingDropdown editor={editor} />

      <Divider />

      {/* Inline formatting */}
      <ToolBtn
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="굵게"
      >
        <Bold size={16} strokeWidth={3} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="기울임"
      >
        <Italic size={16} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        label="밑줄"
      >
        <Underline size={16} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        label="취소선"
      >
        <Strikethrough size={16} />
      </ToolBtn>
      <HighlightPicker editor={editor} />

      <Divider />

      {/* Alignment */}
      <ToolBtn
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        label="왼쪽 정렬"
      >
        <AlignLeft size={16} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        label="가운데 정렬"
      >
        <AlignCenter size={16} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        label="오른쪽 정렬"
      >
        <AlignRight size={16} />
      </ToolBtn>

      <Divider />

      {/* Lists / blocks */}
      <ToolBtn
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label="글머리 기호"
      >
        <List size={16} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label="번호 목록"
      >
        <ListOrdered size={16} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        label="인용"
      >
        <Quote size={16} />
      </ToolBtn>
      <ToolBtn
        active={false}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        label="구분선"
      >
        <Minus size={16} />
      </ToolBtn>

      <Divider />

      {/* Media */}
      <LinkPopover editor={editor} />
      <ToolBtn
        active={false}
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        label={uploading ? "업로드 중..." : "이미지"}
      >
        <ImagePlus size={16} />
      </ToolBtn>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Mode toggle (far right) */}
      <div className="ml-auto">
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>
    </div>
  );
}

// ============================================================
// Heading dropdown
// ============================================================
function HeadingDropdown({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const current = (() => {
    if (editor.isActive("heading", { level: 1 }))
      return { icon: <Heading1 size={16} />, label: "H1" };
    if (editor.isActive("heading", { level: 2 }))
      return { icon: <Heading2 size={16} />, label: "H2" };
    if (editor.isActive("heading", { level: 3 }))
      return { icon: <Heading3 size={16} />, label: "H3" };
    if (editor.isActive("heading", { level: 4 }))
      return { icon: <Heading4 size={16} />, label: "H4" };
    return { icon: <Pilcrow size={16} />, label: "본문" };
  })();

  function selectLevel(level: 0 | 1 | 2 | 3 | 4) {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setOpen(false);
  }

  const items: Array<{
    level: 0 | 1 | 2 | 3 | 4;
    icon: React.ReactNode;
    label: string;
  }> = [
    { level: 0, icon: <Pilcrow size={16} />, label: "본문" },
    { level: 1, icon: <Heading1 size={16} />, label: "제목 1" },
    { level: 2, icon: <Heading2 size={16} />, label: "제목 2" },
    { level: 3, icon: <Heading3 size={16} />, label: "제목 3" },
    { level: 4, icon: <Heading4 size={16} />, label: "제목 4" },
  ];

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 items-center gap-1 rounded-md px-2 text-sm text-body transition hover:bg-surface hover:text-ink"
      >
        {current.icon}
        <span className="text-xs">{current.label}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 w-36 rounded-lg border border-hairline bg-white py-1 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {items.map((it) => {
            const active =
              it.level === 0
                ? editor.isActive("paragraph") &&
                  !editor.isActive("heading")
                : editor.isActive("heading", { level: it.level });
            return (
              <button
                key={it.level}
                type="button"
                onClick={() => selectLevel(it.level)}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-body hover:bg-surface"
                }`}
              >
                {it.icon}
                <span>{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Link popover (URL 입력 + 적용/제거)
// ============================================================
function LinkPopover({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [newTab, setNewTab] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const attrs = editor.getAttributes("link");
      setUrl(attrs.href ?? "");
      setNewTab(attrs.target === "_blank" || !editor.isActive("link"));
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, editor]);

  function apply() {
    if (!url.trim()) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
        target: newTab ? "_blank" : null,
        rel: newTab ? "noopener noreferrer" : null,
      })
      .run();
    setOpen(false);
  }

  function remove() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setOpen(false);
  }

  const isLinked = editor.isActive("link");

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="링크"
        aria-label="링크"
        className={`flex h-8 w-8 items-center justify-center rounded-md text-body transition hover:bg-surface hover:text-ink ${
          open ? "bg-surface text-ink" : ""
        }`}
      >
        <LinkIcon size={16} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 flex flex-col gap-2 rounded-lg border border-hairline bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-1.5">
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  apply();
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
              placeholder="https://..."
              className="h-8 w-64 rounded-md border border-hairline px-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={apply}
              className="h-8 rounded-md bg-primary px-3 text-xs font-semibold text-white transition hover:bg-primary-dark"
            >
              적용
            </button>
            {isLinked && (
              <button
                type="button"
                onClick={remove}
                className="h-8 rounded-md border border-hairline px-3 text-xs font-medium text-muted transition hover:border-red-300 hover:text-red-500"
              >
                제거
              </button>
            )}
          </div>
          <label className="flex cursor-pointer items-center gap-2 px-1 text-xs text-body select-none">
            <input
              type="checkbox"
              checked={newTab}
              onChange={(e) => setNewTab(e.target.checked)}
              className="h-3.5 w-3.5 accent-primary"
            />
            새 창에서 열기
          </label>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Highlight color picker (파스텔 5색 + 지우기)
// ============================================================
const HIGHLIGHT_COLORS: Array<{ color: string; label: string }> = [
  { color: "#c2f5ce", label: "민트" },
  { color: "#c2e0f5", label: "스카이" },
  { color: "#f5c2d3", label: "핑크" },
  { color: "#e6c2f5", label: "라벤더" },
  { color: "#f5edc2", label: "옐로우" },
];

function HighlightPicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="형광펜"
        aria-label="형광펜"
        className={`flex h-8 w-8 items-center justify-center rounded-md text-body transition hover:bg-surface hover:text-ink ${
          open ? "bg-surface text-ink" : ""
        }`}
      >
        <Highlighter size={16} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 flex items-center gap-1.5 rounded-lg border border-hairline bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {HIGHLIGHT_COLORS.map((c) => (
            <button
              key={c.color}
              type="button"
              onClick={() => {
                editor.chain().focus().setHighlight({ color: c.color }).run();
                setOpen(false);
              }}
              title={c.label}
              aria-label={c.label}
              className="h-6 w-6 rounded-full border border-hairline transition hover:scale-110"
              style={{ backgroundColor: c.color }}
            />
          ))}
          <div className="mx-0.5 h-5 w-px bg-hairline" />
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().unsetHighlight().run();
              setOpen(false);
            }}
            title="지우기"
            aria-label="지우기"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-hairline text-muted transition hover:border-red-300 hover:text-red-500"
          >
            <Ban size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Mode toggle — HTML 버튼 단독, 활성 시 HTML 모드
// ============================================================
interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  const isHtml = mode === "html";

  return (
    <button
      type="button"
      onClick={() => onModeChange(isHtml ? "visual" : "html")}
      title={isHtml ? "일반 에디터로 전환" : "HTML 에디터로 전환"}
      className={`flex h-8 items-center rounded-md px-3 text-xs font-semibold transition ${
        isHtml
          ? "bg-primary text-white"
          : "border border-hairline text-muted hover:border-primary hover:text-primary"
      }`}
    >
      HTML
    </button>
  );
}

// ============================================================
// 내부 유틸 컴포넌트
// ============================================================
interface ToolBtnProps {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}

function ToolBtn({
  active,
  onClick,
  disabled,
  label,
  children,
}: ToolBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-primary text-white"
          : "text-body hover:bg-surface hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-hairline" />;
}
