import { NextFunction, Router, Request, Response } from "express";
import {
  obtenerTemperaturas,
  guardarTemperatura,
} from "../controllers/temperaturas.controller";
import { AuthServiceImpl } from "../auth/auth.controller";
import { AppDataSource } from "../psqlDB";
import { Usuario } from "../models/Usuario";
const router: Router = Router();
const url = "/api";
const usuariosRepository = AppDataSource.getRepository(Usuario);
const authServiceImpl = new AuthServiceImpl(usuariosRepository);
import jwt from "jsonwebtoken";
const secretKey = "sgcvjwtsecret777";



async function obtenerTemperatura(req: any, res: any) {
  console.log("controller obtener por id");
  console.log("parametrps", req.params);
  return res.status(200).json({ message: "Temperatura obtenida correctamente" });
}
router.get("/api/temperaturas", authServiceImpl.verify, obtenerTemperatura);
router.get("/api/temperaturas/:id", authServiceImpl.verify, obtenerTemperatura);
router.post("/api/temperaturas", authServiceImpl.verify, guardarTemperatura);





export default router;
