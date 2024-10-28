import { Response } from "express";

// TOD: Agregar un tipo de dato para el error y los datos.
class RequestHandler {
  static sendSuccess(res: Response, data: any) {
    res.status(200).json({
      success: true,
      data: data,
      error: null,
    });
  }

  static sendError(
    res: Response,
    message: String = "Internal Server Error",
    statusCode: number = 500
  ) {
    res.status(statusCode).json({
      success: false,
      data: null,
      error: {
        message: message,
        code: statusCode,
      },
    });
  }
}

export default RequestHandler;
