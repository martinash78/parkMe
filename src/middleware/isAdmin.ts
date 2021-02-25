import { sendError } from "../api/sendError";

export default function (req: any, res: any, next: any) {
  if (!req.user.isAdmin) {
    sendError(res, "Unauthorised", 401);
  }
  next();
}
