import { useEffect, useState } from "react";
import { Project } from "../types";
import { loadProjects, saveProjects, seedIfEmpty } from "../localStorageService";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { uid } from "../utils";

const SAMPLE: Project[] = [
  {
    id: uid(),
    title: "Residential Complex",
    progress: 75,
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    status: "In Progress",
    description: "",
    tasks: [
      { id: uid(), title: "Site Survey", assignee: "Sarah Chen", completed: true },
      { id: uid(), title: "Architectural Design", assignee: "Michael Rodriguez", completed: false },
      { id: uid(), title: "Structural Analysis", assignee: "David Kim", completed: false },
    ],
  },
  {
    id: uid(),
    title: "Urban Revitalization Project",
    progress: 40,
    startDate: "2023-03-01",
    endDate: "2024-12-31",
    status: "In Progress",
    tasks: [
      { id: uid(), title: "Site Demolition", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Utility Planning", assignee: "Maria Lopez", completed: false },
      { id: uid(), title: "Landscape Design", assignee: "James White", completed: false },
    ],
  },
  {
    id: uid(),
    title: "Sustainable Office Tower",
    progress: 100,
    startDate: "2022-09-01",
    endDate: "2023-11-15",
    status: "Completed",
    tasks: [
      { id: uid(), title: "Design Phase", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Construction", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Inspection", assignee: "Alex Johnson", completed: true },
    ],
  },
  {
    id: uid(),
    title: "Historic Building Restoration",
    progress: 90,
    startDate: "2023-05-20",
    endDate: "2024-03-10",
    status: "In Progress",
    tasks: [
      { id: uid(), title: "Structural Reinforcement", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Facade Restoration", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Interior Redesign", assignee: "Alex Johnson", completed: false },
    ],
  },
  {
    id: uid(),
    title: "Community Cultural Center",
    progress: 100,
    startDate: "2023-02-10",
    endDate: "2023-09-01",
    status: "Completed",
    tasks: [
      { id: uid(), title: "Site Planning", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Construction", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Art Installation", assignee: "Alex Johnson", completed: true },
    ],
  },
  {
    id: uid(),
    title: "Modular Housing Development",
    progress: 60,
    startDate: "2023-07-01",
    endDate: "2024-08-01",
    status: "In Progress",
    tasks: [
      { id: uid(), title: "Module Design", assignee: "Alex Johnson", completed: true },
      { id: uid(), title: "Prefabrication", assignee: "Alex Johnson", completed: false },
      { id: uid(), title: "On-site Assembly", assignee: "Alex Johnson", completed: false },
    ],
  },
];


export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

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
        </div>
      </div>

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
