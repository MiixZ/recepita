import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(
    "Esta es la dirección base para obtener los datos, por favor utiliza los endspoints :)"
  );
});

export default router;
