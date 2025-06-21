import express from "express";
import { createGoal, getGoals } from "../controllers/goalController.js";

const router = express.Router();

router.route("/").post(createGoal).get(getGoals);

export default router;
