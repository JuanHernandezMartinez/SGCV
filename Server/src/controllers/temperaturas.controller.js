import Medicion from "../models/Medicion.js";

export async function obtenerTemperaturas(req, res) {
  console.log("Controller obtener temperaturas");
  return [];
}

export async function obtenerTemperatura(req, res) {
  console.log('controller obtener por id')
  console.log(req.params)
  return res.sendStatus(200)
}

export async function guardarTemperatura(req, res) {
  console.log(medicion);
  const { medicion } = req.body;
  try {
    medicionSaved = newMedicion.save();
    const newMedicion = new Medicion(medicion);
    return medicionSaved;
  } catch (error) {
    console.log(error);
  }
}
