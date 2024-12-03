import { Request, Response } from "express";

const esp32_url: string = process.env.ESP32_URL || "http://192.168.1.150";

export async function encenderVentilador(req: Request, res: Response) {
  let { sensorId } = req.params
  try {
    // Realizar la petición al esp32 para encender o apagar
    const turnRequest = await fetch(`${esp32_url}/turno?id=${sensorId}`, {
      method: "GET",

    });

    // Verificar si el dispositivo respondió con un estado no exitoso
    console.log(`Ventilador ${sensorId} afectado`)
    if (!turnRequest.ok) {
      res.status(turnRequest.status).json({
        message: `Error en el dispositivo: ${turnRequest.statusText} (${turnRequest.status})`,
      });
      return;
    }
    // Procesar la respuesta en caso de éxito
    const data = await turnRequest.json();
    res.status(200).json({ message: `Ventilador ${sensorId} encendido` });
    return;
  } catch (error) {
    // Manejar errores de red u otros problemas
    console.error("Error al conectar con el dispositivo:", error);
    res.status(500).json({
      message:
        "No se pudo conectar con el dispositivo. Verifica si está encendido o existe en la red.",
    });
    return;
  }
}

export async function checkSensoresStatus(_req: Request, res: Response) {
  // Realizar la petición al esp32 para encender o apagar
  try {
    const statusRequest = await fetch(`${esp32_url}/status`, {
      method: "GET",
    });
    let {status} = await statusRequest.json()
    res.status(200).json({ status })
    return;
  } catch (error) {
    res.sendStatus(500)
    return
  }
}
