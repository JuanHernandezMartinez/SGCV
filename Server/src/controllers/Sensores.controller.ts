import { Request, Response } from "express";
import { Sensor } from "../models/Sensor";
import { Repository } from "typeorm";
import { SensorDTO } from "../models/DTO/Sensor.dto";

interface SensoresController {
  obtenerSensores(req: Request, res: Response): Promise<Response<any>>;

  createSensor(req: Request, res: Response): any;

  updateSensor(req: Request, res: Response): any;

  deleteSensor(req: Request, res: Response): any;

  getSensoresFromEsp(req: Request, res: Response): Promise<any>;
}

export class SensoresControllerImpl implements SensoresController {
  private esp32_url = process.env.ESP32_URL || "http://192.168.0.150";

  constructor(private sensorRepository: Repository<Sensor>) {}

  public async obtenerSensores(
    _req: Request,
    res: Response
  ): Promise<Response<any>> {
    console.log("Obteniendo Sensores");
    let sensors: Sensor[] = await this.sensorRepository.find();
    return res.send(sensors);
  }

  public async createSensor(req: Request, res: Response) {
    console.log("registrando sensor");
    console.log(req.body);
    let sensorData: SensorDTO = req.body;

    if (!this.checkSensorDto(sensorData)) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    let exist = await this.sensorRepository.findOneBy({
      basicName: sensorData.basicName,
    });

    if (exist?.basicName) {
      return res.status(400).json({ message: "Sensor ya registrado" });
    }

    let query = await this.sensorRepository.save(
      this.sensorRepository.create(sensorData)
    );
    console.log("Sensor creardo");
    return res.send(query);
  }

  public async updateSensor(req: Request, res: Response) {
    let { id } = req.params;
    let sensorData: SensorDTO = req.body;

    if (!this.checkSensorDto(sensorData)) {
      return res.status(400).json({ message: "Faltan datos" });
    }

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
    console.log("Sensor encontrado para eliminar:", findSensror);
    if (findSensror) {
      await this.sensorRepository.delete({ id: parseInt(id) });
      return res.status(200).json({message:"Sensor eliminado"});
    }
    return res.status(404).json({message:"Sensor no encontrado"});
  }

  public async getSensoresFromEsp(_req: Request, res: Response): Promise<any> {
    // let sensoresFromEsp = await fetch(`${this.esp32_url}/sensores`, {
    //   method: "GET",
    // });

    // if (!sensoresFromEsp.ok) {
    //   res.status(sensoresFromEsp.status).json({
    //     message: `Error en el dispositivo: ${sensoresFromEsp.statusText} (${sensoresFromEsp.status})`,
    //   });
    //   return;
    // }
    // // Procesar la respuesta en caso de éxito
    // const data = await sensoresFromEsp.json();
    let data = [
      { basicName: "sensor1" },
      { basicName: "sensor2" },
      { basicName: "sensor3" },
      { basicName: "sensor4" },
    ];

    let exist = await this.sensorRepository.find({select:["basicName"]});
    exist.forEach((s) => {
      data = data.filter((d) => {
        return d.basicName !== s.basicName;
      });
    });

    res.status(200).json({ data });
    return;
  }

  private checkSensorDto(sensorDto: SensorDTO): boolean {
    if (!sensorDto.basicName || sensorDto.basicName === "") {
      return false;
    }
    if (!sensorDto.sensorName || sensorDto.sensorName === "") {
      return false;
    }
    return true;
  }
}
