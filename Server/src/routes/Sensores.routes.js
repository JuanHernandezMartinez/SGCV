import { Router } from "express";
import { obtenerSensores } from "../controllers/Sensores.controller.js";
const router = Router()

router.get("/api/sensores",obtenerSensores)

export default router