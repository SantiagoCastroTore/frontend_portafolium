import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { apiFetch } = useFetch();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiFetch(`/projects/${id}`);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>"Chargement en cours"</p>;
  if (error) return <p>{"Erreur en cours : " + error}</p>;

  return (
    <>
      <div>ProjectDetailPage</div>
      <section>
        <img src={project.image_url} alt={project.title} loading="lazy" />
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p>Badges technologiques : {project.tech_stack}</p>

        <ul>
          <li>
            Lien github : <a href={project.github_url}></a>
          </li>
          <li>
            Lien demo : <a href={project.demo_url}></a>
          </li>
        </ul>

        <Link to="/projects">Retour aux projets</Link>
      </section>
    </>
  );
};

export default ProjectDetailPage;
