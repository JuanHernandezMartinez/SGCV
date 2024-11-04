import { Router } from "express";
import {
  obtenerTemperatura,
  obtenerTemperaturas,
  guardarTemperatura,
} from "../controllers/temperaturas.controller";
const router: Router = Router();
const url = "/api";

router.get("/api/temperatura/:id", obtenerTemperatura);
router.get("/api/temperatura", obtenerTemperaturas);
router.post("/api/temperatura", guardarTemperatura);

export default router;
