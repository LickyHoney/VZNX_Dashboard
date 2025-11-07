import { useState, useEffect } from "react";
import { Project, Task } from "../types";
import { uid } from "../utils";

interface Props {
  show: boolean;
  onHide: () => void;
  onSave: (p: Project) => void;
  taskToEdit?: Task | null;
}

//const statuses: ProjectStatus[] = ["In Progress", "Completed", "Planned"];

export default function AddTaskModal({ show, onHide, onSave, taskToEdit }: Props) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    if (show) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setAssignee(taskToEdit.assignee || "");
      } else {
        setTitle("");
        setAssignee("");
      }
    }
  }, [show, taskToEdit]);
  if (!show) return null;

  function handleSave() {
    if (!title.trim()) {
      alert("Task name is required");
      return;
    }

     const task: Task = {
      id: taskToEdit ? taskToEdit.id : uid(), // keep same id when editing
      title: title.trim(),
      assignee: assignee.trim() || undefined,
      completed: taskToEdit ? taskToEdit.completed : false,
    };

    onSave(task);
    onHide();
  }


  return (
    <div
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) onHide(); // close when clicking outside
    }}
  >
    <div className="modal-dialog-centered">
      <div className="modal-content p-3">
        <div className="modal-header border-0 pb-0">
          <h5 className="modal-title">
            {taskToEdit ? "Edit Task" : "Add New Task"}
          </h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onHide}
          />
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Task Name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>

           <div className="mb-3">
              <label className="form-label">Assignee</label>
              <select
                className="form-select"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="">Select assignee</option>
                <option value="Sarah Chen">Sarah Chen</option>
                <option value="Michael Rodriguez">Michael Rodriguez</option>
                <option value="David Kim">David Kim</option>
                <option value="Alex Johnson">Alex Johnson</option>
                <option value="Maria Lopez">Maria Lopez</option>
                <option value="James White">James White</option>
              </select>
            </div>
          </div>

         

        
       
        <div className="modal-footer border-0 pt-0">
          <button className="btn btn-secondary" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {taskToEdit ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  </div>
    
  );
}
