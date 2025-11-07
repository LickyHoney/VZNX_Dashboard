import { Project } from "./types";

const STORAGE_KEY = "archispace_projects_v1";

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function seedIfEmpty(sample: Project[]) {
  const existing = loadProjects();
  if (existing.length === 0) {
    saveProjects(sample);
  }
}
