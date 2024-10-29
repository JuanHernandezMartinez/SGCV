import { io } from "../app";

io.on("connection", async (socket) => {
  try {
    let mediciones =await obtenerTemperaturas()
    socket.emit("temperaturas", mediciones);
    socket.broadcast.emit("temperaturas", mediciones);
  } catch (error) {
    return "Error al obtener las mediciones"
  }

});


async function obtenerTemperaturas() {
  try {
    console.log("Controller obtener temperaturas");
    let tempRequest = await fetch("http://192.168.1.150/temperaturas", { method: "GET" });
    let medicion = await tempRequest.json()
    console.log(medicion)
    return medicion
  } catch (error) {
    console.log("Error en el catch: ", error);
    return "Error"
  }
}
