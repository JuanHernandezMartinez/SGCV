import "reflect-metadata";
import express from "express";
import cors from "cors";
// import { conn } from "./psqlDB.js";
import http from "http";
import temperaturasRoutes from "./routes/Temperaturas.routes";
import ventilacionRoutes from "./routes/Ventilacion.routes";
import sensoresRoutes from "./routes/Sensores.routes";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", async function connection(ws) {
  console.log("New client connected");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const text = data.toString(); // Convertimos el Buffer a texto
    console.log("Mensaje recibido: %s", text);
    let parseJson = JSON.parse(text);
    let parseData = JSON.stringify(parseJson);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(parseData);
      }
    });
  });
});

app.use(temperaturasRoutes);
app.use(ventilacionRoutes);
app.use(sensoresRoutes);
// conn();

export default httpServer;
