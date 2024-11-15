export async function obtenerTemperaturas(req: any, res: any) {
  try {
    console.log("Controller obtener temperaturas");
    let tempRequest = await fetch("http://192.168.1.150/temperaturas", {
      method: "GET",
    });
    let medicion = await tempRequest.json();
    console.log(medicion);
    return res.send(medicion);
  } catch (error) {
    console.log("Error en el catch: ", error);
    return res.status(500);
  }
}

export async function obtenerTemperatura(req: any, res: any) {
  console.log("controller obtener por id");
  console.log(req.params);
  return res.status(200);
}

export async function guardarTemperatura(req: any, res: any) {
  // console.log(medicion);
  // const { medicion } = req.body;
  // try {
  //   medicionSaved = newMedicion.save();
  //   const newMedicion = new Medicion(medicion);
  //   return medicionSaved;
  // } catch (error) {
  //   console.log(error);
  // }
}
