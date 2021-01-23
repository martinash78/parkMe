import express from "express";
import auth from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import * as spaceController from "../controllers/spaceController";

const router = express.Router();

router.get("/", auth, spaceController.allSpaces);
router.post("/", [auth, isAdmin], spaceController.createSpace);
router.get("/available", auth, spaceController.availableSpaces);
router.put("/claim", auth, spaceController.claimSpace);
router.put("/offer", auth, spaceController.offerSpace);

export default router;
