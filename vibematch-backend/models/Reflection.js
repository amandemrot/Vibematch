import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        // Remove or comment this if it's breaking
        // user: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "User",
        // },
    },
    {
        timestamps: true,
    }
);

const Reflection = mongoose.model("Reflection", reflectionSchema);
export default Reflection;
