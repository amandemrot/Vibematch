import express from "express";
import { createSuggestion, getSuggestions } from "../controllers/suggestionController.js";

const router = express.Router();

router.route("/").post(createSuggestion).get(getSuggestions);

export default router;
