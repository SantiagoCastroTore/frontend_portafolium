import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import CreateProjectPage from "./pages/admin/CreateProjectPage";
import EditProjectPage from "./pages/admin/EditProjectPage";
import PrivateRoute from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <PrivateRoute role="admin">
              <CreateProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects/:id/edit"
          element={
            <PrivateRoute role="admin">
              <EditProjectPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
