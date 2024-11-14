import { Response } from "express";
import { response } from "./response";

export function sendSuccess(res: Response, data: any): Response<response> {
  const response: response = {
    success: true,
    data: data,
    error: null,
  };

  return res.status(200).json(response);
}

export function sendError(
  res: Response,
  message: string = "Internal Server Error",
  statusCode: number = 500
): Response<response> {
  if (res.headersSent) {
    return res;
  }
  const response: response = {
    success: false,
    data: null,
    error: {
      message: message,
      code: statusCode,
    },
  };

  return res.status(statusCode).json(response);
}
