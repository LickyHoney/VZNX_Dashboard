export type ProjectStatus = "In Progress" | "Completed" | "On Hold";


export interface Task {
  id: string;
  title: string;
  assignee?: string;
  completed: boolean; 
}

export interface Project {
  id: string;
  owner: string;
  title: string;
  progress: number; // 0-100
  startDate: string; // ISO date
  endDate: string; // ISO date
  status: ProjectStatus;
  description?: string;
  tasks: Task[];
  lastUpdated?: string;
}
