import { Router } from "express";
import { ingredienteController } from "@controllers/ingredienteController";

const routerIngredientes = Router();

// GENERAL
routerIngredientes.get("/", ingredienteController.getIngredientes);
routerIngredientes.get("/:id", ingredienteController.getIngredienteById);
routerIngredientes.get(
  "/nombre/:nombre",
  ingredienteController.getIngredientesByNombre
);

export default routerIngredientes;
