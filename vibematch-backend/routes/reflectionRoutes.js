import express from "express";
import { submitReflection } from "../controllers/reflectionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", submitReflection);

export default router;
