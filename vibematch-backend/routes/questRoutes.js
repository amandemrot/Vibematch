import express from "express";
import { getQuests, completeQuest } from "../controllers/questController.js";

const router = express.Router();

router.get("/", getQuests);
router.post("/complete", completeQuest);

export default router;
