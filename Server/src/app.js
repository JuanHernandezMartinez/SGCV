import express from "express";
import cors from "cors";
import { guardarTemperatura } from "./controllers/temperaturas.controller.js";
import { Server } from "socket.io";
import http from "http";
import { randomInt } from "crypto";
import temperaturasRoutes from './routes/Temperaturas.routes.js'
const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, { cors: "*" });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("entro")
  console.log(req)  
  return res.send("hola mundo");
});

app.post("/", (req, res) => {
  console.log(req.body)
  return res.sendStatus(200);
});

app.use(temperaturasRoutes)


const temperaturas = [
  {
    label: "Sensor 0",
    data: [36],
    fill: false,
    borderColor: "yellow",
    tension: 0.5,
  },
  {
    label: "Sensor 1",
    data: [35],
    fill: false,
    borderColor: "red",
    tension: 0.5,
  },
  {
    label: "Sensor 2",
    data: [33],
    fill: false,
    borderColor: "blue",
    tension: 0.5,
  },
];

io.on("connection", (socket) => {
  let sensor = randomInt(3)
  let temperatura = randomInt(32, 40)
  let findSensor = temperaturas.find(s => s.label === `Sensor ${sensor}`)
  console.log("Sensor encontrado: ", findSensor)
  findSensor.data.push(temperatura)

  socket.emit('temperaturas', temperaturas);
  socket.broadcast.emit('temperaturas', temperaturas);
});

export default httpServer;
