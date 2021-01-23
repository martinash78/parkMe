import { sendError } from "../api/response";

export default function (req: any, res: any, next: any) {
  if (!req.user.isAdmin) {
    sendError(res, "Unauthorised", 401);
  }
  next();
}
