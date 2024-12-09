import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
// import { Projects } from "./pages/Projects";
import { Projects } from "./pages/staticProjecsts";
import ProjectCreation from "./components/drawer/dataEntryForm";

import { Issues } from "./pages/Issues";
import { AuthProvider } from "./context/AuthContext";
import { EntitiesProvider } from "./context/EntityContect";
import ProjectDashboard from "./pages/projectDashboard";
import Gallery from "./pages/Gallery";
import MilestonePage from "./pages/MilestonePage";
import UsersList from "./pages/userList";
import ProjectInsection from "./pages/projectInspection";
import ProjectTest from "./pages/projectTest";
import ProjectDetail from "./projectDetailsComponent/ProjectDetails";
import BudgetUcUpload from "./pages/BudgetUCUpload";

function App() {
  return (
    <Router>
      <AuthProvider>
        <EntitiesProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" index element={<Landing />} />
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="users" element={<UsersList />} />

              <Route path="projectDashboard" element={<ProjectDashboard />} />
              <Route path="projectDetail/:id" element={<ProjectDetail />} />
              <Route
                path="gallery"
                element={<Gallery isSidebarOpen={false} />}
              />
              <Route path="milestones" element={<MilestonePage />} />
              <Route path="projectInspection" element={<ProjectInsection />} />
              <Route path="projectTest" element={<ProjectTest />} />
              <Route path="budget-uc-upload" element={<BudgetUcUpload />} />
              <Route path="issue-management" element={<Issues />} />

              <Route path="issues" element={<Issues />} />

              <Route path="projectCreation" element={<ProjectCreation />} />
            </Route>
          </Routes>
        </EntitiesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
