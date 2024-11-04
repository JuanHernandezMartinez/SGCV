import mongoose from "mongoose";
const mongodb_URI = "psql://localhost:5432/Temperaturas";

export async function conn() {
  try {
    console.log(mongodb_URI);
    const db = await mongoose.connect(mongodb_URI);
    console.log("conexion establecida: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
}
