import React, { useState } from "react";
import axios from "axios";

const Reflection = () => {
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!text.trim()) {
            setMessage("Please write something before submitting.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // JWT must be set after login

            const res = await axios.post(
                "http://localhost:5000/api/reflections",
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("✅ Reflection submitted successfully!");
            setText("");
        } catch (err) {
            setMessage("❌ Failed to submit reflection. See console.");
            console.error(err);
        }
    };

    return (
        <div className="p-8 bg-pink-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center">Reflection</h1>
            <p className="text-center text-gray-700 mt-2">
                Share how you’re feeling today and track your emotional patterns.
            </p>
            <div className="max-w-xl mx-auto mt-8">
        <textarea
            className="w-full h-40 p-4 rounded-md shadow resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Write about your feelings..."
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></textarea>
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
                >
                    Submit Reflection
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm text-purple-700 font-medium">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Reflection;
