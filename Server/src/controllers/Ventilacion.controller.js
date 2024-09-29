export async function encenderVentilador(req, res) {
  let onRequest = await fetch("http://192.168.0.150/turn", {
    method: "POST",
    body: JSON.stringify({ sexo: "si" }),
  });
  console.log(onRequest);
  if (onRequest.status === 200) {
    console.log("Encendido con exito");
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
}
