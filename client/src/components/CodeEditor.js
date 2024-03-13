import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  return (
    <div className="md:w-[85%] w-full h-full flex md:flex-row flex-col">
      <div className="h-full md:w-[70%]">
        <Editor
          // height="90vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          onMount={onMount}
        />
      </div>
      <div className="h-full md:w-[40%]">output</div>
    </div>
  );
};

export default CodeEditor;
