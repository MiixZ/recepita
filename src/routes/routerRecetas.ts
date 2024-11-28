import { Router } from "express";
import { recetaController } from "@controllers/recetaController";

const routerRecetas = Router();

// GENERAL
routerRecetas.get("/", recetaController.getRecetas);
routerRecetas.get("/:id", recetaController.getReceta);

// POR INGREDIENTES
routerRecetas.get(
  "/ingrediente/:ingrediente",
  recetaController.getRecetasByIngrediente
);

export default routerRecetas;
