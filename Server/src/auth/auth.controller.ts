import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Usuario } from "../models/Usuario";
import jwt from "jsonwebtoken";
import { UsuarioDto } from "../models/DTO/Usuario.dto";
import bcrypt from "bcrypt";

const secretKey = "sgcvjwtsecret777";

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
        .json({ message: "Username and password are required" });
    }
    console.log(req.body);
    let { user, password } = req.body;
    console.log(user);
    let userDb = await this.userRepository.findOne({
      where: { username: user },
    });

    if (!userDb?.id) {
      return res.status(404).json({ message: "Este usuario no exite" });
    }
    let comparePassowrd = await bcrypt.compare(password, userDb.password);

    if (!comparePassowrd) {
      return res.sendStatus(404);
    }

    const token = jwt.sign(
      { user: userDb.username, rol: userDb.rol },
      secretKey,
      { expiresIn: "1h" }
    );
    console.log("creando el token: ", token);
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

    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = this.userRepository.create({
      username: user,
      password: hashedPassword,
      rol: rol,
    });
    let userDB = await this.userRepository.save(newUser);
    console.log(userDB);

    return res.status(201).json({ messag: "Usuario creado con exito" });
  }

  public verify(req: Request, res: Response, next: NextFunction) {
    let header = req.header("Authorization") || "";
    console.log("header: ", req.header("Authorization"));
    let token = header.trim();
    console.log("token tras el split:", token);
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    try {
      jwt.verify(token, secretKey, (err, verifiedJwt) => {
        if (err) {
          console.log("Error al verificar el token")
          return res.send(err.message);
        }
        console.log("verificado correctamente:", verifiedJwt);
        next();
      });
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
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

interface UserPayload {
  data: {
    user: string;
    rol: string;
    iat: string;
    exp: string;
  };
  // otros campos que tu payload de JWT pueda tener
}
