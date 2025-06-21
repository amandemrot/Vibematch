import React, { useState, useEffect } from "react";
import axios from "axios";

const Goals = () => {
    const [goalText, setGoalText] = useState("");
    const [goals, setGoals] = useState([]);
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("vibematchUser"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!goalText || !user?._id) {
            setMessage("❌ Please fill all fields.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/goals", {
                text: goalText,
                user: user._id,
            });
            setMessage("✅ Goal saved successfully!");
            setGoalText("");
            fetchGoals();
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to save goal.");
        }
    };

    const fetchGoals = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/goals");
            setGoals(res.data);
        } catch (error) {
            console.error("Failed to load goals:", error);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                🎯 Your Goals
            </h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl"
            >
                <textarea
                    placeholder="Describe a goal you want to set..."
                    value={goalText}
                    onChange={(e) => setGoalText(e.target.value)}
                    className="w-full p-3 border rounded-lg h-32"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg"
                >
                    Save Goal
                </button>
                {message && <p className="mt-2 text-sm text-center">{message}</p>}
            </form>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">📂 Saved Goals</h3>
                {goals.length === 0 ? (
                    <p className="text-gray-500">No goals yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {goals.map((goal) => (
                            <li
                                key={goal._id}
                                className="bg-white p-4 rounded-lg shadow border"
                            >
                                {goal.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Goals;
