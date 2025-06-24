import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import reflectionRoutes from "./routes/reflectionRoutes.js";
import questRoutes from "./routes/questRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import patternRoutes from "./routes/patternRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js"; // ✅ Added for Suggestions
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reflections", reflectionRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/patterns", patternRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/suggestions", suggestionRoutes); // ✅ Suggestions route
app.use("/api/users", userRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running on port ${PORT}`)
);

