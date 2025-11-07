import { useState, useEffect } from "react";
import { Project, ProjectStatus } from "../types";
import { uid } from "../utils";

interface Props {
  show: boolean;
  onHide: () => void;
  onSave: (p: Project) => void;
  projectToEdit?: Project | null;
}

export default function ProjectModal({ show, onHide, onSave, projectToEdit }: Props) {
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("In Progress");

  const statuses: ProjectStatus[] = ["In Progress", "Completed", "On Hold"];

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setProgress(projectToEdit.progress);
      setStartDate(projectToEdit.startDate.slice(0, 10));
      setEndDate(projectToEdit.endDate.slice(0, 10));
      setStatus(projectToEdit.status);
    } else {
      setTitle("");
      setProgress(0);
      setStartDate("");
      setEndDate("");
      setStatus("In Progress");
    }
  }, [projectToEdit, show]);

  if (!show) return null;

  function handleSave() {
    if (!title.trim()) {
      alert("Project title required");
      return;
    }

    const project: Project = projectToEdit
      ? { ...projectToEdit, title, progress, startDate, endDate, status }
      : {
          id: uid(),
          title,
          progress,
          startDate,
          endDate,
          status,
          tasks: [],
        };

    onSave(project);
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onHide();
      }}
    >
      <div className="modal-dialog-centered">
        <div className="modal-content p-3">
          {/* ✅ Highlighted Modal Header */}
          <div
  className="modal-header border-0 bg-primary text-white rounded-top d-flex justify-content-between align-items-center"
  style={{ margin: '-16px -16px 0 -16px', padding: '12px 20px', marginBottom: '12px' }}
>
  <h5 className="modal-title mb-0 text-white w-100 text-center">
    {projectToEdit ? "Edit Project" : "Add New Project"}
  </h5>
  <button
    type="button"
    className="btn-close btn-close-white position-absolute end-0 me-3"
    aria-label="Close"
    onClick={onHide}
  />
</div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Progress (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="form-control"
              />
            </div>

            <div className="row">
              <div className="col">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="form-select"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {projectToEdit ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
