import { sendError } from "./sendError";
import { Response } from "express";

export function sendUnauthorised(res: Response): void {
  sendError(res, "User is not authorised", 400);
}
