
import Journal from "../models/Journal.js";

export const createJournal = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);

        const { title, content, user } = req.body;
        const image = req.file ? req.file.path : null;

        const journal = new Journal({ title, content, user, image });
        await journal.save();

        res.status(201).json({ message: "Journal saved", journal });
    } catch (error) {
        console.error("Journal error:", error.message);
        res.status(500).json({ error: "Failed to save journal" });
    }
};
