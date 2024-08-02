import express from "express";
import cors from "cors";
import { guardarTemperatura } from "./controllers/temperaturas.controller.js";
import {Server} from 'socket.io'
import http from 'http'

const app = express();
const httpServer= http.createServer(app)
export const io=new Server(httpServer,{cors:'*'})
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("entro una peticion");
  return res.send("hola mundo");
});

app.post("/", (req, res) => {
  guardarTemperatura(req.body)
  return res.sendStatus(200);
});



export default httpServer;
