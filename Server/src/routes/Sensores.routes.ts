import { Request, Response, Router } from "express";
import { SensoresControllerImpl } from "../controllers/Sensores.controller";
import { Sensor } from "../models/Sensor";
import { AppDataSource } from "../psqlDB";

const router: Router = Router();
const sensoresRepository = AppDataSource.getRepository(Sensor);
const sensoresController = new SensoresControllerImpl(sensoresRepository);

router.get("/api/sensores", (req: Request, res: Response): any =>
  sensoresController.obtenerSensores(req, res)
);

router.post("/api/sensores", (req: Request, res: Response): any =>
  sensoresController.createSensor(req, res)
);

router.put("/api/sensores/:id", (req: Request, res: Response): any =>
  sensoresController.updateSensor(req, res)
);

router.delete("/api/sensores/:id", (req: Request, res: Response): any =>
  sensoresController.deleteSensor(req, res)
);

export default router;
