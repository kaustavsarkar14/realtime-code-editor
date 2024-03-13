import { Button, Flex, Separator, TextField } from "@radix-ui/themes";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="md:max-w-[30%] mx-auto flex flex-col gap-4 mt-[30vh] md:p-0 p-2">
        <TextField.Input placeholder="Room id" />
        <TextField.Input placeholder="Username" />
        <Button radius="large" variant="soft">
          Join Room
        </Button>
        <Flex direction="row" gap="4" align="center">
          <Separator orientation="horizontal" size="4" />
          <p className="text-center">or</p>
          <Separator orientation="horizontal" size="4" />
        </Flex>
        <Button radius="large" variant="surface">
          Create Room
        </Button>
      </div>
    </div>
  );
};

export default Home;
