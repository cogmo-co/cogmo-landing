"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ResizeImage from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import EditorToolbar from "./EditorToolbar";

interface VisualEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  mode: "visual" | "html";
  onModeChange: (mode: "visual" | "html") => void;
}

export default function VisualEditor({
  value,
  onChange,
  placeholder = "본문을 작성하세요...",
  mode,
  onModeChange,
}: VisualEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: false,
        underline: false,
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      // ImageResizeOptions 타입엔 allowBase64가 없지만 부모 Image 확장에서 지원하므로 런타임 OK
      ResizeImage.configure({
        inline: false,
        allowBase64: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[400px] p-4 focus:outline-none prose-p:leading-[1.4] prose-li:leading-[1.4] prose-headings:leading-[1.3]",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() === value) return;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  return (
    <div className="rounded-lg border border-hairline bg-white">
      <EditorToolbar editor={editor} mode={mode} onModeChange={onModeChange} />
      <EditorContent editor={editor} />
    </div>
  );
}