import { DataSource } from "typeorm";
import { Medicion } from "./models/Medicion";
import { Sensor } from "./models/Sensor";
import { Usuario } from "./models/Usuario";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sgcvpasswd123",
  database: "sgcv",
  synchronize:true,
  entities: [Medicion, Sensor, Usuario],
  subscribers: [],
  migrations: [],
});
