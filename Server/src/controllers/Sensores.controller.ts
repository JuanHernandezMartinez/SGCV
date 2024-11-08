import { Request, Response } from "express";
import { Sensor } from "../models/Sensor";
import { Repository } from "typeorm";

interface SensoresController {
  obtenerSensores(req: Request, res: Response): any;

  createSensor(req: Request, res: Response): any;

  updateSensor(req: Request, res: Response): any;

  deleteSensor(req: Request, res: Response): any;
}

export class SensoresControllerImpl implements SensoresController {
  constructor(private sensorRepository: Repository<Sensor>) {}

  public async obtenerSensores(req: Request, res: Response) {
    console.log("Obteniendo Sensores");
    let sensors: Sensor[] = await this.sensorRepository.find();
    return res.send(sensors);
  }

  public async createSensor(req: Request, res: Response) {
    let sensorData: Sensor = req.body;
    let newSensor = this.sensorRepository.create(sensorData);
    let query = await this.sensorRepository.save(newSensor);
    console.log("Sensor creardo");
    return res.send(query);
  }

  public async updateSensor(req: Request, res: Response) {
    let { id } = req.params;
    let sensorData = req.body;
    let query = await this.sensorRepository.update(
      { id: parseInt(id) },
      sensorData
    );
    console.log("resultado del query: ", query);
    return res.send(sensorData);
  }

  public async deleteSensor(req: Request, res: Response) {
    let { id } = req.params;
    let findSensror = await this.sensorRepository.findOneBy({
      id: parseInt(id),
    });
    console.log(findSensror);
    if (findSensror) {
      await this.sensorRepository.delete({ id: parseInt(id) });
      return res.status(200).send("Sensor eliminado");
    }
    return res.status(404).send("Sensor no encontrado");
  }
}
