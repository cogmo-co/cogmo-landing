"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLang } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { html as beautifyHtml } from "js-beautify";
import { ModeToggle } from "./EditorToolbar";

interface HtmlEditorProps {
  value: string;
  onChange: (html: string) => void;
  mode: "visual" | "html";
  onModeChange: (mode: "visual" | "html") => void;
}

const codeFontTheme = EditorView.theme({
  "&": { fontSize: "13px" },
  ".cm-content": {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
});

function prettify(raw: string): string {
  if (!raw.trim()) return raw;
  return beautifyHtml(raw, {
    indent_size: 2,
    wrap_line_length: 0,
    preserve_newlines: true,
    end_with_newline: false,
    unformatted: [],
  });
}

export default function HtmlEditor({
  value,
  onChange,
  mode,
  onModeChange,
}: HtmlEditorProps) {
  const [displayValue, setDisplayValue] = useState(() => prettify(value));

  function handleChange(newValue: string) {
    setDisplayValue(newValue);
    onChange(newValue);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-white">
      <div className="flex min-h-[44px] items-center justify-end border-b border-hairline px-2 py-1.5">
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </div>
      <CodeMirror
        value={displayValue}
        onChange={handleChange}
        height="400px"
        theme="light"
        extensions={[htmlLang(), codeFontTheme, EditorView.lineWrapping]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
          autocompletion: true,
        }}
      />
    </div>
  );
}
