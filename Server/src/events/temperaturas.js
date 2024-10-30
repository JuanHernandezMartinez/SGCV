// import { io } from "../app";

import { randomInt } from 'crypto';

export function setupSocketIO(io) {
    io.on("connection", async (socket) => {
        console.log("Conectado al socket");

        socket.on("tempEvent",async () => {
            let mediciones = await obtenerTemperaturas();
            console.log("Mediciones: ", mediciones);
            socket.emit("monitoreoTemp", mediciones);
            socket.broadcast.emit("monitoreoTemp", mediciones);
        })



    });
}

async function obtenerTemperaturas() {
    try {
        // Simulación de la obtención de temperaturas
        let medicion = randomInt(30, 38);
        return medicion;
    } catch (error) {
        console.log("Error en el catch: ", error);
        return "Error";
    }
}