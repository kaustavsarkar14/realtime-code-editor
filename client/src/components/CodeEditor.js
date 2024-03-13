import React, { useContext, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { appContext } from "../context/AppProvider";

const CodeEditor = ({ roomId, socket,onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin != "setValue") {
          socket.emit("code-change", { roomId, code });
        }
      });

      socket.on("code-change", ({ code }) => {
        editorRef.current.setValue(code);
      });
    }
    init();
    return () => {
      socket.off("code-change");
    };
  }, []);

  return (
    <div className="md:w-[85%] w-full h-full flex md:flex-row flex-col">
      <div className="h-full md:w-[70%]">
        <textarea id="realtimeEditor"></textarea>
      </div>
      <div className="h-full md:w-[40%]">output</div>
    </div>
  );
};

export default CodeEditor;
