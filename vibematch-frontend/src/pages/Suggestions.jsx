import React, { useState, useEffect } from "react";
import axios from "axios";

const Suggestions = () => {
    const [suggestionText, setSuggestionText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [message, setMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("vibematchUser"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!suggestionText || !user?._id) {
            setMessage("❌ Please fill all fields.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/suggestions", {
                text: suggestionText,
                user: user._id,
            });
            setMessage("✅ Suggestion saved successfully!");
            setSuggestionText("");
            fetchSuggestions();
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to save suggestion.");
        }
    };


    const fetchSuggestions = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/suggestions?user=${user._id}`);
            setSuggestions(res.data);
        } catch (error) {
            console.error("Failed to load suggestions:", error);
        }
    };



    useEffect(() => {
        fetchSuggestions();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                💡 Suggestions
            </h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl"
            >
                <textarea
                    placeholder="Write a suggestion for your emotional journey..."
                    value={suggestionText}
                    onChange={(e) => setSuggestionText(e.target.value)}
                    className="w-full p-3 border rounded-lg h-32"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg"
                >
                    Submit Suggestion
                </button>
                {message && <p className="mt-2 text-sm text-center">{message}</p>}
            </form>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">📂 Saved Suggestions</h3>
                {suggestions.length === 0 ? (
                    <p className="text-gray-500">No suggestions yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {suggestions.map((s) => (
                            <li
                                key={s._id}
                                className="bg-white p-4 rounded-lg shadow border"
                            >
                                {s.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Suggestions;
