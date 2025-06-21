import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";

import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Reflection from "./pages/Reflection";
import Quests from "./pages/Quests";
import Journals from "./pages/Journals";
import Patterns from "./pages/Patterns";
import Goals from "./pages/Goals";
import Suggestions from "./pages/Suggestions";

const App = () => {
    return (
        <Routes>
            {/* Onboarding/Login Page */}
            <Route path="/" element={<Onboarding />} />

            {/* Dashboard Layout + Nested Pages */}
            <Route path="/dashboard" element={<SidebarLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="reflection" element={<Reflection />} />
                <Route path="quests" element={<Quests />} />
                <Route path="journals" element={<Journals />} />
                <Route path="patterns" element={<Patterns />} />
                <Route path="goals" element={<Goals />} />
                <Route path="suggestions" element={<Suggestions />} />
            </Route>
        </Routes>
    );
};

export default App;
