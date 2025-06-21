import express from "express";
import { createPattern, getPatterns } from "../controllers/patternController.js";

const router = express.Router();

// Public routes
router.route("/").post(createPattern).get(getPatterns);

export default router;
