import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./components/ProjectDetails"
import ProjectDashboard from "./components/ProjectDashboard";
import TeamOverview from "./components/TeamsOverview";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar always visible */}
        <Sidebar />

        {/* Main area switches pages */}
        <div className="flex-grow-1 bg-light">
          <Routes>
            <Route path="/" element={<ProjectDashboard />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/team-overview" element={<TeamOverview />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
