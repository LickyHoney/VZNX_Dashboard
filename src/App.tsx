// import React, { useEffect, useState } from "react";
// import { Project } from "./types";
// import { loadProjects, saveProjects, seedIfEmpty } from "./localStorageService";
// import ProjectCard from "./components/ProjectCard";
// import ProjectModal from "./components/ProjectModal";
// import { uid } from "./utils";

// const SAMPLE: Project[] = [
//   {
//     id: uid(),
//     title: "Eco-Friendly Residential Complex",
//     progress: 75,
//     startDate: "2023-01-15",
//     endDate: "2024-06-30",
//     status: "In Progress",
//     description: ""
//   },
//   {
//     id: uid(),
//     title: "Urban Revitalization Project",
//     progress: 40,
//     startDate: "2023-03-01",
//     endDate: "2024-12-31",
//     status: "In Progress",
//   },
//   {
//     id: uid(),
//     title: "Sustainable Office Tower",
//     progress: 100,
//     startDate: "2022-09-01",
//     endDate: "2023-11-15",
//     status: "Completed",
//   },
//   {
//     id: uid(),
//     title: "Historic Building Restoration",
//     progress: 90,
//     startDate: "2023-05-20",
//     endDate: "2024-03-10",
//     status: "In Progress",
//   },
//   {
//     id: uid(),
//     title: "Community Cultural Center",
//     progress: 100,
//     startDate: "2023-02-10",
//     endDate: "2023-09-01",
//     status: "Completed",
//   },
//   {
//     id: uid(),
//     title: "Modular Housing Development",
//     progress: 60,
//     startDate: "2023-07-01",
//     endDate: "2024-08-01",
//     status: "In Progress",
//   }
// ];

// export default function App() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProject, setEditProject] = useState<Project | null>(null);

//   useEffect(() => {
//     seedIfEmpty(SAMPLE);
//     setProjects(loadProjects());
//   }, []);

//   function persist(next: Project[]) {
//     setProjects(next);
//     saveProjects(next);
//   }

//   function handleAdd() {
//     setEditProject(null);
//     setShowModal(true);
//   }

//   function handleSave(p: Project) {
//     const exists = projects.find((x) => x.id === p.id);
//     let next: Project[];
//     if (exists) {
//       next = projects.map((x) => (x.id === p.id ? p : x));
//     } else {
//       next = [p, ...projects];
//     }
//     persist(next);
//     setShowModal(false);
//   }

//   function handleDelete(id: string) {
//     if (!confirm("Delete this project?")) return;
//     const next = projects.filter((p) => p.id !== id);
//     persist(next);
//   }

//   function handleEdit(p: Project) {
//     setEditProject(p);
//     setShowModal(true);
//   }

//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div className="sidebar p-3 bg-white">
//         {/* <div className="d-flex align-items-center mb-4">
//           <div className="rounded-circle bg-primary" style={{ width: 36, height: 36 }} />
//           <h6 className="ms-2 mb-0">Archispace</h6> */}
//         {/* </div> */}
//         <div className="d-flex align-items-center mb-4 border-bottom pb-3">
//   <i className="bi bi-buildings-fill text-primary fs-3 me-2"></i>
//   <h5 className="fw-bold mb-0">VZNX Workspace</h5>
// </div>

//         <div className="list-group">
//           <button className="list-group-item list-group-item-action active">Projects</button>
//           <button className="list-group-item list-group-item-action">Team Overview</button>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="flex-grow-1">
//         <div className="app-header px-4">
//           <div>
//             <h4 className="mb-0">Project Dashboard</h4>
//             <small className="text-muted">Manage all your architecture projects efficiently.</small>
//           </div>
//           <div>
//             <button className="btn btn-primary" onClick={handleAdd}>+ Add New Project</button>
//           </div>
//         </div>

//         <div className="container-fluid p-4">
//           <div className="row g-4">
//             {projects.map((p) => (
//               <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
//                 <ProjectCard project={p} onEdit={handleEdit} onDelete={handleDelete} />
//               </div>
//             ))}
//           </div>

//           {projects.length === 0 && (
//             <div className="text-center text-muted mt-5">No projects yet. Click "Add New Project" to create one.</div>
//           )}
//         </div>
//       </div>

//       <ProjectModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         onSave={handleSave}
//         projectToEdit={editProject ?? undefined}
//       />
//     </div>
//   );
// }
// src/App.tsx
import React from "react";
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
