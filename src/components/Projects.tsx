import { useEffect, useState } from "react";
import { Project, Task } from "../types";
import { loadProjects, saveProjects, seedIfEmpty } from "../localStorageService";
import { SAMPLE } from "./Sample";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { uid } from "../utils";
import { useLocation } from "react-router-dom";


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [message, setMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({ all: false, active: false });
  const location = useLocation();
    

useEffect(() => {
  seedIfEmpty(SAMPLE);
  const loaded = loadProjects().map(updateProjectProgress);
  setProjects(loaded);
  saveProjects(loaded);
}, []);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const filter = params.get("filter");
  if (filter === "active") {
    setFilters({ all: false, active: true });
  } else if (filter === "all") {
    setFilters({ all: true, active: false });
  } else {
    setFilters({ all: false, active: false });
  } 
}, [location.search]);

//   useEffect(() => {
//     seedIfEmpty(SAMPLE);
//     setProjects(loadProjects());
//   }, []);

 // Helper to automatically update project status and progress
function updateProjectProgress(p: Project): Project {
  const total = p.tasks.length;
  const completed = p.tasks.filter((t) => t.completed).length;

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  let status = p.status;

  if (total > 0 && completed === total) {
    status = "Completed";
  } else if (completed > 0 && completed < total) {
    status = "In Progress";
  } else {
    status = "On Hold";
  }

  return { ...p, progress, status };
}

function persist(next: Project[]) {
  // ✅ Ensure all projects have auto-updated progress & status
  const updated = next.map(updateProjectProgress);
  setProjects(updated);
  saveProjects(updated);
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

  // ✅ Helper to format project to export structure
  function formatProject(p: Project) {
    return {
      title: p.title,
      owner: p.owner || "", // optional field
      status: p.status,
      startDate: p.startDate,
      endDate: p.endDate,
      tasks: p.tasks.map((t) => ({
        title: t.title,
        assignee: t.assignee,
        completed: t.completed,
      })),
    };
  }
  // ✅ Export all projects
  function handleExportAll() {
    const data = projects.map((p) => formatProject(p));
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "all-projects.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  // ✅ Export individual project
  function handleExportSingle(p: Project) {
    const data = formatProject(p);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${p.title.replace(/\s+/g, "_").toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }



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

// Filtered projects based on search + active/all filter
// const filteredProjects = projects.filter((p) =>
//   p.title.toLowerCase().includes(searchTerm.toLowerCase())
//  const matchesFilter = filter === "all" || p.status === "In Progress";
//   return matchesSearch && matchesFilter;
// );

// Toggle handlers
function toggleAllFilter() {
  setFilters((prev) => (prev.all ? { all: false, active: false } : { all: true, active: false }));
}

function toggleActiveFilter() {
  setFilters((prev) => (prev.active ? { all: false, active: false } : { all: false, active: true }));
}

const filteredProjects = projects.filter((p) => {
  const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesFilter = filters.active ? p.status === "In Progress" : true;

  return matchesSearch && matchesFilter;
});

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="project-header shadow-sm">
        <div>
          <h2 className="fw-bold mb-1 text-white">Projects</h2>
          <small className="text-light">
            Manage all your architecture projects efficiently.
          </small>
        </div>
        <div>
          {/* <button className="btn btn-light fw-semibold px-4" onClick={handleAdd}>
            + Add New Project
          </button> */}
          <button
  className="btn fw-semibold px-4"
  style={{
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
  }}
  onClick={handleAdd}
>
  <i className="bi bi-plus-lg" style={{ color: "white" }} title="Add New Project"></i> 
</button>
          {/* <button className="btn btn-light fw-semibold px-4" onClick={handleUploadProject}>
            Upload Project
          </button> */}
           <label
  className="btn btn-outline-primary fw-semibold px-4 mb-0 cursor-pointer"
  style={{ backgroundColor: "transparent", borderColor: "white" }} 
>
  <i className="bi bi-box-arrow-up" style={{ color: "white" }} title="Upload Project"></i>
  <input
    type="file"
    accept=".txt,.json"
    onChange={handleUploadProject}
    style={{ display: "none" }}
  />
</label>

<button
  className="btn btn-outline-primary fw-semibold px-4"
  style={{ backgroundColor: "transparent", borderColor: "white" }}
  onClick={handleExportAll}
>
  <i className="bi bi-download" style={{ color: "white" }} title="Export All Projects"></i> 
</button>
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

      <div className="project-search-container">
  <input
    type="text"
    className="form-control"
    placeholder="Search projects by name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
{/* Filter Section */}
<div className="project-filters d-flex align-items-center gap-4 px-4 mt-3">
  <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      id="filterAll"
      checked={filters.all}
      onChange={toggleAllFilter}
    />
    <label className="form-check-label" htmlFor="filterAll">
      All
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      id="filterActive"
      checked={filters.active}
      onChange={toggleActiveFilter}
    />
    <label className="form-check-label" htmlFor="filterActive">
      Active
    </label>
  </div>
</div>

      {/* Main Content */}
      <div className="dashboard-content container-fluid p-4">
        <div className="row g-4">
          {filteredProjects.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
              <div className="dashboard-card-wrapper">
                <ProjectCard
                  project={p}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onExport={handleExportSingle}
                />
                {/* <button
                  className="btn btn-outline-primary btn-sm mt-2 w-100"
                  onClick={() => handleExportSingle(p)}
                >
                  Export Project
                </button> */}
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
