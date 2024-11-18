import { Request, Response, Router } from "express";
import { encenderVentilador } from "../controllers/ventilacion.controller";
import { AppDataSource } from "../psqlDB";
import { Usuario } from "../models/Usuario";
import { AuthServiceImpl } from "../auth/auth.controller";

const router: Router = Router();
const usuariosRepository = AppDataSource.getRepository(Usuario);
const authServiceImpl = new AuthServiceImpl(usuariosRepository);

router.post("/api/ventilacion/turn", authServiceImpl.verify, encenderVentilador );

export default router;
