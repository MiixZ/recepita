import { Request, Response } from "express";
import { controller } from "./commonController";

import { sendError, sendSuccess } from "@utils/requestHandler";
import { recetaService } from "@services/receta";

export class recetaController extends controller {
  static async getRecetas(req: Request, res: Response) {
    try {
      const recetasSearched = recetaService.getRecetas();

      sendSuccess(res, recetasSearched);
    } catch (error: any) {
      // TODO: Agregar tipo de error.
      sendError(res, error.message!);
    }
  }

  static async getReceta(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const receta = recetaService.getReceta(id);

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
      const recetasByIngrediente =
        recetaService.getRecetasByIngrediente(ingrediente);

      sendSuccess(res, recetasByIngrediente);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }

  static async getRecetasByNombre(req: Request, res: Response) {
    try {
      const nombre = req.params.nombre;
      const recetasByNombre = recetaService.getRecetasByNombre(nombre);

      sendSuccess(res, recetasByNombre);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }
}
