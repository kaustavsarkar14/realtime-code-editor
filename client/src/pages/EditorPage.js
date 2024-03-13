import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import RoomControls from "../components/RoomControls";
import CodeEditor from "../components/CodeEditor";
import { appContext } from "../context/AppProvider";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const EditorPage = () => {
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const { username } = useContext(appContext);
  const [clients, setClients] = useState([]);
  const { roomId } = useParams();
  const codeRef = useRef(null);

  useEffect(() => {
    socket.emit("join", { roomId, username });

    socket.on("joined", ({ clients, username, socketId }) => {
      setClients(clients);
      if (socketId === socket.id) return;
      toast.success(`${username} joined the room.`);
      if (codeRef.current && codeRef.current !== "")
        socket.emit("code-sync", { code: codeRef.current, socketId });
    });

    socket.on("user-left", ({ socketId, username }) => {
      toast.success(`${username} left.`);
      setClients((prev) =>
        prev.filter((client) => client.socketId !== socketId)
      );
    });

    return () => {
      socket.disconnect();
      socket.off("joined");
      socket.off("user-left");
    };
  }, []);

  if (!username) return <Navigate to="/" />;
  return (
    <div className="w-full h-screen flex md:flex-row flex-col ">
      <RoomControls clients={clients} roomId={roomId} socket={socket} />
      <CodeEditor
        roomId={roomId}
        socket={socket}
        onCodeChange={(code) => (codeRef.current = code)}
      />
    </div>
  );
};

export default EditorPage;
