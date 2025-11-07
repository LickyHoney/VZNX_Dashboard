import { useEffect, useState } from "react";
import { loadProjects } from "../localStorageService";
import { Project, Task } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";

type TeamStats = {
  name: string;
  activeTasks: number;
  completedTasks: number;
  totalTasks: number;
};

export default function TeamOverview() {
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);

  useEffect(() => {
    const projects = loadProjects();
    const taskMap: Record<string, { active: number; completed: number }> = {};

    projects.forEach((project: Project) => {
      project.tasks?.forEach((task: Task) => {
        if (task.assignee) {
          if (!taskMap[task.assignee]) {
            taskMap[task.assignee] = { active: 0, completed: 0 };
          }
          if (task.completed) {
            taskMap[task.assignee].completed += 1;
          } else {
            taskMap[task.assignee].active += 1;
          }
        }
      });
    });

    const stats: TeamStats[] = Object.entries(taskMap).map(([name, data]) => ({
      name,
      activeTasks: data.active,
      completedTasks: data.completed,
      totalTasks: data.active + data.completed,
    }));

    setTeamStats(stats);
  }, []);

  const getWorkloadColor = (percent: number) => {
    if (percent >= 75) return "danger";
    if (percent >= 40) return "warning";
    return "success";
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header shadow-sm">
        <div>
          <h2 className="fw-bold mb-1 text-white">Team Overview</h2>
          <small className="text-light">
            Monitor team workload and task distribution
          </small>
        </div>
      </div>

      {/* Team Cards */}
      <div className="dashboard-content container-fluid p-4">
        {teamStats.length === 0 ? (
          <p className="text-muted text-center">
            No team members have assigned tasks yet.
          </p>
        ) : (
          <div className="row g-4">
            {teamStats.map((member) => {
              const capacityPercent =
                member.totalTasks > 0
                  ? Math.round((member.activeTasks / member.totalTasks) * 100)
                  : 0;

              const color = getWorkloadColor(capacityPercent);

              return (
                <div key={member.name} className="col-12 col-md-6 col-lg-4">
                  <div
                    className={`card border-${color} border-3 shadow-sm rounded-4`}
                  >
                    <div className="card-body">
                      {/* Header with profile */}
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                            member.name
                          )}`}
                          alt={member.name}
                          className="rounded-circle me-3 border border-light"
                          width="48"
                          height="48"
                        />
                        <div className="flex-grow-1">
                          <h5 className="card-title mb-0 fw-semibold text-dark">
                            {member.name}
                          </h5>
                          <span
                            className={`badge bg-${color}-subtle text-${color} mt-1 px-2 py-1 rounded-pill border border-${color}-subtle`}
                          >
                            {capacityPercent === 0
                              ? "All Tasks Completed"
                              : color === "danger"
                              ? "Overloaded"
                              : color === "warning"
                              ? "Busy"
                              : "Available"}
                          </span>
                        </div>
                      </div>

                      {/* Task info */}
                      <p className="mb-1 text-secondary small">
                        <strong className="text-dark">Active Tasks:</strong>{" "}
                        {member.activeTasks}/{member.totalTasks}
                      </p>

                      {/* Progress bar */}
                      <div className="progress mb-2" style={{ height: "6px" }}>
                        <div
                          className={`progress-bar bg-${color}`}
                          style={{ width: `${capacityPercent}%` }}
                        ></div>
                      </div>

                      <p className="text-muted small mb-3">
                        Capacity: {capacityPercent}%
                      </p>

                      {/* Summary footer */}
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold text-primary small">
                          {member.activeTasks} Active
                        </span>
                        <span className="fw-semibold text-success small">
                          {member.completedTasks} Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

