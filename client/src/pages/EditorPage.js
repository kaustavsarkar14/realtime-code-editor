import React from "react";
import RoomControls from "../components/RoomControls";
import CodeEditor from "../components/CodeEditor";

const EditorPage = () => {
  return (
    <div className="w-full h-screen flex md:flex-row flex-col ">
      <RoomControls />
      <CodeEditor/>
    </div>
  );
};

export default EditorPage;
