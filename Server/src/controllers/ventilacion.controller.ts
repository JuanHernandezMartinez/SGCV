import { Request, Response } from "express";

export async function encenderVentilador(req: Request, res: Response) {
  const esp32_url: string = "http://192.168.0.150/turn";

  try {
    // Realizar la petición
    const turnRequest = await fetch(esp32_url, {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });

    // Verificar si el dispositivo respondió con un estado no exitoso
    if (!turnRequest.ok) {
      res.status(turnRequest.status).json({
        message: `Error en el dispositivo: ${turnRequest.statusText} (${turnRequest.status})`,
      });
      return;
    }

    // Procesar la respuesta en caso de éxito
    const data = await turnRequest.json();
    res.status(200).json({ message: "Ventilador encendido", data });
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