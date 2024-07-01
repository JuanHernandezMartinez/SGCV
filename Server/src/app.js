import express from "express";
import cors from "cors";
import { guardarTemperatura } from "./controllers/temperaturas.controller";

const app = express();

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

export default app;
