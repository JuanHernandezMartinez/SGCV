import { Router } from "express";
import { encenderVentilador } from "../controllers/Ventilacion.controller.js";

const router = Router();

router.post("/api/ventilacion/turn", encenderVentilador);
 

export default router