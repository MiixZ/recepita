import RequestHandler from "@utils/requestHandler";
import { Request, Response } from "express";
import { controller } from "./commonController";

export class recetaController extends controller {
  static async getRecetas(req: Request, res: Response) {
    try {
      const recetas = "recetas";
      RequestHandler.sendSuccess(res, recetas);
    } catch (error: any) {
      // TODO: Agregar tipo de error.
      RequestHandler.sendError(res, error.message!);
    }
  }
}
