import { Request, Response, Router } from "express";
import { SensoresControllerImpl } from "../controllers/Sensores.controller";
import { AppDataSource } from "../psqlDB";
import { Usuario } from "../models/Usuario";
import { AuthServiceImpl } from "../auth/auth.controller";

const router: Router = Router();
const sensoresController = new SensoresControllerImpl();

const usuariosRepository = AppDataSource.getRepository(Usuario);
const authServiceImpl = new AuthServiceImpl(usuariosRepository);

router.get("/api/sensores",authServiceImpl.verify, (req: Request, res: Response): any => sensoresController.obtenerSensores(req, res)
);

router.get("/api/sensores/buscar/:basicName",authServiceImpl.verify, (req: Request, res: Response): any => sensoresController.obtenerSensoresPorBasicName(req, res)
);

router.get("/api/sensores/esp",authServiceImpl.verify, (req: Request, res: Response):any => sensoresController.getSensoresFromEsp(req,res) )

router.post("/api/sensores", authServiceImpl.verify, (req: Request, res: Response): any => sensoresController.createSensor(req, res)
);

router.put("/api/sensores/:id", authServiceImpl.verify, (req: Request, res: Response): any => sensoresController.updateSensor(req, res)
);

router.delete("/api/sensores/:id", authServiceImpl.verify, (req: Request, res: Response): any => sensoresController.deleteSensor(req, res)
);

export default router;
