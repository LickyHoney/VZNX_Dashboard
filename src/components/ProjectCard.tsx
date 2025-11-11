import { useNavigate } from "react-router-dom";
import { Project } from "../types";
import { fmtDate } from "../utils";

interface Props {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: Props) {
  const navigate = useNavigate();

  const badgeClass =
    project.status === "Completed"
      ? "bg-success text-white"
      : project.status === "In Progress"
      ? "bg-info text-white"
      : "bg-secondary text-white";

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click from triggering when clicking on buttons
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest(".btn") ||
      target.tagName === "I"
    ) {
      return;
    }
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className="project-card card shadow-sm border-0 rounded-4 p-3 mb-3"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="fw-bold mb-0 text-dark">{project.title}</h5>
        <div className={`badge ${badgeClass} px-3 py-2`}>{project.status}</div>
      </div>

      <div className="mb-3">
        <div className="d-flex justify-content-between">
          <small className="text-muted fw-semibold">Progress:</small>
          <small className="text-muted fw-semibold">
            {project.progress}%
          </small>
        </div>
        <div className="progress mt-1" style={{ height: "8px" }}>
          <div
            className={`progress-bar ${
              project.progress === 100
                ? "bg-success"
                : project.progress >= 50
                ? "bg-warning"
                : "bg-primary"
            }`}
            role="progressbar"
            style={{ width: `${project.progress}%` }}
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div>

      <div className="small text-muted mb-3 d-flex justify-content-between">
        <div>Start: {fmtDate(project.startDate)}</div>
        <div>End: {fmtDate(project.endDate)}</div>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project);
          }}
        >
          <i className="bi bi-pencil"></i> Edit
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
}
