import { Request, Response, Router } from "express";
import { encenderVentilador } from "../controllers/ventilacion.controller";

const router: Router = Router();

router.post("/api/ventilacion/turn", (req: Request ,res: Response): any => encenderVentilador(req, res));

export default router;
