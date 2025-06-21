import mongoose from "mongoose";

const patternSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Pattern = mongoose.model("Pattern", patternSchema);
export default Pattern;
