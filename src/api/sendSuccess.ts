import { Response } from "express";

export function sendSuccess(
  res: Response,
  response: object,
  statusCode: number
): void {
  res.status(statusCode).json(response).send().end();
}
