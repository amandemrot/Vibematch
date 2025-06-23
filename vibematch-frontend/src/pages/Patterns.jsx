import React, { useState, useEffect } from "react";
import axios from "axios";

const Patterns = () => {
    const [insight, setInsight] = useState("");
    const [patterns, setPatterns] = useState([]);
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("vibematchUser"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!insight || !user?._id) {
            setMessage("❌ Please fill all fields.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/patterns", {
                text: insight,         // ✅ Correct key to match backend
                user: user._id,
            });
            setMessage("✅ Pattern saved successfully!");
            setInsight("");
            fetchPatterns(); // Refresh list
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to save pattern.");
        }
    };

    const fetchPatterns = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/patterns?user=${user._id}`);
            setPatterns(res.data);
        } catch (error) {
            console.error("Failed to load patterns:", error);
        }
    };


    useEffect(() => {
        fetchPatterns();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                🧠 Your Patterns
            </h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl"
            >
                <textarea
                    placeholder="Write about any emotional or behavioral pattern you've noticed..."
                    value={insight}
                    onChange={(e) => setInsight(e.target.value)}
                    className="w-full p-3 border rounded-lg h-32"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg"
                >
                    Save Pattern
                </button>
                {message && <p className="mt-2 text-sm text-center">{message}</p>}
            </form>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">📂 Saved Patterns</h3>
                {patterns.length === 0 ? (
                    <p className="text-gray-500">No patterns yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {patterns.map((pattern) => (
                            <li
                                key={pattern._id}
                                className="bg-white p-4 rounded-lg shadow border"
                            >
                                {pattern.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Patterns;
