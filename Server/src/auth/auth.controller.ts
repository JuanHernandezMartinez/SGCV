import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secretKey: string = "sgcvjwtsecret777";

interface AuthService {
  login(req: Request, res: Response): any;

  register(req: Request, res: Response): any;

  verify(req: Request, res: Response, next: NextFunction): any;
}

export class AuthServiceImpl implements AuthService {
  constructor(private userRepository: Repository<Usuario>) {}

  public async login(req: Request, res: Response) {
    if (!req.body) {
      return res
        .sendStatus(400)
        .json({ message: "El usuario y la contraseña son requeridos" });
    }
    let { user, password } = req.body;
    if (
      user === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      console.log("admin inicio sesion");
      const token = jwt.sign({ user: user, rol: "admin" }, secretKey, {
        expiresIn: "5m",
      });
      return res.status(200).json({ access_token: token });
    }

    let userDb = await this.userRepository.findOne({
      where: { username: user },
    });

    if (!userDb?.id) {
      console.log("No se encontro en la db")
      res.status(404).json({ message: "Credenciales invalidas" });
      return
    }

    let comparePassowrd = await bcrypt.compare(password, userDb.password);

    if (!comparePassowrd) {
      return res.sendStatus(404);
    }

    const token = jwt.sign(
      { user: userDb.username, rol: userDb.rol },
      secretKey,
      { expiresIn: "5m" }
    );
    return res.status(200).json({ access_token: token });
  }

  public async register(req: Request, res: Response) {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }
    let { user, password, confirmPassword, rol } = req.body;

    if (!this.checkData(user, password, confirmPassword, rol)) {
      console.log("dato no validos");
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    let alreadyExists = await this.userRepository.findOneBy({ username: user });

    if (alreadyExists?.id) {
      return res
        .status(400)
        .json({ message: "Este usuario no esta disponible" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = this.userRepository.create({
      username: user,
      password: hashedPassword,
      rol: rol,
    });
    try {
      let userDB = await this.userRepository.save(newUser);
      return res.status(201).json({ message: "Usuario creado con exito" });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
  }

  verify(req: Request, res: Response, next: NextFunction): void {
    let header = req.header("Authorization") || "";
    if (!header || header === "") {
      res.status(401).json({ message: "No autorizado" });
      return;
    }
    let [_bearer, token] = header.split("Bearer ");
    token.trim();
    if (!token) {
      return;
    }
    try {
      jwt.verify(token, secretKey, (err: any, verifiedJwt: any) => {
        if (err) {
          console.log("Error al verificar el token");
          res.status(401).json({ message: err.message });
          return;
        }
        next();
      });
    } catch (error) {
      res.status(401).json({ message: "Error al verificar el token" });
      return;
    }
  }

  private checkData(
    username: string,
    password: string,
    confirmPassword: string,
    rol: string
  ): boolean {
    if (!username || username === "") return false;

    if (!password) return false;

    if (!confirmPassword) return false;

    if (!rol) return false;

    if (password !== confirmPassword) return false;

    return true;
  }
}
