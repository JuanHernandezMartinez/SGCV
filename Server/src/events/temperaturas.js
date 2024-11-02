// import { io } from "../app";

import { randomInt } from "crypto";

export function setupSocketIO(sockjsServer) {
    sockjsServer.on('connection', (conn) => {
        console.log('Cliente conectado');
    
        // Escuchar mensajes del cliente
        conn.on('data', (message) => {
            console.log('Mensaje recibido:', message);
            conn.write(`Servidor: Recibí tu mensaje -> ${message}`);
        });
    
        // Manejar desconexión del cliente
        conn.on('close', () => {
            console.log('Cliente desconectado');
        });
    
        // Manejar errores en la conexión
        conn.on('error', (err) => {
            console.error('Error en la conexión:', err);
        });
    });
}


// // Escuchar mensajes del cliente
// conn.on("data", (message) => {
//     console.log("Mensaje recibido:", message);

//     // Enviar un mensaje de vuelta al cliente
//     conn.write(`Servidor: Recibí tu mensaje -> ${message}`);
//   });

//   // Manejar la desconexión
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
