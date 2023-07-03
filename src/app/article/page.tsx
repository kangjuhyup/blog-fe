"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const EditerMarkdown = dynamic(
    () =>
      import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
      }),
    { ssr: false }
  );


const ArticleBasePage = () => {
    return (
        <>
            {
                EditerMarkdown ?
                    <EditerMarkdown
                        style={{ padding: 10 }}
                        source={'abc'}
                    />
                    :
                    <></>
            }

        </>
    )
}

export default ArticleBasePage;