import { Router } from "express";
import { encenderVentilador } from "../controllers/ventilacion.controller";

const router:Router = Router();

router.post("/api/ventilacion/turn", encenderVentilador);
 

export default router