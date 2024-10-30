import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import temperaturasRoutes from "./routes/Temperaturas.routes.js";
import ventilacionRoutes from "./routes/Ventilacion.routes.js";
import sensoresRoutes from "./routes/Sensores.routes.js";
import { conn } from "./db.js";
import { randomInt } from "crypto";

const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, { cors: "*" });

app.use(cors());
app.use(express.json());
app.use(temperaturasRoutes);
app.use(ventilacionRoutes);
app.use(sensoresRoutes)
app.get("/",(req,res)=>{
    console.log("Entro a la raiz")
    res.send("Hola mundo")
})


io.on("connection", async (socket) => {
    console.log("Conectado al socket")
    
    socket.emit("sexo", "Hola sexoso")
    socket.broadcast.emit("sexo", "Hola sexoso")

  socket.on("pito", ()=>{
    socket.emit("sexo1", "Hola sexoso1")
    socket.broadcast.emit("sexo1", "Hola sexoso1")
  })
});



io.on("temp",  async (socker)=>{
    try {
    
      let mediciones = await obtenerTemperaturas()
      console.log("Mediciones: ", mediciones)
      socket.emit("temperaturas", mediciones);
      socket.broadcast.emit("temperaturas", mediciones);
    } catch (error) {
      return "Error al obtener las mediciones"
    }
  }
)



async function obtenerTemperaturas() {
  try {
    console.log("Controller obtener temperaturas");
    // let tempRequest = await fetch("http://192.168.1.150/temperaturas", { method: "GET" });
    // let medicion = await tempRequest.json()
    let medicion = randomInt(5)
    console.log(medicion)
    return medicion
  } catch (error) {
    console.log("Error en el catch: ", error);
    return "Error"
  }
}


// conn();
export default httpServer;
