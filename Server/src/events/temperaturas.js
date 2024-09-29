import { io } from "../app";

io.on("connection", (socket) => {
  socket.emit("temperaturas", temperaturas);
  socket.broadcast.emit("temperaturas", temperaturas);
});
