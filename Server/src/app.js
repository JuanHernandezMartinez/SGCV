import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import temperaturasRoutes from "./routes/Temperaturas.routes.js";
import ventilacionRoutes from "./routes/Ventilacion.routes.js";
import sensoresRoutes from "./routes/Sensores.routes.js";
import { conn } from "./db.js";
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

// conn();
export default httpServer;
