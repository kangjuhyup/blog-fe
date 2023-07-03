"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import rehypeSanitize from "rehype-sanitize";


const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });


const EditorComponent = () => {
  const [value, setValue] = useState<string | undefined>("**Hello world**");
  const [editorHeight, setEditorHeight] = useState<number>(0);

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue);
  };

  useEffect(() => {
    const updateEditorHeight = () => {
        const editorOffsetTop = document.getElementById("editor")?.offsetTop || 100;
        const editorOffsetBottom = document.getElementById("footer")?.offsetTop || 0;
        const editorHeight = editorOffsetBottom - 20 - editorOffsetTop ;
        setEditorHeight(editorHeight);
    };

    updateEditorHeight();
    window.addEventListener("resize", updateEditorHeight);

    return () => {
      window.removeEventListener("resize", updateEditorHeight);
    };
  }, []);


  return (
    <>
      {
        MDEditor ?
          <MDEditor
          id="editor"
            value={value}
            onChange={handleChange}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            height={editorHeight}
          />
          :
          <div>Loading...</div>
      }
    </>


  );
};

export default EditorComponent;
