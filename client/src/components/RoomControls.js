import { Avatar, Button, Separator } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { appContext } from "../context/AppProvider";

const RoomControls = ({ clients }) => {
  const { username } = useContext(appContext);

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
        <Button radius="large" variant="soft">
          Copy room id
        </Button>
        <Button radius="large" color="crimson" variant="soft">
          Leave
        </Button>
      </div>
    </div>
  );
};

export default RoomControls;
