import { sendError } from "../api/response";

export default function (req: any, res: any, next: any) {
  let userId = req.params.userId;
  if (req.user.isAdmin || req.user.id === userId) {
    next();
  } else {
    sendError(res, "Unauthorised", 401);
  }
}
