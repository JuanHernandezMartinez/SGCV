import mongoose, { mongo } from "mongoose";
const mongodb_URI= 'mongodb://172.17.200.20:27017/Temperaturas'

export async function conn() {
  try {
    console.log(mongodb_URI)
    const  db= await mongoose.connect(mongodb_URI)
    console.log("conexion establecida: ", db.connection.name)
  } catch(error){
    console.error(error);
  }
}