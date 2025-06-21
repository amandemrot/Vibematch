import Reflection from "../models/Reflection.js";

// Submit Reflection (No Auth)
export const submitReflection = async (req, res) => {
    const { text } = req.body;

    console.log("🟢 Incoming Reflection Request:");
    console.log("Body received:", req.body); // ✅ LOGGING what frontend sent

    if (!text) {
        console.log("🔴 No text received in reflection.");
        return res.status(400).json({ message: "Reflection text is required" });
    }

    try {
        const newReflection = new Reflection({ text });
        await newReflection.save();

        console.log("✅ Reflection saved to DB:", text);
        res.status(201).json({ message: "Reflection saved successfully" });
    } catch (error) {
        console.error("❌ Error saving reflection:", error);
        res.status(500).json({ message: "Server error saving reflection" });
    }
};
