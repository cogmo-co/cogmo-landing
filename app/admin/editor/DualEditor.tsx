"use client";

import { useState } from "react";
import VisualEditor from "./VisualEditor";
import HtmlEditor from "./HtmlEditor";

interface DualEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function DualEditor({
  value,
  onChange,
  placeholder,
}: DualEditorProps) {
  const [mode, setMode] = useState<"visual" | "html">("visual");

  if (mode === "visual") {
    return (
      <VisualEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        mode={mode}
        onModeChange={setMode}
      />
    );
  }

  return (
    <HtmlEditor
      value={value}
      onChange={onChange}
      mode={mode}
      onModeChange={setMode}
    />
  );
}
