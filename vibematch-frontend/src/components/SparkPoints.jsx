import React, { useEffect, useState } from "react";
import axios from "axios";

const SparkPoints = () => {
    const [points, setPoints] = useState(null);
    const user = JSON.parse(localStorage.getItem("vibematchUser"));

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${user._id}`);
                setPoints(res.data.points);
            } catch (error) {
                console.error("Failed to fetch points:", error);
            }
        };

        if (user?._id) fetchPoints();
    }, [user]);

    return (
        <div className="text-sm font-semibold text-purple-700 bg-purple-100 px-4 py-2 rounded-xl shadow inline-block">
            Spark Points: {points !== null ? points : "—"} ✨
        </div>
    );
};

export default SparkPoints;
