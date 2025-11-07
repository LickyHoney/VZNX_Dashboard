import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project, Task } from "../types";
import { loadProjects, saveProjects } from "../localStorageService";
import AddTaskModal from "./AddTaskModal";
import { uid } from "../utils";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  useEffect(() => {
    const all = loadProjects();
    const found = all.find((p) => p.id === id);
    setProjects(all);
    setProject(found ?? null);
  }, [id]);

  if (!project) return <div className="p-4">Project not found.</div>;

  // ✅ Safely update project in state and localStorage
  function updateProject(updated: Project) {
    const next = projects.map((p) => (p.id === updated.id ? updated : p));
    saveProjects(next);
    setProjects(next);
    setProject(updated);
  }

// ✅ Toggle task completion and recalculate progress

function toggleTask(taskId: string) {
  // Narrow project locally
  const p = project;
  if (!p) return;

  const updatedTasks = p.tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );

  const total = updatedTasks.length;
  const completedCount = updatedTasks.filter((t) => t.completed).length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const updated: Project = {
    ...p,
    tasks: updatedTasks,
    progress,
    lastUpdated: new Date().toLocaleDateString(),
    id: p.id,
  };

  updateProject(updated);
}

// ✅ Add or Edit a task
function handleAddOrEditTask(task: Task) {
  const p = project;
  if (!p) return;

  let updatedTasks: Task[];

  if (editTask) {
    updatedTasks = p.tasks.map((t) => (t.id === task.id ? task : t));
  } else {
    updatedTasks = [...p.tasks, { ...task, id: uid() }];
  }

  const completedCount = updatedTasks.filter((t) => t.completed).length;
  const total = updatedTasks.length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const updated: Project = {
    ...p,
    tasks: updatedTasks,
    progress,
    lastUpdated: new Date().toLocaleDateString(),
    id: p.id,
  };

  updateProject(updated);
  setShowTaskModal(false);
  setEditTask(null);
}

// ✅ Delete a task
function handleDeleteTask(taskId: string) {
  const p = project;
  if (!p) return;

  if (!confirm("Delete this task?")) return;

  const updatedTasks = p.tasks.filter((t) => t.id !== taskId);

  const completedCount = updatedTasks.filter((t) => t.completed).length;
  const total = updatedTasks.length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const updated: Project = {
    ...p,
    tasks: updatedTasks,
    progress,
    lastUpdated: new Date().toLocaleDateString(),
    id: p.id,
  };

  updateProject(updated);
}

  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const lastUpdated = project.lastUpdated || new Date().toLocaleDateString();

  // Dynamic border color based on progress bar
  const borderColor =
    project.progress === 100
      ? "#198754" // green
      : project.progress > 0
      ? "#0d6efd" // blue
      : "#6c757d"; // grey

  return (
    <div className="project-details-container p-4">
      {/* Back Button */}
      <button
        className="btn btn-link text-primary text-decoration-underline mb-3 fw-semibold p-0"
        onClick={() => navigate(-1)}
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark">{project.title}</h2>
        <span className="badge bg-primary-subtle text-primary fw-medium px-3 py-2">
          {project.status || "In Progress"}
        </span>
      </div>

      {/* Progress Section */}
      <div
        className="card border-2 shadow-sm mb-4 rounded-3"
        style={{ borderColor }}
      >
        <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
          <div className="me-3 flex-grow-1">
            <p className="text-muted mb-1 fw-semibold small">Progress</p>
            <div className="progress mb-2" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${project.progress}%`,
                  backgroundColor: borderColor,
                }}
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <span className="fw-semibold small text-secondary">
              {project.progress}%
            </span>
          </div>

          <div>
            <p className="text-muted mb-0 fw-semibold small">Tasks</p>
            <h6 className="fw-bold text-dark mb-0">
              {completedTasks}/{totalTasks}
            </h6>
            <small className="text-muted">completed</small>
          </div>

          <div>
            <p className="text-muted mb-0 fw-semibold small">Last Updated</p>
            <span className="fw-medium text-dark small">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark mb-0">Tasks</h5>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditTask(null);
            setShowTaskModal(true);
          }}
        >
          + Add Task
        </button>
      </div>

      {totalTasks > 0 ? (
        <div className="tasks-list">
          {project.tasks.map((task) => (
            <div
              key={task.id}
              className={`task-card d-flex justify-content-between align-items-center p-3 mb-2 rounded-3 ${
                task.completed ? "bg-light" : "bg-white"
              } border`}
              style={{ borderColor }}
            >
              <div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="form-check-input"
                  />
                  <span
                    className={`fw-semibold ${
                      task.completed
                        ? "text-decoration-line-through text-muted"
                        : "text-dark"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {task.assignee && (
                  <div className="d-flex align-items-center mt-1 gap-2">
                    
                    <small className="text-secondary">
                      Assigned to:{" "}
                      <span className="fw-semibold">{task.assignee}</span>
                    </small>
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setEditTask(task);
                    setShowTaskModal(true);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No tasks yet. Click “Add Task” to create one.</p>
      )}

      {/* Task Modal */}
      <AddTaskModal
        show={showTaskModal}
        onHide={() => {
          setShowTaskModal(false);
          setEditTask(null);
        }}
        onSave={handleAddOrEditTask}
        taskToEdit={editTask}
      />
    </div>
  );
}
