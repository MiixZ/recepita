import { controller } from "../controllers/commonController";
import { recetaController } from "../controllers/recetaController";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(
    "Esta es la dirección base para obtener los datos, por favor utiliza los endspoints :)"
  );
});

router.get("/recetas", recetaController.getRecetas);

router.all("*", controller.sendNotFoundError);

export default router;
