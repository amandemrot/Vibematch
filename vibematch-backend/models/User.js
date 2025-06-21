import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String },
    intention: { type: String },
    email: { type: String },
    password: { type: String },
    points: { type: Number, default: 0 }, // ✅ Spark Points
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
