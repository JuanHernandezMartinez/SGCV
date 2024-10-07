export async function encenderVentilador(req, res) {
  try {
    let onRequest = await fetch("http://192.168.0.150/turn", {
      method: "POST",
      body: JSON.stringify({ sexo: "si" }),
    });
    if (onRequest.status === 200) {
      console.log("Encendido con exito");
      return res.sendStatus(200).end();
    }
    console.log("Error en el try")
    return res.sendStatus(500).end();
  } catch (error) {
    console.log("Entro el catch")
    return res.sendStatus(500).end();
  }
}
