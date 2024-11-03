import { Router } from "express";
import { recetaController } from "@controllers/recetaController";

const routerRecetas = Router();

routerRecetas.get("/", recetaController.getRecetas);

export default routerRecetas;
