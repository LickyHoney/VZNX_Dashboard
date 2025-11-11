import { useEffect, useState } from "react";
import { Project, Task } from "../types";
import { loadProjects, saveProjects, seedIfEmpty } from "../localStorageService";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { uid } from "../utils";

const SAMPLE: Project[] = [
  {
    id: uid(),
    owner: "Emma",
    title: "Residential Complex",
    progress: 75,
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    status: "In Progress",
    description: "",
    tasks: [
      { id: uid(), title: "Site Survey", assignee: "Sarah", completed: true },
      { id: uid(), title: "Architectural Design", assignee: "Michael", completed: false },
      { id: uid(), title: "Structural Analysis", assignee: "David", completed: false },
    ],
  },
  {
    id: uid(),
    owner: "Jukka",
    title: "Urban Revitalization Project",
    progress: 40,
    startDate: "2023-03-01",
    endDate: "2024-12-31",
    status: "In Progress",
    tasks: [
      { id: uid(), title: "Site Demolition", assignee: "Srini", completed: true },
      { id: uid(), title: "Utility Planning", assignee: "Maria", completed: false },
      { id: uid(), title: "Landscape Design", assignee: "James", completed: false },
    ],
  },
  {
    id: uid(),
    owner: "Laura",
    title: "Sustainable Office Tower",
    progress: 100,
    startDate: "2022-09-01",
    endDate: "2023-11-15",
    status: "Completed",
    tasks: [
      { id: uid(), title: "Design Phase", assignee: "Srini", completed: true },
      { id: uid(), title: "Construction", assignee: "Srini", completed: true },
      { id: uid(), title: "Inspection", assignee: "Srini", completed: true },
    ],
  },
  {
    id: uid(),
    owner: "Antti",
    title: "Historic Building Restoration",
    progress: 90,
    startDate: "2023-05-20",
    endDate: "2024-03-10",
    status: "In Progress",
    tasks: [
      { id: uid(), title: "Structural Reinforcement", assignee: "David", completed: true },
      { id: uid(), title: "Facade Restoration", assignee: "Michael", completed: true },
      { id: uid(), title: "Interior Redesign", assignee: "Maria", completed: false },
    ],
  },
  {
    id: uid(),
    owner: "Sofia",
    title: "Community Cultural Center",
    progress: 100,
    startDate: "2023-02-10",
    endDate: "2023-09-01",
    status: "Completed",
    tasks: [
      { id: uid(), title: "Site Planning", assignee: "Sarah", completed: true },
      { id: uid(), title: "Construction", assignee: "James", completed: true },
      { id: uid(), title: "Art Installation", assignee: "David", completed: true },
    ],
  },
  {
    id: uid(),
    owner: "Aino",
    title: "Modular Housing Development",
    progress: 60,
    startDate: "2023-07-01",
    endDate: "2024-08-01",
    status: "In Progress",
    tasks: [
      { id: uid(), title: "Module Design", assignee: "Sarah", completed: true },
      { id: uid(), title: "Prefabrication", assignee: "Maria", completed: false },
      { id: uid(), title: "On-site Assembly", assignee: "David", completed: false },
    ],
  },
];


export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
    const [message, setMessage] = useState<string>("");


  useEffect(() => {
    seedIfEmpty(SAMPLE);
    setProjects(loadProjects());
  }, []);

  function persist(next: Project[]) {
    setProjects(next);
    saveProjects(next);
  }

  function handleAdd() {
    setEditProject(null);
    setShowModal(true);
  }



  function handleSave(p: Project) {
    const exists = projects.find((x) => x.id === p.id);
    let next: Project[];
    if (exists) {
      next = projects.map((x) => (x.id === p.id ? p : x));
    } else {
      next = [p, ...projects];
    }
    persist(next);
    setShowModal(false);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    const next = projects.filter((p) => p.id !== id);
    persist(next);
  }

  function handleEdit(p: Project) {
    setEditProject(p);
    setShowModal(true);
  }

//   function handleUploadProject(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       try {
//         const text = event.target?.result as string;
//         const importedProjectRaw = JSON.parse(text);

//         // Map imported data to Project structure
//         const importedProject: Project = {
//           id: uid(), // assign new unique ID
//           owner:importedProjectRaw.owner || "Unknown",
//           title: importedProjectRaw.title || "Untitled Project",
//           progress: 0,
//           startDate: importedProjectRaw.startDate || new Date().toISOString().slice(0, 10),
//           endDate: importedProjectRaw.endDate || "",
//           status: importedProjectRaw.status || "In Progress",
//           description: importedProjectRaw.description || "",
//           tasks: Array.isArray(importedProjectRaw.tasks)
//             ? importedProjectRaw.tasks.map((t: any) => ({
//                 id: uid(),
//                 title: t.title || "Untitled Task",
//                 assignee: t.assignee || "",
//                 completed: t.completed || false,
//               }))
//             : [],
//         };

//         // Recalculate progress
//         const completedTasks = importedProject.tasks.filter((t) => t.completed).length;
//         importedProject.progress =
//           importedProject.tasks.length > 0
//             ? Math.round((completedTasks / importedProject.tasks.length) * 100)
//             : 0;

//         // Check duplicates and rename if needed
//         const duplicate = projects.find((p) => p.title === importedProject.title);
//         if (duplicate) {
//           importedProject.title += " (Imported)";
//         }

//         // Save to projects
//         const updatedProjects = [importedProject, ...projects];
//         persist(updatedProjects);
//         setMessage("✅ Project imported successfully!");
//       } catch (err) {
//         console.error(err);
//         setMessage("❌ Invalid file. Please upload a valid JSON text file.");
//       }
//     };

//     reader.readAsText(file);
//     // Reset input to allow uploading same file again if needed
//     e.target.value = "";
//   }

// function handleUploadProject(e: React.ChangeEvent<HTMLInputElement>) {
//   const file = e.target.files?.[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = (event) => {
//     try {
//       const text = event.target?.result as string;
//       const importedData = JSON.parse(text);

//       // Ensure the data is always an array of projects
//       const importedProjects = Array.isArray(importedData) ? importedData : [importedData];

//       const updatedProjects = [...projects]; // copy current state

//       importedProjects.forEach((rawProject: any) => {
//         if (!rawProject.title) return; // skip invalid

//         // Find if the project already exists
//         const existingIndex = updatedProjects.findIndex(
//           (p) => p.title.trim().toLowerCase() === rawProject.title.trim().toLowerCase()
//         );

//         const mappedTasks =
//           Array.isArray(rawProject.tasks) &&
//           rawProject.tasks.map((t: Task) => ({
//             id: uid(),
//             title: t.title || "Untitled Task",
//             assignee: t.assignee || "",
//             completed: t.completed || false,
//           }));

//         const completedTasks = mappedTasks.filter((t: Task) => t.completed).length;
//         const progress =
//           mappedTasks.length > 0
//             ? Math.round((completedTasks / mappedTasks.length) * 100)
//             : 0;

//         const newProject: Project = {
//           id: existingIndex !== -1 ? updatedProjects[existingIndex].id : uid(),
//           title: rawProject.title,
//           owner: rawProject.owner || "Unknown",
//           progress,
//           startDate: rawProject.startDate || "",
//           endDate: rawProject.endDate || "",
//           status: rawProject.status || "In Progress",
//           description: rawProject.description || "",
//           tasks: mappedTasks,
//         };

//         if (existingIndex !== -1) {
//           // ✅ Update existing project
//           updatedProjects[existingIndex] = {
//             ...updatedProjects[existingIndex],
//             ...newProject,
//           };
//         } else {
//           // ✅ Add new project
//           updatedProjects.push(newProject);
//         }
//       });

//       persist(updatedProjects);
//       setMessage("✅ Projects imported and updated successfully!");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Invalid file format. Please upload a valid JSON file.");
//     }
//   };

//   reader.readAsText(file);
//   e.target.value = ""; // reset input
// }

function handleUploadProject(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target?.result as string;
      const importedData = JSON.parse(text);

      // Support single or multiple projects
      const importedProjects = Array.isArray(importedData) ? importedData : [importedData];

      const updatedProjects = [...projects]; // current list

      importedProjects.forEach((rawProject: any) => {
        if (!rawProject.title) return;

        const existingIndex = updatedProjects.findIndex(
          (p) => p.title.trim().toLowerCase() === rawProject.title.trim().toLowerCase()
        );

        const newTasks =
          Array.isArray(rawProject.tasks) &&
          rawProject.tasks.map((t: Task) => ({
            id: uid(),
            title: t.title || "Untitled Task",
            assignee: t.assignee || "",
            completed: t.completed || false,
          }));

        if (existingIndex !== -1) {
          // ✅ Project already exists → update fields and merge tasks
          const existingProject = updatedProjects[existingIndex];

          // Merge tasks by title
          const mergedTasks = [...existingProject.tasks];

          newTasks.forEach((newTask: Task) => {
            const existingTaskIndex = mergedTasks.findIndex(
              (t) => t.title.trim().toLowerCase() === newTask.title.trim().toLowerCase()
            );
            if (existingTaskIndex !== -1) {
              // Update existing task details
              mergedTasks[existingTaskIndex] = {
                ...mergedTasks[existingTaskIndex],
                ...newTask,
              };
            } else {
              // Add new task
              mergedTasks.push(newTask);
            }
          });

          const completedTasks = mergedTasks.filter((t) => t.completed).length;
          const progress =
            mergedTasks.length > 0
              ? Math.round((completedTasks / mergedTasks.length) * 100)
              : 0;

          updatedProjects[existingIndex] = {
            ...existingProject,
            ...rawProject,
            tasks: mergedTasks,
            progress,
          };
        } else {
          // ✅ New project → add it
          const completedTasks = newTasks.filter((t: Task) => t.completed).length;
          const progress =
            newTasks.length > 0
              ? Math.round((completedTasks / newTasks.length) * 100)
              : 0;

          const newProject: Project = {
            id: uid(),
            title: rawProject.title,
            owner: rawProject.owner || "",
            status: rawProject.status || "In Progress",
            startDate: rawProject.startDate || "",
            endDate: rawProject.endDate || "",
            description: rawProject.description || "",
            tasks: newTasks,
            progress,
          };

          updatedProjects.push(newProject);
        }
      });

      persist(updatedProjects);
      setMessage("✅ Projects imported successfully with task-level merging!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Invalid JSON format. Please upload a valid project file.");
    }
  };

  reader.readAsText(file);
  e.target.value = ""; // reset input
}


  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header shadow-sm">
        <div>
          <h2 className="fw-bold mb-1 text-white">Project Dashboard</h2>
          <small className="text-light">
            Manage all your architecture projects efficiently.
          </small>
        </div>
        <div>
          <button className="btn btn-light fw-semibold px-4" onClick={handleAdd}>
            + Add New Project
          </button>
          {/* <button className="btn btn-light fw-semibold px-4" onClick={handleUploadProject}>
            Upload Project
          </button> */}
           <label className="btn btn-light fw-semibold px-4 mb-0 cursor-pointer">
            Upload Project
            <input
              type="file"
              accept=".txt,.json"
              onChange={handleUploadProject}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mt-3 ms-3 text-sm ${
            message.startsWith("✅") ? "text-success" : "text-danger"
          }`}
        >
          {message}
        </div>
      )}

      {/* Main Content */}
      <div className="dashboard-content container-fluid p-4">
        <div className="row g-4">
          {projects.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
              <div className="dashboard-card-wrapper">
                <ProjectCard
                  project={p}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-muted mt-5">
            No projects yet. Click "Add New Project" to create one.
          </div>
        )}
      </div>

      <ProjectModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        projectToEdit={editProject ?? undefined}
      />
    </div>
  );
}
