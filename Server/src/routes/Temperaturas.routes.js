import { Router } from "express"
import { obtenerTemperatura, obtenerTemperaturas, guardarTemperatura } from "../controllers/Temperaturas.controller.js"
const router = Router()
const url = "/api"

router.get("/api/temperatura/:id", obtenerTemperatura)
router.get("/api/temperatura", obtenerTemperaturas)
router.post("/api/temperatura", guardarTemperatura)



export default router