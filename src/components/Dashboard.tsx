// // import { useEffect, useState } from "react";
// // import { loadProjects } from "../localStorageService";
// // import { Project } from "../types";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Legend,
// //   CartesianGrid,
// // } from "recharts";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // export default function Dashboard() {
// //   const [projects, setProjects] = useState<Project[]>([]);
// //   const [activeProjects, setActiveProjects] = useState(0);
// //   const [completedTasks, setCompletedTasks] = useState(0);
// //   const [totalTasks, setTotalTasks] = useState(0);
// //   const [avgProgress, setAvgProgress] = useState(0);
  

// //   useEffect(() => {
// //     const all = loadProjects();
// //     setProjects(all);

// //     // Active projects (not completed)
// //     const active = all.filter((p) => p.status !== "Completed");
// //     setActiveProjects(active.length);

// //     // Task stats
// //     const allTasks = all.flatMap((p) => p.tasks);
// //     const completed = allTasks.filter((t) => t.completed).length;
// //     setCompletedTasks(completed);
// //     setTotalTasks(allTasks.length);

// //     // Avg progress
// //     const totalProgress = all.reduce((acc, p) => acc + (p.progress || 0), 0);
// //     setAvgProgress(all.length > 0 ? Math.round(totalProgress / all.length) : 0);

// //     // // Recent Activity (sort by update or recent completion)
// //     // const activity = all
// //     //   .flatMap((p) =>
// //     //     p.tasks
// //     //       .filter((t) => t.completed)
// //     //       .map(
// //     //         (t) => `✅ ${t.title} completed in "${p.title}" by ${t.assignee}`
// //     //       )
// //     //   )
// //     //   .slice(-5)
// //     //   .reverse();
// //     // setRecentActivity(activity);
// //   }, []);

// //   // Project status distribution (pie)
// //   const statusData = [
// //     {
// //       name: "Completed",
// //       value: projects.filter((p) => p.status === "Completed").length,
// //     },
// //     {
// //       name: "In Progress",
// //       value: projects.filter((p) => p.status === "In Progress").length,
// //     },
// //     {
// //       name: "Not Started",
// //       value: projects.filter((p) => p.status === "On Hold").length,
// //     },
// //   ];

// //   const COLORS = ["#00C49F", "#0088FE", "#FFBB28"];

// //   // Team performance (bar chart)
// //   const teamPerformance = Object.values(
// //     projects.reduce((acc: Record<string, { name: string; Completed: number; InProgress: number }>, p) => {
// //       p.tasks.forEach((t) => {
// //         const assignee = t.assignee ?? "Unassigned";
// //         if (!acc[assignee]) {
// //           acc[assignee] = { name: assignee, Completed: 0, InProgress: 0 };
// //         }
// //         if (t.completed) acc[assignee].Completed += 1;
// //         else acc[assignee].InProgress += 1;
// //       });
// //       return acc;
// //     }, {} as Record<string, { name: string; Completed: number; InProgress: number }>)
// //   );

// //   const taskCompletionPercent =
// //     totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

// //   return (
// //     <div className="container-fluid p-4">
// //       {/* <h2 className="fw-bold text-primary mb-2">Dashboard</h2>
// //       <p className="text-muted mb-4">
// //         Welcome back! Here's your workspace overview.
// //       </p> */}
// //       <div className="dashboard-header mb-4 shadow-sm">
// //         <div>
// //           <h2 className="fw-bold mb-1 text-black">Dashboard</h2>
// //           <small className="text-dark">
// //             Welcome back! Here's your workspace overview.
// //           </small>
// //         </div>
// //         </div>

// //       {/* Cards Row */}
// //       {/* Cards Row */}
// // <div className="row g-4 mb-4">
// //   {/* Active Projects */}
// //   <div className="col-12 col-md-6 col-lg-3 d-flex">
// //     <div className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "160px" }}>
// //       <div className="mb-2">
// //         <i
// //           className="bi bi-folder2-open fs-3"
// //           style={{ color: "#8B5CF6" }}
// //         ></i>
// //       </div>
// //       <h6 className="fw-semibold text-secondary">Active Projects</h6>
// //       <h3 className="fw-bold mb-0">{activeProjects}</h3>
// //     </div>
// //   </div>

// //   {/* Tasks Completed */}
// //   <div className="col-12 col-md-6 col-lg-3 d-flex">
// //     <div className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "160px" }}>
// //       <div className="mb-2">
// //         <i
// //           className="bi bi-check2-circle fs-3"
// //           style={{ color: "#10B981" }}
// //         ></i>
// //       </div>
// //       <h6 className="fw-semibold text-secondary">Tasks Completed</h6>
// //       <h3 className="fw-bold mb-1">{completedTasks}</h3>
// //       <div className="progress w-100 mt-2" style={{ height: "8px" }}>
// //         <div
// //           className="progress-bar"
// //           style={{ width: `${taskCompletionPercent}%`, backgroundColor: "#10B981" }}
// //         ></div>
// //       </div>
// //       <small className="text-muted">{taskCompletionPercent}% completed</small>
// //     </div>
// //   </div>
// // </div>


// //       {/* Charts */}
// //       <div className="row g-4 mb-4">
// //         {/* Project Status Distribution */}
// //         <div className="col-12 col-lg-6">
// //           <div className="card shadow-lg border-0 p-3 text-center">
// //             <h6 className="fw-bold mb-3">Project Status Distribution</h6>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <PieChart>
// //                 <Pie
// //                   data={statusData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={100}
// //                   fill="#8884d8"
// //                   label
// //                 >
// //                   {statusData.map((entry, index) => (
// //                     <Cell
// //                       key={`cell-${index}`}
// //                       fill={COLORS[index % COLORS.length]}
// //                     />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Team Performance */}
// //         <div className="col-12 col-lg-6">
// //           <div className="card shadow-lg border-0 p-3 text-center">
// //             <h6 className="fw-bold mb-3">Team Performance</h6>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={teamPerformance}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="Completed" fill="#00C49F" />
// //                 <Bar dataKey="InProgress" fill="#0088FE" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>

      
// //       {/* <div className="card shadow-sm border-0 p-3">
// //         <h6 className="fw-bold mb-3">Recent Activity</h6>
// //         {recentActivity.length > 0 ? (
// //           <ul className="list-unstyled mb-0">
// //             {recentActivity.map((a, i) => (
// //               <li key={i} className="mb-2">
// //                 <i className="bi bi-clock-history text-primary me-2"></i>
// //                 <span>{a}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p className="text-muted mb-0">No recent activity yet.</p>
// //         )}
// //       </div> */}
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ add this
// import { loadProjects } from "../localStorageService";
// import { Project } from "../types";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Legend,
//   CartesianGrid,
// } from "recharts";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function Dashboard() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [activeProjects, setActiveProjects] = useState(0);
//   const [completedTasks, setCompletedTasks] = useState(0);
//   const [totalTasks, setTotalTasks] = useState(0);
//   const [avgProgress, setAvgProgress] = useState(0);

//   const navigate = useNavigate(); // ✅ create navigation hook

//   useEffect(() => {
//     const all = loadProjects();
//     setProjects(all);

//     const active = all.filter((p) => p.status !== "Completed");
//     setActiveProjects(active.length);

//     const allTasks = all.flatMap((p) => p.tasks);
//     const completed = allTasks.filter((t) => t.completed).length;
//     setCompletedTasks(completed);
//     setTotalTasks(allTasks.length);

//     const totalProgress = all.reduce((acc, p) => acc + (p.progress || 0), 0);
//     setAvgProgress(all.length > 0 ? Math.round(totalProgress / all.length) : 0);
//   }, []);

//   const statusData = [
//     {
//       name: "Completed",
//       value: projects.filter((p) => p.status === "Completed").length,
//     },
//     {
//       name: "In Progress",
//       value: projects.filter((p) => p.status === "In Progress").length,
//     },
//     {
//       name: "Not Started",
//       value: projects.filter((p) => p.status === "On Hold").length,
//     },
//   ];

//   const COLORS = ["#00C49F", "#0088FE", "#FFBB28"];

//   const teamPerformance = Object.values(
//     projects.reduce((acc, p) => {
//       p.tasks.forEach((t) => {
//         const assignee = t.assignee ?? "Unassigned";
//         if (!acc[assignee]) {
//           acc[assignee] = { name: assignee, Completed: 0, InProgress: 0 };
//         }
//         if (t.completed) acc[assignee].Completed += 1;
//         else acc[assignee].InProgress += 1;
//       });
//       return acc;
//     }, {} as Record<string, { name: string; Completed: number; InProgress: number }>)
//   );

//   const taskCompletionPercent =
//     totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//   return (
//     <div className="container-fluid p-4">
//       <div className="dashboard-header mb-4 shadow-sm">
//         <div>
//           <h2 className="fw-bold mb-1 text-black">Dashboard</h2>
//           <small className="text-dark">
//             Welcome back! Here's your workspace overview.
//           </small>
//         </div>
//       </div>

//       {/* Cards Row */}
//       <div className="row g-4 mb-4">
//         {/* Active Projects */}
//         <div className="col-12 col-md-6 col-lg-3 d-flex">
//           <div
//             className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center"
//             style={{ minHeight: "160px", cursor: "pointer" }}
//             onClick={() => navigate("/projects?filter=active")} // ✅ navigate with query
//           >
//             <div className="mb-2">
//               <i className="bi bi-folder2-open fs-3" style={{ color: "#8B5CF6" }}></i>
//             </div>
//             <h6 className="fw-semibold text-secondary">Active Projects</h6>
//             <h3 className="fw-bold mb-0">{activeProjects}</h3>
//           </div>
//         </div>

//         {/* Tasks Completed */}
//         <div className="col-12 col-md-6 col-lg-3 d-flex">
//           <div className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "160px" }}>
//             <div className="mb-2">
//               <i className="bi bi-check2-circle fs-3" style={{ color: "#10B981" }}></i>
//             </div>
//             <h6 className="fw-semibold text-secondary">Tasks Completed</h6>
//             <h3 className="fw-bold mb-1">{completedTasks}</h3>
//             <div className="progress w-100 mt-2" style={{ height: "8px" }}>
//               <div
//                 className="progress-bar"
//                 style={{
//                   width: `${taskCompletionPercent}%`,
//                   backgroundColor: "#10B981",
//                 }}
//               ></div>
//             </div>
//             <small className="text-muted">{taskCompletionPercent}% completed</small>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="row g-4 mb-4">
//         {/* Project Status Distribution */}
//         <div className="col-12 col-lg-6">
//           <div className="card shadow-lg border-0 p-3 text-center">
//             <h6 className="fw-bold mb-3">Project Status Distribution</h6>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={statusData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   label
//                 >
//                   {statusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Team Performance */}
//         <div className="col-12 col-lg-6">
//           <div className="card shadow-lg border-0 p-3 text-center">
//             <h6 className="fw-bold mb-3">Team Performance</h6>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={teamPerformance}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Completed" fill="#00C49F" />
//                 <Bar dataKey="InProgress" fill="#0088FE" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { loadProjects } from "../localStorageService";
import { Project } from "../types";
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

  useEffect(() => {
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
  }, []);

  const statusData = [
    {
      name: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
    },
    {
      name: "In Progress",
      value: projects.filter((p) => p.status === "In Progress").length,
    },
    {
      name: "Not Started",
      value: projects.filter((p) => p.status === "On Hold").length,
    },
  ];

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28"];

  const teamPerformance = Object.values(
    projects.reduce(
      (
        acc: Record<
          string,
          { name: string; Completed: number; InProgress: number }
        >,
        p
      ) => {
        p.tasks.forEach((t) => {
          const assignee = t.assignee ?? "Unassigned";
          if (!acc[assignee]) {
            acc[assignee] = { name: assignee, Completed: 0, InProgress: 0 };
          }
          if (t.completed) acc[assignee].Completed += 1;
          else acc[assignee].InProgress += 1;
        });
        return acc;
      },
      {}
    )
  );

  const taskCompletionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container-fluid p-4">
      <div className="dashboard-header mb-4 shadow-sm">
        <div>
          <h2 className="fw-bold mb-1 text-black">Dashboard</h2>
          <small className="text-dark">
            Welcome back! Here's your workspace overview.
          </small>
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
          <div className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "160px" }}>
            <div className="mb-2">
              <i
                className="bi bi-folder2-open fs-3"
                style={{ color: "#8B5CF6" }}
              ></i>
            </div>
            <h6 className="fw-semibold text-secondary">Active Projects</h6>
            <h3 className="fw-bold mb-0">{activeProjects}</h3>
          </div>
        </div>

        {/* Tasks Completed */}
        <div className="col-12 col-md-6 col-lg-3 d-flex">
          <div className="card shadow-lg border-0 p-3 text-center flex-fill d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "160px" }}>
            <div className="mb-2">
              <i
                className="bi bi-check2-circle fs-3"
                style={{ color: "#10B981" }}
              ></i>
            </div>
            <h6 className="fw-semibold text-secondary">Tasks Completed</h6>
            <h3 className="fw-bold mb-1">{completedTasks}</h3>
            <div className="progress w-100 mt-2" style={{ height: "8px" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${taskCompletionPercent}%`,
                  backgroundColor: "#10B981",
                }}
              ></div>
            </div>
            <small className="text-muted">
              {taskCompletionPercent}% completed
            </small>
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
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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
