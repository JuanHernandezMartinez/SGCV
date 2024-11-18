import { Router } from "express";
import {
  obtenerTemperatura,
  obtenerTemperaturas,
} from "../controllers/temperaturas.controller";
import { AuthServiceImpl } from "../auth/auth.controller";
import { AppDataSource } from "../psqlDB";
import { Usuario } from "../models/Usuario";

const router: Router = Router();
const usuariosRepository = AppDataSource.getRepository(Usuario);
const authServiceImpl = new AuthServiceImpl(usuariosRepository);

router.get("/api/temperaturas", authServiceImpl.verify, obtenerTemperaturas);
router.get("/api/temperaturas/:sensorName", authServiceImpl.verify, obtenerTemperatura);

export default router;
