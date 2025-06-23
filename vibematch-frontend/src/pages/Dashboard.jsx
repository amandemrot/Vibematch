// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SparkPoints from "../components/SparkPoints";
import { motion } from "framer-motion";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("vibematchUser");
        if (!user) navigate("/");
    }, [navigate]);

    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex justify-end mb-4">
                <SparkPoints />
            </div>

            <h1 className="text-4xl font-extrabold text-purple-700 mb-3 animate-pulse">
                ✨ Welcome to Your VibeMatch Journey
            </h1>
            <p className="text-gray-600 text-lg">
                Use the sidebar to reflect, grow, and connect on your emotional journey.
            </p>

            <motion.div
                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-100 via-pink-100 to-purple-50 shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <p className="text-md text-gray-700">
                    💌 Tip: Try the Journals section to capture your thoughts and
                    reflections.
                </p>
                <p className="mt-2 text-sm text-purple-500">Your journey matters.</p>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
