import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar"


import DropdownMenu from "./components/ui/DropdownMenu";

export default function App() {
    return (
        <Router>
            <div className="container">
                <header style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <h1 style={{ margin: 0 }}>Panel de Monitoreo</h1>
                        <p style={{ margin: 0, color: "#555" }}>Universidad — Monitoreo de ruido</p>
                    </div>

                    <nav>
                        <DropdownMenu />
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    
                </Routes>
            </div>
        </Router>
    );
}
