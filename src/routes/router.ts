import { controller } from "@controllers/commonController";
import { Router } from "express";
import routerRecetas from "./routerRecetas";

const router = Router();

// RECETAS
router.get("/recetas", routerRecetas);

// DEFAULT
router.get("/", controller.sendDefaultMessage);
router.all("*", controller.sendNotFoundError);

export default router;
