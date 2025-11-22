import { useEffect, useState } from "react";
import { loadProjects, seedIfEmpty } from "../localStorageService";
import { Project } from "../types";
import { SAMPLE } from "./Sample";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [avgProgress, setAvgProgress] = useState(0);
  const navigate = useNavigate();

  // Refresh dashboard stats
  const refreshDashboard = () => {
  
    const all = loadProjects();
    setProjects(all);

    const active = all.filter((p) => p.status !== "Completed");
    setActiveProjects(active.length);

    const allTasks = all.flatMap((p) => p.tasks);
    const completed = allTasks.filter((t) => t.completed).length;
    setCompletedTasks(completed);
    setTotalTasks(allTasks.length);

    const totalProgress = all.reduce((acc, p) => acc + (p.progress || 0), 0);
    setAvgProgress(all.length > 0 ? Math.round(totalProgress / all.length) : 0);
  };

  useEffect(() => {
    //  const all = loadProjects();
        
    //     setProjects(all);
    // Initial load
    seedIfEmpty(SAMPLE);
    refreshDashboard();

    // Listen for project updates from Projects component
    const handleProjectsUpdate = () => refreshDashboard();
    window.addEventListener("projectsUpdated", handleProjectsUpdate);

    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdate);
    };
  }, []);

  // Pie chart data
  const statusData = [
    { name: "Completed", value: projects.filter((p) => p.status === "Completed").length },
    { name: "In Progress", value: projects.filter((p) => p.status === "In Progress").length },
    { name: "On Hold", value: projects.filter((p) => p.status === "On Hold").length },
  ];

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28"];

  // Bar chart data (team performance)
  const teamPerformance = Object.values(
    projects.reduce(
      (acc: Record<string, { name: string; Completed: number; InProgress: number }>, p) => {
        p.tasks.forEach((t) => {
          const assignee = t.assignee ?? "Unassigned";
          if (!acc[assignee]) acc[assignee] = { name: assignee, Completed: 0, InProgress: 0 };
          if (t.completed) acc[assignee].Completed += 1;
          else acc[assignee].InProgress += 1;
        });
        return acc;
      },
      {}
    )
  );

  const taskCompletionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container-fluid p-4">
      <div className="dashboard-header mb-4 shadow-sm">
        <div>
          <h2 className="fw-bold mb-1 text-black">Dashboard</h2>
          <small className="text-dark">Welcome back! Here's your workspace overview.</small>
        </div>
      </div>

      {/* Cards Row */}
      <div className="row g-4 mb-4">
        {/* Active Projects */}
        <div
          className="col-12 col-md-6 col-lg-3 d-flex"
          onClick={() => navigate("/projects?filter=active")}
          style={{ cursor: "pointer" }}
        >
          <div
            className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "160px" }}
          >
            <div className="mb-2">
              <i className="bi bi-folder2-open fs-3" style={{ color: "#8B5CF6" }}></i>
            </div>
            <h6 className="fw-semibold text-secondary">Active Projects</h6>
            <h3 className="fw-bold mb-0">{activeProjects}</h3>
          </div>
        </div>

        {/* Tasks Completed */}
        <div className="col-12 col-md-6 col-lg-3 d-flex">
          <div
            className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "160px" }}
          >
            <div className="mb-2">
              <i className="bi bi-check2-circle fs-3" style={{ color: "#10B981" }}></i>
            </div>
            <h6 className="fw-semibold text-secondary">Tasks Completed</h6>
            <h3 className="fw-bold mb-1">
              {completedTasks}/{totalTasks}
            </h3>
            <div className="progress w-100 mt-2" style={{ height: "8px" }}>
              <div
                className="progress-bar"
                style={{ width: `${taskCompletionPercent}%`, backgroundColor: "#10B981" }}
              ></div>
            </div>
            <small className="text-muted">{taskCompletionPercent}% completed</small>
          </div>
        </div>

        {/* Average Progress */}
        <div className="col-12 col-md-6 col-lg-3 d-flex">
          <div
            className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "160px" }}
          >
            <div className="mb-2">
              <i className="bi bi-speedometer2 fs-3" style={{ color: "#F59E0B" }}></i>
            </div>
            <h6 className="fw-semibold text-secondary">Average Progress</h6>
            <h3 className="fw-bold mb-1">{avgProgress}%</h3>
            <div className="progress w-100 mt-2" style={{ height: "8px" }}>
              <div
                className="progress-bar"
                style={{ width: `${avgProgress}%`, backgroundColor: "#F59E0B" }}
              ></div>
            </div>
            <small className="text-muted">{avgProgress}% average</small>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4 mb-4">
        {/* Project Status Distribution */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-lg border-0 p-3 text-center">
            <h6 className="fw-bold mb-3">Project Status Distribution</h6>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {statusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-lg border-0 p-3 text-center">
            <h6 className="fw-bold mb-3">Team Performance</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Completed" fill="#00C49F" />
                <Bar dataKey="InProgress" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
