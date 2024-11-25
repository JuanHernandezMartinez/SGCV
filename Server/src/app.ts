import "reflect-metadata";
import express from "express";
import cors from "cors";
import http from "http";
import temperaturasRoutes from "./routes/Temperaturas.routes";
import ventilacionRoutes from "./routes/Ventilacion.routes";
import sensoresRoutes from "./routes/Sensores.routes";
import { setupSocket } from "./events/temperaturas";
import { WebSocketServer } from "ws";
import AuthRoutes from "./auth/auth.routes";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const wss = new WebSocketServer({ server: httpServer });

setupSocket(wss);

app.use(temperaturasRoutes);
app.use(ventilacionRoutes);
app.use(sensoresRoutes);
app.use(AuthRoutes);

export default httpServer;
