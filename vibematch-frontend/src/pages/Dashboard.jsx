import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SparkPoints from "../components/SparkPoints"; // ✅ Import SparkPoints

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("vibematchUser");
        if (!user) navigate("/");
    }, [navigate]);

    return (
        <div className="p-6">
            {/* Spark Points Display */}
            <div className="flex justify-end mb-4">
                <SparkPoints />
            </div>

            <h1 className="text-2xl font-bold text-purple-700 mb-4">
                Welcome to Your VibeMatch Journey
            </h1>
            <p className="text-gray-600">
                Use the sidebar to begin reflecting, growing, and tracking your emotions.
            </p>
        </div>
    );
};

export default Dashboard;
