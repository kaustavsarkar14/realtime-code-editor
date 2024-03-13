import { Button, Flex, Separator, TextField } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { appContext } from "../context/AppProvider";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const { username, setUsername } = useContext(appContext);
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const id = uuidv4();
    setRoomId(id);
    toast.success("Room id generated");
  };
  const handleJoinRoom = () => {
    if (!roomId || !username) {
      return toast.error("Please enter a room id and username");
    }
    navigate(`/editor/${roomId}`);
  };
  return (
    <div>
      <div className="md:max-w-[30%] mx-auto flex flex-col gap-4 mt-[30vh] md:p-0 p-2">
        <TextField.Input
          placeholder="Room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <TextField.Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button radius="large" variant="soft" onClick={handleJoinRoom}>
          Join Room
        </Button>
        <Flex direction="row" gap="4" align="center">
          <Separator orientation="horizontal" size="4" />
          <p className="text-center">or</p>
          <Separator orientation="horizontal" size="4" />
        </Flex>
        <Button radius="large" variant="surface" onClick={handleCreateRoom}>
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default Home;
