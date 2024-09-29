import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import temperaturasRoutes from "./routes/Temperaturas.routes.js";
import ventilacionRoutes from "./routes/Ventilacion.routes.js";
import { conn } from "./db.js";
const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, { cors: "*" });

app.use(cors());
app.use(express.json());
app.use(temperaturasRoutes);
app.use(ventilacionRoutes);

// conn();
export default httpServer;
