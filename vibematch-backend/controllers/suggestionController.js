import Suggestion from "../models/Suggestion.js";
import mongoose from "mongoose";
import addPoints from "../utils/addPoints.js";

export const createSuggestion = async (req, res) => {
    try {
        const { text, user } = req.body;

        console.log("➡️ Incoming suggestion:", { text, user });

        if (!text || !user) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        const userId = new mongoose.Types.ObjectId(user);
        const newSuggestion = new Suggestion({ text, user: userId });
        await newSuggestion.save();

        await addPoints(userId, 10);
        console.log("✅ Suggestion saved:", newSuggestion);

        res.status(201).json({ message: "Suggestion saved", suggestion: newSuggestion });
    } catch (error) {
        console.error("❌ Suggestion error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const getSuggestions = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "User ID required" });

        const suggestions = await Suggestion.find({ user }).populate("user", "name");
        res.json(suggestions);
    } catch (error) {
        console.error("Get suggestions error:", error.message);
        res.status(500).json({ message: "Failed to fetch suggestions" });
    }
};
