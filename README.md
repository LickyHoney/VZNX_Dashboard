# 🏗️ VZNX Workspace Dashboard

A clean and functional React-based prototype built for the **VZNX Technical Challenge** — designed to simplify how architecture studios manage their **projects**, **tasks**, and **teams**.  

This project focuses on **clarity**, **structure**, and **ease of use**, showcasing how projects can be efficiently organized and tracked from start to finish.

---

## 🚀 Features

### 🧭 **1. Project Dashboard**
- Displays all projects with:
  - Project name  
  - Status (In Progress / Completed)  
  - Progress bar showing completion percentage  
- Add, edit, and delete projects easily  
- Automatically updates progress when all related tasks are completed  
- Responsive card layout with visual consistency and clean UI  

### ✅ **2. Task Management (Inside Each Project)**
- View and manage all tasks related to a project  
- Each task includes:
  - Task name  
  - Status toggle (Incomplete / Complete)  
- Completed tasks are shown with strikethrough and green checkmark  
- Add, edit, and delete tasks dynamically  
- Progress automatically updates based on task completion  

### 👥 **3. Team Overview**
- Displays team member details and workload overview  
- Shows:
  - Team member name  
  - Number of tasks assigned  
  - Capacity bar with color logic:
    - 🟢 Green → Light load  
    - 🟡 Yellow → Moderate load  
    - 🔴 Red → Heavy load  
- Simple visual way to monitor team capacity and balance workloads  

---

## 🛠️ Tech Stack

- **Frontend:** React (TypeScript)  
- **UI Framework:** Bootstrap & Custom CSS  
- **Icons:** Bootstrap Icons / Font Awesome  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Storage:** LocalStorage (lightweight persistence)  

---

## 📂 Project Structure

src/
┣ components/
┃ ┣ Sidebar.tsx
┃ ┣ ProjectCard.tsx
┃ ┣ ProjectDashboard.tsx
┃ ┣ ProjectDetails.tsx
┃ ┗ TeamsOverview.tsx
┃ ┗ AddTaskModal.tsx
┃ ┗ ProjectModal.tsx
┣ App.css
┣ App.tsx
┣ index.css
┗ main.tsx
┣ types.ts
┣ utils.ts


- `Sidebar` → Navigation between Dashboard, Projects, and Teams  
- `ProjectDashboard` → Displays all projects with progress bars  
- `ProjectDetails` → Manages individual project tasks  
- `TeamOverview` → Displays workload per team member  

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/vznx-dashboard.git
   cd vznx-dashboard

2. **Install Dependencies:**
    ```bash
    npm install

3. **Run the development server:**
    ```bash
    npm run dev

4. **Build for production::**
    ```bash
    npm run build

## 💾 Data Persistence

The application uses **browser localStorage** to save all project and task data.  
This ensures your data remains available even after refreshing or closing the page.

### 🧹 To reset data manually:
1. Open your browser’s **Developer Tools (F12)** → go to the **Console** tab.  
2. Run the following command:
   ```js
   localStorage.clear()
3. Refresh the page and all stored data will be cleared.

## 🌐 Live Demo

🔗 **[View Live Demo](https://statuesque-sawine-231e89.netlify.app)**





