import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

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
            <aside className="w-64 bg-purple-50 p-4 space-y-3 shadow-md">
                <h1 className="text-xl font-bold text-purple-700 mb-6">VibeMatch</h1>
                <Link to={`${basePath}/reflection`} className={linkClass(`${basePath}/reflection`)}>✍️ Reflection</Link>
                <Link to={`${basePath}/quests`} className={linkClass(`${basePath}/quests`)}>🧠 Quests</Link>
                <Link to={`${basePath}/journals`} className={linkClass(`${basePath}/journals`)}>📓 Journals</Link>
                <Link to={`${basePath}/patterns`} className={linkClass(`${basePath}/patterns`)}>🔁 Patterns</Link>
                <Link to={`${basePath}/goals`} className={linkClass(`${basePath}/goals`)}>🎯 Goals</Link>
                <Link to={`${basePath}/suggestions`} className={linkClass(`${basePath}/suggestions`)}>💡 Suggestions</Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default SidebarLayout;
