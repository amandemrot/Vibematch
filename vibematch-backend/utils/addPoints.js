import User from "../models/User.js";

const addPoints = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        user.points += amount;
        await user.save();

        console.log(`✨ Added ${amount} points to ${user.name}`);
    } catch (error) {
        console.error("Failed to add points:", error.message);
    }
};

export default addPoints;
