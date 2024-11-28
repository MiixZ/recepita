import { controller } from "@controllers/commonController";
import { Router } from "express";
import routerRecetas from "./routerRecetas";
import routerIngredientes from "./routerIngredientes";

const router = Router();

// RECETAS
router.use("/recetas", routerRecetas);
router.use("/ingredientes", routerIngredientes);

// DEFAULT
router.get("/", controller.sendDefaultMessage);
router.all("*", controller.sendNotFoundError);

export default router;
