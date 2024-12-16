import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import Testing from "./pages/testing.jsx";
import ProjectCreation from "./components/drawer/4StepDataEntry.js";

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

// Custom component for checking user and navigation
const AppWithAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    const path = location.pathname;
    if (path === "/") {
      // Redirect to the dashboard if the user is already logged in
      if (user) {
        navigate("/dashboard");
      }
    }else{
      // Redirect to the login page if the user is not logged in
      if (!user) {
        navigate("/login");
      }
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" index element={<Landing />} />
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="users" element={<UsersList />} />
        <Route path="projectDashboard" element={<ProjectDashboard />} />
        <Route path="projectDetail/:id" element={<ProjectDetail />} />
        <Route path="gallery" element={<Gallery isSidebarOpen={false} />} />
        <Route path="milestones" element={<MilestonePage />} />
        <Route path="projectInspection" element={<ProjectInsection />} />
        <Route path="projectTest" element={<ProjectTest />} />
        <Route path="budget-uc-upload" element={<BudgetUcUpload />} />
        <Route path="issue-management" element={<Issues />} />
        <Route path="issues" element={<Issues />} />
        <Route path="projectCreation" element={<ProjectCreation />} />
        <Route path="testing" element={<Testing />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <EntitiesProvider>
          <AppWithAuthCheck />
        </EntitiesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
