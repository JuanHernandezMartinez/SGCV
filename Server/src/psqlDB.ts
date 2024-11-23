import { DataSource } from "typeorm";
import { Medicion } from "./models/Medicion";
import { Sensor } from "./models/Sensor";
import { Usuario } from "./models/Usuario";
import { Role } from "./models/Rol";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sgcvpasswd123",
  synchronize: true,
  database: "sgcv",
  entities: [Medicion, Sensor, Usuario, Role],
  subscribers: [],
  migrations: [],
});
