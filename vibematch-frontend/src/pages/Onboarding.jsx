import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
    const [formData, setFormData] = useState({ name: "", age: "", intention: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, age, intention } = formData;

        if (!name || !age || !intention) return;

        try {
            const response = await fetch("https://vibematch-1.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email: `${name.toLowerCase()}@vibematch.com`, // auto email
                    password: "vibematch123", // fixed password
                }),
            });

            const data = await response.json();
            console.log("Backend response:", data);

            if (response.ok && data._id) {
                const fullUser = {
                    _id: data._id,
                    name: data.name,
                    age,
                    intention,
                };
                localStorage.setItem("vibematchUser", JSON.stringify(fullUser));
                navigate("/dashboard");
            } else {
                alert(data.message || "Failed to register user.");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-purple-200 relative overflow-hidden">
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 text-6xl animate-pulse">💖</div>
                <div className="absolute bottom-10 right-10 text-6xl animate-ping">💕</div>
                <div className="absolute top-1/2 left-1/2 text-5xl transform -translate-x-1/2 -translate-y-1/2 animate-bounce">💘</div>
            </div>

            {/* Onboarding Form Card */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl w-full max-w-md z-10 space-y-5"
            >
                <h2 className="text-3xl font-bold text-center text-purple-700">Welcome to VibeMatch</h2>
                <p className="text-center text-gray-500 text-sm mb-4">
                    Begin your emotional journey with someone special 💌
                </p>

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Your Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <textarea
                    name="intention"
                    rows="3"
                    placeholder="Why are you on this journey?"
                    value={formData.intention}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-xl hover:from-pink-600 hover:to-purple-700 transition text-lg"
                >
                    Start My Journey 💫
                </button>
            </form>
        </div>
    );
};

export default Onboarding;
