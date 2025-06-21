import User from "../models/User.js";

// New controller to handle onboarding without password
export const createUser = async (req, res) => {
    try {
        const { name, age, intention } = req.body;

        if (!name || !age || !intention) {
            return res.status(400).json({ message: "All fields required" });
        }

        const newUser = new User({ name, age, intention });
        await newUser.save();

        res.status(201).json(newUser); // send _id back
    } catch (error) {
        console.error("Create user error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
