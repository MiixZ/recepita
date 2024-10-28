import RequestHandler from "../utils/requestHandler";
import { Request, Response } from "express";

export class controller {
  static async sendNotFoundError(req: Request, res: Response) {
    RequestHandler.sendError(res, "Endpoint not found", 404);
  }
}
