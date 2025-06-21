import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: String, // 🔥 Changed from ObjectId to String
            required: true,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;
