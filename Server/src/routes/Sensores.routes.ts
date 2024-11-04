import { Router } from "express";
import { obtenerSensores } from "../controllers/Sensores.controller";
const router: Router = Router();

router.get("/api/sensores", obtenerSensores);

export default router;
