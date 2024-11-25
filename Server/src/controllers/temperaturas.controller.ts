import { Request, Response } from "express";
import { AppDataSource } from "../psqlDB";
import { Medicion } from "../models/Medicion";

const temperatureRepository = AppDataSource.getRepository(Medicion);

export async function obtenerTemperaturas(
  req: Request,
  res: Response
): Promise<void> {
  let temperaturas = await temperatureRepository.find();
  res.status(200).json({ data: temperaturas });
}

export async function obtenerTemperatura(req: Request, res: Response) {
  let { basicName } = req.params;
  console.log(basicName);
  if (!basicName || basicName === "") {
    res.status(400).json({ message: "Hace falta el nombre del sensor" });
    return;
  }
  let temperaturas = await temperatureRepository.findBy({ basicName });
  console.log(temperaturas);
  res.status(200).json({ data: temperaturas });
  return
}
