import { Request, Response, Router } from "express";
import { AuthServiceImpl } from "./auth.controller";
import { AppDataSource } from "../psqlDB";
import { Usuario } from "../models/Usuario";

const router = Router();
const usuariosRepository = AppDataSource.getRepository(Usuario);
const authServiceImpl = new AuthServiceImpl(usuariosRepository);

router.post(
  "/api/auth/login",
  async (req: Request, res: Response): Promise<any> => {
    return await authServiceImpl.login(req, res);
  }
);

router.post(
  "/api/auth/register",
  async (req: Request, res: Response): Promise<any> => {
    return await authServiceImpl.register(req, res);
  }
);

export default router;
