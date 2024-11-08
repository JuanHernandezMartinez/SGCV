import { Request, Response } from "express";

export async function encenderVentilador(req: Request, res: Response) {
  try {
    let onRequest = await fetch("http://192.168.1.150/turn", {
      method: "POST",
      body: JSON.stringify({ sexo: "si" }),
    });
    if (onRequest.status === 200) {
      console.log("Encendido con exito");
      return res.sendStatus(200);
    }
    console.log("Error en el try");
    return res.sendStatus(500);
  } catch (error) {
    console.log("Entro el catch");
    return res.sendStatus(500);
  }
}
