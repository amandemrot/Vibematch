import React, { useEffect, useState } from "react";
import axios from "axios";

const Quests = () => {
    const [quests, setQuests] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch quests on load
    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/quests");
                setQuests(res.data);
            } catch (err) {
                console.error("Failed to load quests:", err);
            }
        };
        fetchQuests();
    }, []);

    const handleComplete = async (id) => {
        try {
            await axios.post("http://localhost:5000/api/quests/complete", { id });
            setQuests((prev) =>
                prev.map((q) => (q._id === id ? { ...q, completed: true } : q))
            );
            setMessage("Quest marked as completed ✅");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error("Failed to complete quest:", err);
            setMessage("❌ Failed to complete quest");
        }
    };

    return (
        <div className="p-8 bg-pink-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-4 text-purple-700">🎯 Your Quests</h2>

            {message && <p className="text-center text-sm mb-4 text-green-600">{message}</p>}

            <div className="space-y-4">
                {quests.length === 0 ? (
                    <p className="text-gray-500">No quests available.</p>
                ) : (
                    quests.map((quest) => (
                        <div
                            key={quest._id}
                            className={`p-4 rounded-xl border shadow ${
                                quest.completed ? "bg-green-100 border-green-400" : "bg-white"
                            }`}
                        >
                            <h3 className="text-lg font-semibold">{quest.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                            {!quest.completed ? (
                                <button
                                    onClick={() => handleComplete(quest._id)}
                                    className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                                >
                                    Mark Complete
                                </button>
                            ) : (
                                <span className="text-green-700 font-semibold">Completed</span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Quests;
