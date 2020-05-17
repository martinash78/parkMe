import jwt from "jsonwebtoken";
import { sendError } from "../helpers/response";

export default function (req: any, res: any, next: any) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) return sendError(res, "Authentication Error", 401);
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  try {
    const decoded: any = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    sendError(res, "Invalid Token", 401);
  }
}
