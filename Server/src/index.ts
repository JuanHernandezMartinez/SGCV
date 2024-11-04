import httpServer from "./app";
import { AppDataSource } from "./psqlDB";

async function main() {
  await AppDataSource.initialize();
  httpServer.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000");
  });
}

main();
