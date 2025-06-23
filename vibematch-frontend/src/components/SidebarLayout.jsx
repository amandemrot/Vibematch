// src/components/SidebarLayout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarLayout = () => {
    const location = useLocation();
    const basePath = "/dashboard";

    const linkClass = (path) =>
        `block px-4 py-2 rounded-lg hover:bg-purple-100 transition ${
            location.pathname === path ? "bg-purple-200 font-bold" : ""
        }`;

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <motion.aside
                className="w-64 bg-purple-50 p-4 space-y-3 shadow-lg border-r border-purple-200"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-2xl font-extrabold text-purple-700 mb-6">
                    💟 VibeMatch
                </h1>
                <Link to={`${basePath}/reflection`} className={linkClass(`${basePath}/reflection`)}>✍️ Reflection</Link>
                <Link to={`${basePath}/quests`} className={linkClass(`${basePath}/quests`)}>🧠 Quests</Link>
                <Link to={`${basePath}/journals`} className={linkClass(`${basePath}/journals`)}>📓 Journals</Link>
                <Link to={`${basePath}/patterns`} className={linkClass(`${basePath}/patterns`)}>🔁 Patterns</Link>
                <Link to={`${basePath}/goals`} className={linkClass(`${basePath}/goals`)}>🎯 Goals</Link>
                <Link to={`${basePath}/suggestions`} className={linkClass(`${basePath}/suggestions`)}>💡 Suggestions</Link>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default SidebarLayout;
