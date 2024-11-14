import { sendError, sendSuccess } from "@utils/requestHandler";
import { Request, Response } from "express";

export class controller {
  static async sendNotFoundError(req: Request, res: Response) {
    sendError(res, "Endpoint not found", 404);
  }

  static async sendDefaultMessage(req: Request, res: Response) {
    sendSuccess(
      res,
      "Esta es la dirección base para obtener los datos, por favor utiliza los endspoints :)"
    );
  }
}
