import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        onMount={onMount}
      />
      ;
    </div>
  );
};

export default CodeEditor;
