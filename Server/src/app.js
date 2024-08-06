import express from "express";
import cors from "cors";
import { guardarTemperatura } from "./controllers/temperaturas.controller.js";
import { Server } from "socket.io";
import http from "http";
import { randomInt } from "crypto";

const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, { cors: "*" });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("entro una peticion");
  return res.send("hola mundo");
});

app.post("/", (req, res) => {
  guardarTemperatura(req.body);
  return res.sendStatus(200);
});
const temperaturas = [
  {
    label: "Sensor 0",
    data: [36],
    fill: false,
    borderColor: "yellow",
    tension: 0.4,
  },
  {
    label: "Sensor 1",
    data: [35],
    fill: false,
    borderColor: "red",
    tension: 0.4,
  },
  {
    label: "Sensor 2",
    data: [34],
    fill: false,
    borderColor: "blue",
    tension: 0.4,
  },
];

io.on("connection", (socket) => {
  // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // let sensor = `Sensor ${randomInt(3)}`;
  // let color = (sensor === 0 ? "yellow" : (sensor === 1 ? "red" : "blue"));
  // console.log(color)
  // let temperatura = temperaturas.find(t => t.label === sensor)
  // temperatura.data.push(randomInt(30,40))
  // console.log(temperatura)
  // socket.emit("temperaturas", temperaturas);
  // socket.broadcast.emit("temperaturas", temperaturas);

  const data = {
    value: Math.floor(Math.random() * 100),
    label: new Date().toLocaleTimeString()
  };
  socket.emit('temperaturas', data);

});

export default httpServer;
