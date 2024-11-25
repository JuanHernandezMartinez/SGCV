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

router.post("/api/auth/register", authServiceImpl.verify, async (req, res) => {
  await authServiceImpl.register(req, res);
});

router.get("/api/usuarios", authServiceImpl.verify, async (req, res) => {
  await authServiceImpl.obtenerUsuarios(req, res);
});

router.get("/api/roles", authServiceImpl.verify, async (req, res) => {
  await authServiceImpl.getRoles(req, res);
});


export default router;
