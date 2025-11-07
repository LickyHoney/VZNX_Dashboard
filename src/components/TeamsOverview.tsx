// // import React from "react";

// // type TeamMember = {
// //   name: string;
// //   activeTasks: number;
// //   totalTasks: number;
// //   completedTasks: number;
// //   currentTasks?: string[];
// // };

// // const teamData: TeamMember[] = [
// //   {
// //     name: "Sarah Chen",
// //     activeTasks: 2,
// //     totalTasks: 5,
// //     completedTasks: 1,
// //     currentTasks: ["MEP Systems Design", "Environmental Impact Study"],
// //   },
// //   {
// //     name: "Michael Rodriguez",
// //     activeTasks: 0,
// //     totalTasks: 4,
// //     completedTasks: 3,
// //   },
// //   {
// //     name: "David Kim",
// //     activeTasks: 1,
// //     totalTasks: 6,
// //     completedTasks: 2,
// //   },
// //   {
// //     name: "Emily Johnson",
// //     activeTasks: 1,
// //     totalTasks: 4,
// //     completedTasks: 1,
// //   },
// // ];

// // export default function TeamOverview() {
// //   const getCapacityColor = (percent: number) => {
// //     if (percent <= 40) return "bg-gray-900";
// //     if (percent <= 75) return "bg-orange-400";
// //     return "bg-red-500";
// //   };

// //   return (
// //     <div className="p-8 bg-gray-50 min-h-screen">
// //       <h2 className="text-2xl font-bold mb-1 text-gray-900">Team Overview</h2>
// //       <p className="text-gray-500 mb-6">
// //         Monitor team workload and task distribution
// //       </p>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
// //         {teamData.map((member) => {
// //           const capacityPercent = Math.round(
// //             (member.activeTasks / member.totalTasks) * 100
// //           );

// //           return (
// //             <div
// //               key={member.name}
// //               className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
// //             >
// //               <div className="flex justify-between items-center mb-3">
// //                 <h3 className="text-lg font-semibold text-gray-900">
// //                   {member.name}
// //                 </h3>
// //                 <span className="flex items-center gap-1 text-sm font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
// //                   <span className="w-2 h-2 bg-green-600 rounded-full"></span>
// //                   Available
// //                 </span>
// //               </div>

// //               <p className="text-sm text-gray-700 mb-1">
// //                 <span className="font-medium text-gray-900">Active Tasks:</span>{" "}
// //                 {member.activeTasks}/{member.totalTasks}
// //               </p>

// //               {/* Capacity Bar */}
// //               <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-1">
// //                 <div
// //                   className={`h-2 rounded-full ${getCapacityColor(
// //                     capacityPercent
// //                   )}`}
// //                   style={{ width: `${capacityPercent}%` }}
// //                 ></div>
// //               </div>

// //               <p className="text-xs text-gray-500 mb-3">
// //                 Capacity: {capacityPercent}%
// //               </p>

// //               <div className="flex justify-between text-sm font-medium mb-3">
// //                 <span className="text-blue-600">
// //                   {member.activeTasks} Active
// //                 </span>
// //                 <span className="text-green-600">
// //                   {member.completedTasks} Completed
// //                 </span>
// //               </div>

// //               {member.currentTasks && (
// //                 <div>
// //                   <p className="text-sm text-gray-800 font-medium mb-1">
// //                     Current Tasks:
// //                   </p>
// //                   <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
// //                     {member.currentTasks.map((task, i) => (
// //                       <li key={i}>{task}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { loadProjects } from "../localStorageService";
// import { Project, Task } from "../types";
// import "bootstrap/dist/css/bootstrap.min.css";

// type TeamStats = {
//   name: string;
//   activeTasks: number;
//   completedTasks: number;
//   totalTasks: number;
// };

// export default function TeamOverview() {
//   const [teamStats, setTeamStats] = useState<TeamStats[]>([]);

//   useEffect(() => {
//     const projects = loadProjects();
//     const taskMap: Record<string, { active: number; completed: number }> = {};

//     // 🧩 Gather all tasks from all projects
//     projects.forEach((project: Project) => {
//       project.tasks?.forEach((task: Task) => {
//         if (task.assignee) {
//           if (!taskMap[task.assignee]) {
//             taskMap[task.assignee] = { active: 0, completed: 0 };
//           }
//           if (task.completed) {
//             taskMap[task.assignee].completed += 1;
//           } else {
//             taskMap[task.assignee].active += 1;
//           }
//         }
//       });
//     });

//     // 🧮 Convert map → array
//     const stats: TeamStats[] = Object.entries(taskMap).map(([name, data]) => ({
//       name,
//       activeTasks: data.active,
//       completedTasks: data.completed,
//       totalTasks: data.active + data.completed,
//     }));

//     setTeamStats(stats);
//   }, []);

//   const getCapacityColor = (percent: number) => {
//     if (percent <= 40) return "bg-dark";
//     if (percent <= 75) return "bg-warning";
//     return "bg-danger";
//   };

//   return (
//     <div className="container py-5 bg-light min-vh-100">
//       <h2 className="fw-bold mb-1 text-dark">Team Overview</h2>
//       <p className="text-muted mb-4">
//         Monitor team workload and task distribution
//       </p>

//       {teamStats.length === 0 ? (
//         <p className="text-muted">No team members have assigned tasks yet.</p>
//       ) : (
//         <div className="row g-4">
//           {teamStats.map((member) => {
//             const capacityPercent =
//               member.totalTasks > 0
//                 ? Math.round((member.activeTasks / member.totalTasks) * 100)
//                 : 0;

//             return (
//               <div key={member.name} className="col-12 col-md-6">
//                 <div className="card shadow-sm border-0 rounded-3">
//                   <div className="card-body">
//                     {/* Header */}
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <h5 className="card-title mb-0 fw-semibold text-dark">
//                         {member.name}
//                       </h5>
//                       <span className="badge bg-success-subtle text-success d-flex align-items-center gap-1 px-2 py-1 rounded-pill border border-success-subtle">
//                         <span
//                           className="rounded-circle bg-success"
//                           style={{ width: "8px", height: "8px" }}
//                         ></span>
//                         Available
//                       </span>
//                     </div>

//                     <p className="mb-1 text-secondary small">
//                       <strong className="text-dark">Active Tasks:</strong>{" "}
//                       {member.activeTasks}/{member.totalTasks}
//                     </p>

//                     {/* Capacity Bar */}
//                     <div className="progress mb-2" style={{ height: "6px" }}>
//                       <div
//                         className={`progress-bar ${getCapacityColor(
//                           capacityPercent
//                         )}`}
//                         style={{ width: `${capacityPercent}%` }}
//                       ></div>
//                     </div>

//                     <p className="text-muted small mb-3">
//                       Capacity: {capacityPercent}%
//                     </p>

//                     {/* Active / Completed */}
//                     <div className="d-flex justify-content-between mb-3">
//                       <span className="fw-semibold text-primary small">
//                         {member.activeTasks} Active
//                       </span>
//                       <span className="fw-semibold text-success small">
//                         {member.completedTasks} Completed
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { loadProjects } from "../localStorageService";
import { Project, Task } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";

type TeamStats = {
  name: string;
  activeTasks: number;
  completedTasks: number;
  totalTasks: number;
};

export default function TeamOverview() {
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);

  useEffect(() => {
    const projects = loadProjects();
    const taskMap: Record<string, { active: number; completed: number }> = {};

    // 🧩 Gather all tasks from all projects
    projects.forEach((project: Project) => {
      project.tasks?.forEach((task: Task) => {
        if (task.assignee) {
          if (!taskMap[task.assignee]) {
            taskMap[task.assignee] = { active: 0, completed: 0 };
          }
          if (task.completed) {
            taskMap[task.assignee].completed += 1;
          } else {
            taskMap[task.assignee].active += 1;
          }
        }
      });
    });

    // 🧮 Convert map → array
    const stats: TeamStats[] = Object.entries(taskMap).map(([name, data]) => ({
      name,
      activeTasks: data.active,
      completedTasks: data.completed,
      totalTasks: data.active + data.completed,
    }));

    setTeamStats(stats);
  }, []);

  // 🎨 Dynamic color logic based on workload
  const getWorkloadColor = (percent: number) => {
    if (percent >= 75) return "danger"; // 🔴 High workload
    if (percent >= 40) return "warning"; // 🟠 Medium workload
    return "success"; // 🟢 Low workload or mostly completed
  };

  return (
    <div className="container py-5 bg-light min-vh-100">
      <h2 className="fw-bold mb-1 text-dark">Team Overview</h2>
      <p className="text-muted mb-4">
        Monitor team workload and task distribution
      </p>

      {teamStats.length === 0 ? (
        <p className="text-muted">No team members have assigned tasks yet.</p>
      ) : (
        <div className="row g-4">
          {teamStats.map((member) => {
            const capacityPercent =
              member.totalTasks > 0
                ? Math.round((member.activeTasks / member.totalTasks) * 100)
                : 0;

            const color = getWorkloadColor(capacityPercent);

            return (
              <div key={member.name} className="col-12 col-md-6">
                <div
                  className={`card border-${color} border-2 shadow-sm rounded-3`}
                >
                  <div className="card-body">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title mb-0 fw-semibold text-dark">
                        {member.name}
                      </h5>
                      <span
                        className={`badge bg-${color}-subtle text-${color} d-flex align-items-center gap-1 px-2 py-1 rounded-pill border border-${color}-subtle`}
                      >
                        <span
                          className={`rounded-circle bg-${color}`}
                          style={{ width: "8px", height: "8px" }}
                        ></span>
                        {capacityPercent === 0
                          ? "All Tasks Completed"
                          : color === "danger"
                          ? "Overloaded"
                          : color === "warning"
                          ? "Busy"
                          : "Available"}
                      </span>
                    </div>

                    <p className="mb-1 text-secondary small">
                      <strong className="text-dark">Active Tasks:</strong>{" "}
                      {member.activeTasks}/{member.totalTasks}
                    </p>

                    {/* Capacity Bar */}
                    <div className="progress mb-2" style={{ height: "6px" }}>
                      <div
                        className={`progress-bar bg-${color}`}
                        style={{ width: `${capacityPercent}%` }}
                      ></div>
                    </div>

                    <p className="text-muted small mb-3">
                      Capacity: {capacityPercent}%
                    </p>

                    {/* Active / Completed */}
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold text-primary small">
                        {member.activeTasks} Active
                      </span>
                      <span className="fw-semibold text-success small">
                        {member.completedTasks} Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
