import { Request, Response } from "express";
import { controller } from "./commonController";

import recetas from "@db/recetas.json";
import { sendError, sendSuccess } from "@utils/requestHandler";

export class recetaController extends controller {
  static async getRecetas(req: Request, res: Response) {
    try {
      sendSuccess(res, recetas);
    } catch (error: any) {
      // TODO: Agregar tipo de error.
      sendError(res, error.message!);
    }
  }

  static async getReceta(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const receta = recetas.find((receta) => String(receta.id) === id);

      if (!receta) {
        sendError(res, "Receta no encontrada", 404);
      }

      sendSuccess(res, receta);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }

  static async getRecetasByIngrediente(req: Request, res: Response) {
    try {
      const ingrediente = req.params.ingrediente;
      const recetasByIngrediente = recetas.filter((receta) =>
        receta.ingredientes.includes(ingrediente)
      );

      sendSuccess(res, recetasByIngrediente);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }

  static async getRecetasByNombre(req: Request, res: Response) {
    try {
      const nombre = req.params.nombre;
      const recetasByNombre = recetas.filter((receta) =>
        receta.nombre.toLowerCase().includes(nombre.toLowerCase())
      );

      sendSuccess(res, recetasByNombre);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }
}
