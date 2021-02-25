import { Response } from "express";
import { ErrorResponse } from "../interface/ErrorResponse";

export function sendError(
  res: Response,
  response: string,
  statusCode: number
): void {
  let errorResponse: ErrorResponse = {
    code: statusCode,
    error: response,
  };
  res.status(statusCode).json(errorResponse).send().end();
}
