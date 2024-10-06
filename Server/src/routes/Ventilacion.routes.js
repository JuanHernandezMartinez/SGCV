import { Router } from "express";
import { encenderVentilador } from "../controllers/ventilacion.controller.js";

const router = Router();

router.post("/api/ventilacion/turn", encenderVentilador);
 

export default router