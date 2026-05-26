import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { apiFetch } = useFetch();

  const handleDelete = async (projectId, projectTitle) => {
    const isConfirmed = window.confirm(
      "Etes-vous sur de vouloir supprimer le projet " + projectTitle + " ?",
    );

    if (isConfirmed) {
      try {
        await apiFetch("/projects/" + projectId, {
          method: "DELETE",
        });
        toast.success("Projet supprimé");
        setProjects(projects.filter((project) => project.id !== projectId));
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch("/projects");
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;

  return (
    <>
      <h1> Dashboard ADMIN : Liste de mes projets</h1>
      <Link to={"/admin/projects/new"}>Créer un projet</Link>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>
            {project.title} avec id {project.id}
          </h2>
          <button
            onClick={() => navigate("/admin/projects/" + project.id + "/edit")}
          >
            Modifier
          </button>
          <button onClick={() => handleDelete(project.id, project.title)}>
            Supprimer
          </button>
        </div>
      ))}
    </>
  );
};

export default AdminPage;
