import express from "express";
import { check } from "express-validator/check";
import auth from "../middleware/auth";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post(
  "/signup",
  [
    check("forename", "Please Enter a Forename").not().isEmpty(),
    check("surname", "Please Enter a Surname").not().isEmpty(),
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
    check("department", "Please Enter a Department").not().isEmpty(),
  ],
  userController.signUp
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  userController.login
);

router.get("/me", auth, userController.me);
router.get("/", auth, userController.allUsers);
router.get("/users/:userId", auth, userController.getUser);
router.post("/", auth, userController.createUser);

export default router;
