import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// @desc    Register new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// @desc    Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

// ✅ FIXED THIS EXPORT
// @desc    Get current logged-in user
export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
