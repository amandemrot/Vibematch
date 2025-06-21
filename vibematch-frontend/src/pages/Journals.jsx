import React, { useState } from "react";
import axios from "axios";

const Journals = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    // FIXED: Correct localStorage key
    const user = JSON.parse(localStorage.getItem("vibematchUser"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !user?.name) {
            setMessage("Please fill all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user", user.name);
        if (file) formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/api/journals", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res.data);
            setMessage("✅ Journal submitted successfully!");
            setTitle("");
            setContent("");
            setFile(null);
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to submit journal.");
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                📓 Your Journal
            </h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl"
            >
                <input
                    type="text"
                    placeholder="Journal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
                <textarea
                    placeholder="Write your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 border rounded-lg h-32"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg"
                >
                    Submit Journal
                </button>
                {message && <p className="mt-2 text-sm text-center">{message}</p>}
            </form>
        </div>
    );
};

export default Journals;
