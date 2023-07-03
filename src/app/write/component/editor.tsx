"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const EditorComponent = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world**");

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue);
  };

  return (
    <MDEditor
      value={value}
      onChange={handleChange}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
    />
  );
};

export default EditorComponent;
