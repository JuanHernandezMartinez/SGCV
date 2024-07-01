import Medicion from "../models/Medicion.js";

export async function guardarTemperatura(medicion) {
    console.log(medicion)
  try {
    medicionSaved = newMedicion.save();
    const newMedicion = new Medicion(medicion);
    return medicionSaved;
  } catch (error) {
    console.log(error);
  }
  
}
