import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import jwt from "jsonwebtoken";
import { UsuarioDto } from "../models/DTO/Usuario.dto";
const secretKey = "secret";

interface AuthService {
  login(req: Request, res: Response): any;

  register(req: Request, res: Response): any;

  verify(req: Request, res: Response): any;
}

export class AuthServiceImpl implements AuthService {
  constructor(private userRepository: Repository<Usuario>) {}

  public async login(req: Request, res: Response) {
    if (!req.body) {
      return res
        .sendStatus(400)
        .json({ message: "Username and password are required" });
    }
    console.log(req.body);
    let { user, password } = req.body;
    console.log(user);
    let userDb = await this.userRepository.findOne({
      where: { username: user },
    });

    console.log("userDB: ", userDb);

    if (!userDb?.id) {
      return res.sendStatus(404);
    }

    if (password !== userDb.password) {
      return res.sendStatus(404);
    }

    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
    console.log("creando el token: ", token);
    return res.status(200).json({ access_token: token });
  }

  public async register(req: Request, res: Response) {
    if (!req.body) {
      return res.send(400).json({ message: "Todos los campos son requeridos" });
    }
    let { user, password, confirmPassword, rol } = req.body;
  }
  public verify(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }

  private checkData(usuario: UsuarioDto): boolean {
    if (!usuario.username || usuario.username === "") return false;

    if (!usuario.password) return false;

    if (!usuario.confirmPassword) return false;

    if (!usuario.rol) return false;

    return true;
  }
}
