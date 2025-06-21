import Quest from "../models/Quest.js";

// @desc   Get all quests
// @route  GET /api/quests
export const getQuests = async (req, res) => {
    try {
        const quests = await Quest.find();
        res.status(200).json(quests);
    } catch (error) {
        console.error("❌ Error fetching quests:", error);
        res.status(500).json({ message: "Failed to fetch quests" });
    }
};

// @desc   Mark quest as completed
// @route  POST /api/quests/complete
export const completeQuest = async (req, res) => {
    const { id } = req.body;

    console.log("🟢 Incoming quest complete request:", req.body);

    if (!id) return res.status(400).json({ message: "Quest ID is required" });

    try {
        const quest = await Quest.findById(id);
        if (!quest) return res.status(404).json({ message: "Quest not found" });

        quest.completed = true;
        await quest.save();

        console.log("✅ Quest marked as complete:", quest.title);
        res.status(200).json({ message: "Quest marked complete", quest });
    } catch (error) {
        console.error("❌ Error completing quest:", error);
        res.status(500).json({ message: "Error updating quest" });
    }
};
