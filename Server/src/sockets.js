import { io } from "./app";

io.on('connect',(socket)=>{
    console.log("conected to socket")
})