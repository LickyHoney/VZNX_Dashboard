import React from "react";
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

  return (
    <div className="project-card">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="mb-0">{project.title}</h5>
        <div className={`status-badge ${badgeClass}`}>{project.status}</div>
      </div>

      <div className="mb-2">
        <div className="d-flex justify-content-between">
          <small className="text-muted">Progress:</small>
          <small className="text-muted">{project.progress}%</small>
        </div>
        <div className="progress" style={{ height: 8 }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${project.progress}%` }}
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <div className="small text-muted mb-3 d-flex justify-content-between">
        <div>Start: {fmtDate(project.startDate)}</div>
        <div>End: {fmtDate(project.endDate)}</div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary btn-sm" onClick={() => onEdit(project)}>
          <i className="bi bi-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(project.id)}>
          <i className="bi bi-trash"></i> Delete
        </button>
        {/* <button className="btn btn-primary btn-sm ms-auto">*/}
        <button
          className="btn btn-primary btn-sm ms-auto"
          onClick={() => navigate(`/project/${project.id}`)}
        >
        View Tasks</button> 
      </div>
    </div>
  );
}
