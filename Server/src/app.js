import express from "express";
import cors from "cors";
import { guardarTemperatura } from "./controllers/temperaturas.controller.js";
import { Server } from "socket.io";
import http from "http";
import { randomInt } from "crypto";
import temperaturasRoutes from "./routes/Temperaturas.routes.js";
import { conn } from "./db.js";
const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, { cors: "*" });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("entro");
  console.log(req);
  return res.send("hola mundo");
});

app.post("/", (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
});

app.use(temperaturasRoutes);

var temperaturas = [
  {
    name: "sensor 1",
    series: [
      {
        name: "12:53:00",
        value: 30,
      },
      {
        name: "12:54:00",
        value: 34,
      },
      {
        name: "12:55:00",
        value: 38,
      },
    ],
  },
  {
    name: "sensor 2",
    series: [
      {
        name: "12:53:00",
        value: 28,
      },
      {
        name: "12:54:00",
        value: 32,
      },
      {
        name: "12:55:00",
        value: 35,
      },
    ],
  },
  {
    name: "sensor 3",
    series: [
      {
        name: "12:53:00",
        value: 31,
      },
      {
        name: "12:54:00",
        value: 34,
      },
      {
        name: "12:55:00",
        value: 37,
      },
    ],
  },
];
var minuto = 55;
var sensor = 0;

io.on("connection", (socket) => {
  // setInterval(() => {
  //   var startDate = "12:55:00";
  //   var [first, _, third] = startDate.split(":");
  //   var newDate = first + ":" + (minuto += 5).toString() + ":" + third;
  //   console.log(newDate);
  //   var randomSensor = temperaturas[sensor];
  //   var newSerie = {
  //     name: newDate,
  //     value: randomInt(28, 40),
  //   };
  //   sensor++;
  //   if (sensor === 3) {
  //     sensor = 0;
  //   }
  //   randomSensor.series.push(newSerie);
  // }, 10000);
  console.log("Cliente connectado");
  socket.emit("temperaturas", temperaturas);
  socket.broadcast.emit("temperaturas", temperaturas);
});

conn();
export default httpServer;
