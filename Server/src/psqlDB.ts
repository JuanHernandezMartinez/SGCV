import { DataSource } from "typeorm";
import { Medicion } from "./models/Medicion";
import { Sensor } from "./models/Sensor";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sgcvpasswd123",
  database: "sgcv",
  synchronize: true,
  logging: true,
  entities: [Medicion, Sensor],
  subscribers: [],
  migrations: [],
});
