import { Avatar, Button, Separator } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { appContext } from "../context/AppProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomControls = ({ clients, roomId, socket }) => {
  const { username } = useContext(appContext);
  const navigate = useNavigate()
  const handleRoomIdCopy = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room id copied");
  }
  const handleLeaveRoom = () => {
    socket.disconnect()
    navigate("/")
    toast.success("Room left");
  }
  return (
    <div className="md:w-[15%] p-2 py-3 flex flex-col gap-2 ">
      <h1 className="text-xl font-bold">Co-code</h1>
      <h2 className="mt-2 font-semibold">Joined users</h2>
      <Separator orientation="horizontal" size="4" />
      <div className="flex flex-col gap-2">
        {clients.map((client) => (
          <div key={client.socketId} className="flex gap-2 items-center">
            <Avatar size={"1"} fallback={client.username[0]} />
            <p>
              {client.username}
              {client.username === username ? " (you)" : ""}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <Separator orientation="horizontal" size="4" />
        <Button radius="large" variant="soft" onClick={handleRoomIdCopy}>
          Copy room id
        </Button>
        <Button radius="large" color="crimson" variant="soft" onClick={handleLeaveRoom}>
          Leave
        </Button>
      </div>
    </div>
  );
};

export default RoomControls;
