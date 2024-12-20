import WebSocket, { WebSocketServer } from "ws";
import { AppDataSource } from "../psqlDB";
import { Medicion } from "../models/Medicion";

export async function setupSocket(wss: WebSocketServer) {
  const medicionRepository = AppDataSource.getRepository(Medicion);

  wss.on("connection", async function connection(ws: WebSocket) {
    console.log("New client connected");
    ws.on("error", console.error);

    ws.on("message", async function message(data) {
      const text = data.toString(); // Convertimos el Buffer a texto
      let parseJson = JSON.parse(text);
      try {
        parseJson.mediciones.forEach((m:Medicion)=>{
          medicionRepository.save(m)
        })

        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(parseJson));
          }
        });
      } catch (error) {
        console.log("No se pudo insertar la medicion en la DB");
      }
    });
  });
}
