import { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useFetch } from "../hooks/useFetch";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { apiFetch } = useFetch();

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
      <h1>Liste de mes projets</h1>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
};

export default ProjectsPage;
