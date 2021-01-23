import { validationResult } from "express-validator";

export default function (req: any, res: any, next: any) {
  const errors = validationResult(req);
  console.log("how the fuck am I in here");
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
}
