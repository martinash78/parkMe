import express from "express";
import { check } from "express-validator";
import auth from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import validate from "../middleware/validate";
import { SpaceController } from "../controllers/spaceController";

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
  SpaceController.createSpace
);
router.get("/", auth, SpaceController.allSpaces);
router.get("/available", auth, SpaceController.availableSpaces);
router.put("/claim", auth, SpaceController.claimSpace);
router.put("/offer", auth, SpaceController.offerSpace);

export default router;
