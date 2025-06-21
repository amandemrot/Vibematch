import Pattern from "../models/Pattern.js";
import mongoose from "mongoose";

export const createPattern = async (req, res) => {
    try {
        const { text, user } = req.body;

        // 🔹 Log incoming request body
        console.log("Incoming Pattern Request:", { text, user });

        if (!text || !user) {
            return res.status(400).json({ message: "Please fill all fields." });
        }

        const userId = new mongoose.Types.ObjectId(user);

        const newPattern = new Pattern({
            text,
            user: userId,
        });

        await newPattern.save();
        console.log("✅ Pattern saved to DB:", newPattern); // 🔹 Confirm save

        res.status(201).json({ message: "Pattern saved", pattern: newPattern });
    } catch (error) {
        console.error("❌ Pattern error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPatterns = async (req, res) => {
    try {
        const patterns = await Pattern.find().populate("user", "name");
        res.json(patterns);
    } catch (error) {
        console.error("❌ Get patterns error:", error.message);
        res.status(500).json({ error: "Failed to fetch patterns" });
    }
};
