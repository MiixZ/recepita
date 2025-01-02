import { Request, Response } from "express";
import { controller } from "./commonController";

import { Ingrediente } from "@models/ingrediente";
import { ingredienteService } from "@services/ingrediente";
import { sendError, sendSuccess } from "@utils/requestHandler";

export class ingredienteController extends controller {
  static async getIngredientes(req: Request, res: Response) {
    try {
      const ingredientes = await ingredienteService.getIngredientes();

      sendSuccess(res, ingredientes);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }

  static async getIngredienteById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const ingrediente: Ingrediente | null =
        await ingredienteService.getIngredienteById(id);

      if (!ingrediente) {
        sendError(res, "Ingrediente no encontrado", 404);
      }

      sendSuccess(res, ingrediente);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }

  static async getIngredientesByNombre(req: Request, res: Response) {
    try {
      const nombre = req.params.nombre;
      const ingredientesByNombre =
        await ingredienteService.getIngredientesByNombre(nombre);

      sendSuccess(res, ingredientesByNombre);
    } catch (error: any) {
      sendError(res, error.message!);
    }
  }
}
