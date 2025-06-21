import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;
