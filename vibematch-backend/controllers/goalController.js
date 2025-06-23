import Goal from "../models/Goal.js";
import mongoose from "mongoose";

export const createGoal = async (req, res) => {
    try {
        const { text, user } = req.body;

        console.log("➡️ Incoming goal data:", { text, user });

        if (!text || !user) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        const userId = new mongoose.Types.ObjectId(user);
        const newGoal = new Goal({ text, user: userId });
        await newGoal.save();

        console.log("✅ Goal saved:", newGoal);

        res.status(201).json({ message: "Goal saved", goal: newGoal });
    } catch (error) {
        console.error("❌ Goal error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const getGoals = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "User ID required" });

        const goals = await Goal.find({ user }).populate("user", "name");
        res.json(goals);
    } catch (error) {
        console.error("Get goals error:", error.message);
        res.status(500).json({ message: "Failed to fetch goals" });
    }
};
