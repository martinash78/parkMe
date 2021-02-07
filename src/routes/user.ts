import express from "express";
import { check } from "express-validator";
import auth from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import isAdminOrLoggedInUser from "../middleware/isAdminOrLoggedInUser";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post(
  "/",
  [],
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
  userController.createUser
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
router.get("/", [auth, isAdmin], userController.allUsers);
router.get("/:userId", [auth, isAdminOrLoggedInUser], userController.getUser);

export default router;
