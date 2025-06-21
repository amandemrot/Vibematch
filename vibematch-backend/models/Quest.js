import mongoose from "mongoose";

const questSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Quest = mongoose.model("Quest", questSchema);
export default Quest;
