const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const PORT = 8000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
