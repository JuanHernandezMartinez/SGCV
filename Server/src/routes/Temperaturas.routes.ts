import { Router } from "express";
import {
  obtenerTemperatura,
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

router.get("/api/temperaturas/:id", obtenerTemperatura);
router.get("/api/temperaturas", async (req, res) => {authServiceImpl.verify(req, res, await obtenerTemperatura(req, res))});
router.post("/api/temperaturas", guardarTemperatura);

export default router;
