// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Project, Task } from "../types";
// import { loadProjects, saveProjects } from "../localStorageService";
// import AddTaskModal from "./AddTaskModal";
// import { uid } from "../utils";

// export default function ProjectDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [project, setProject] = useState<Project | null>(null);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [editTask, setEditTask] = useState<Task | null>(null);

//   useEffect(() => {
//     const all = loadProjects();
//     const found = all.find((p) => p.id === id);
//     setProjects(all);
//     setProject(found ?? null);
//   }, [id]);

//   if (!project) {
//     return <div className="p-4">Project not found.</div>;
//   }

//   function updateProject(updated: Project) {
//     const next = projects.map((p) => (p.id === updated.id ? updated : p));
//     saveProjects(next);
//     setProjects(next);
//     setProject(updated);
//   }

//   function toggleTask(taskId: string) {
//     const updated = {
//       ...project,
//       tasks: project.tasks.map((t) =>
//         t.id === taskId ? { ...t, completed: !t.completed } : t
//       ),
//     };

//     const completedCount = updated.tasks.filter((t) => t.completed).length;
//     const total = updated.tasks.length;
//     updated.progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

//     updateProject(updated);
//   }

//   function handleAddOrEditTask(task: Task) {
//     let updatedTasks: Task[];

//     if (editTask) {
//       // Editing existing task
//       updatedTasks = project.tasks.map((t) => (t.id === task.id ? task : t));
//     } else {
//       // Adding new task
//       updatedTasks = [...project.tasks, { ...task, id: uid() }];
//     }

//     const updated = { ...project, tasks: updatedTasks };
//     updateProject(updated);
//     setShowTaskModal(false);
//     setEditTask(null);
//   }

//   function handleDeleteTask(taskId: string) {
//     if (!confirm("Delete this task?")) return;
//     const updated = {
//       ...project,
//       tasks: project.tasks.filter((t) => t.id !== taskId),
//     };
//     updateProject(updated);
//   }

//   return (
//     <div className="p-4">
//       <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
//         ← Back to Dashboard
//       </button>

//       <h3>{project.title}</h3>
//       <p>
//         Status: <strong>{project.status}</strong>
//       </p>
//       <p>Progress: {project.progress}%</p>

//       <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
//         <h5 className="mb-0">Tasks</h5>
//         <button
//           className="btn btn-primary btn-sm"
//           onClick={() => {
//             setEditTask(null);
//             setShowTaskModal(true);
//           }}
//         >
//           + Add Task
//         </button>
//       </div>

//       {project.tasks && project.tasks.length > 0 ? (
//         <ul className="list-group">
//           {project.tasks.map((task) => (
//             <li
//               key={task.id}
//               className="list-group-item d-flex justify-content-between align-items-start flex-wrap"
//             >
//               <div className="me-auto">
//                 <div>
                //   <input
                //     type="checkbox"
                //     checked={task.completed}
                //     onChange={() => toggleTask(task.id)}
                //     className="me-2"
                //   />
//                   <strong>{task.title}</strong>
//                 </div>
//                 {task.assignee && (
//                   <div className="text-muted small mt-1">
//                     Assigned to: <span className="fw-semibold">{task.assignee}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="d-flex align-items-center gap-2">
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => {
//                     setEditTask(task);
//                     setShowTaskModal(true);
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={() => handleDeleteTask(task.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-muted">No tasks yet. Click "Add Task" to create one.</p>
//       )}

//       {/* ✅ Reuse modal for both Add and Edit */}
//       <AddTaskModal
//         show={showTaskModal}
//         onHide={() => {
//           setShowTaskModal(false);
//           setEditTask(null);
//         }}
//         onSave={handleAddOrEditTask}
//         taskToEdit={editTask}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
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

  if (!project) {
    return <div className="p-4">Project not found.</div>;
  }

  function updateProject(updated: Project) {
    const next = projects.map((p) => (p.id === updated.id ? updated : p));
    saveProjects(next);
    setProjects(next);
    setProject(updated);
  }

  function toggleTask(taskId: string) {
    const updated = {
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    };

    const completedCount = updated.tasks.filter((t) => t.completed).length;
    const total = updated.tasks.length;
    updated.progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    updated.lastUpdated = new Date().toLocaleDateString();

    updateProject(updated);
  }

  function handleAddOrEditTask(task: Task) {
    let updatedTasks: Task[];

    if (editTask) {
      updatedTasks = project.tasks.map((t) => (t.id === task.id ? task : t));
    } else {
      updatedTasks = [...project.tasks, { ...task, id: uid() }];
    }

    const updated = { ...project, tasks: updatedTasks };
    updateProject(updated);
    setShowTaskModal(false);
    setEditTask(null);
  }

  function handleDeleteTask(taskId: string) {
    if (!confirm("Delete this task?")) return;
    const updated = {
      ...project,
      tasks: project.tasks.filter((t) => t.id !== taskId),
    };
    updateProject(updated);
  }

  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const lastUpdated = project.lastUpdated || new Date().toLocaleDateString();

  return (
    <div className="project-details-container p-4">
      {/* Back Button */}
      <button
        className="btn btn-link text-decoration-none mb-3 text-dark fw-semibold"
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
      <div className="card border-0 shadow-sm mb-4 rounded-3">
        <div className="card-body d-flex flex-wrap justify-content-between align-items-center">
          <div className="me-3 flex-grow-1">
            <p className="text-muted mb-1 fw-semibold small">Progress</p>
            <div className="progress mb-1" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-dark"
                style={{ width: `${project.progress}%` }}
              ></div>
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
          className="btn btn-dark btn-sm px-3"
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
                task.completed ? "task-completed" : "task-active"
              }`}
            >
              <div>
                <div className="d-flex align-items-center gap-2">
                  {task.completed ? (
                    // <span className="text-success fs-5">✔</span>
//                     <button
//     className="btn btn-sm btn-link text-success fw-bold p-0"
//     onClick={() => toggleTask(task.id)}
//     title="Mark as Incomplete"
//   >
//     ✔
//   </button>
   <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="me-2"
                  />
                  ) : (
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="form-check-input"
                    />
                  )}
                  <span
                    className={`fw-semibold ${
                      task.completed ? "text-decoration-line-through text-muted" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                {task.assignee && (
                  <small className="text-secondary d-block mt-1">
                    Assigned to:{" "}
                    <span className="fw-semibold">{task.assignee}</span>
                  </small>
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
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  🗑
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
