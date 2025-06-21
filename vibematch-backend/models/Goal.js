import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
