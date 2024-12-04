import { Request, Response } from "express";
import { AppDataSource } from "../psqlDB";
import { Medicion } from "../models/Medicion";

const temperatureRepository = AppDataSource.getRepository(Medicion);

export async function obtenerTemperaturas(
  _req: Request,
  res: Response
): Promise<void> {
  const data = await temperatureRepository
    .createQueryBuilder("medicion")
    .select("medicion.basicName", "basicName")
    .addSelect("JSON_AGG(JSON_BUILD_OBJECT('temperature', medicion.temperature, 'fecha', medicion.fecha))",)
    .groupBy("medicion.basicName")
    .getRawMany();

  res.status(200).json({ data });
}

export async function obtenerTemperaturaPorSensor(req: Request, res: Response) {
  let { basicName } = req.params;
  console.log(basicName);
  if (!basicName || basicName === "") {
    res.status(400).json({ message: "Hace falta el nombre del sensor" });
    return;
  }
  let temperaturas = await temperatureRepository.findBy({ basicName });
  console.log(temperaturas);
  res.status(200).json({ data: temperaturas });
  return;
}
