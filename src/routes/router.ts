import { controller } from "../controllers/commonController";
import { Router } from "express";
import routerRecetas from "./routerRecetas";

const router = Router();

router.get("/", (req, res) => {
  res.send(
    "Esta es la dirección base para obtener los datos, por favor utiliza los endspoints :)"
  );
});

router.get("/recetas", routerRecetas);

router.all("*", controller.sendNotFoundError);

export default router;
