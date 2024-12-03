import { Router } from "express";
import { checkSensoresStatus, encenderVentilador } from "../controllers/ventilacion.controller";
import { AppDataSource } from "../psqlDB";
import { Usuario } from "../models/Usuario";
import { AuthServiceImpl } from "../auth/auth.controller";

const router: Router = Router();
const usuariosRepository = AppDataSource.getRepository(Usuario);
const authServiceImpl = new AuthServiceImpl(usuariosRepository);

router.post("/api/ventilacion/turn/:sensorId", encenderVentilador );

router.get("/api/ventilacion/status", checkSensoresStatus )

export default router;
