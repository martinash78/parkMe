import express from "express";
import { check } from "express-validator";
import auth from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import validate from "../middleware/validate";
import * as spaceController from "../controllers/spaceController";

const router = express.Router();
router.post(
  "/",
  [auth, isAdmin, validate],
  [
    check("onLoan", "Please Enter an onLoan").not().isEmpty(),
    check("ownerId", "Please Enter a status").not().isEmpty(),
    check("loaneeId", "Please Enter a loaneeId").not().isEmpty(),
    check("ownerId", "Please Enter an ownerId").not().isEmpty(),
  ],
  spaceController.createSpace
);
router.get("/", auth, spaceController.allSpaces);
router.get("/available", auth, spaceController.availableSpaces);
router.put("/claim", auth, spaceController.claimSpace);
router.put("/offer", auth, spaceController.offerSpace);

export default router;
