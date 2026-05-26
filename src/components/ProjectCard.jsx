import { Link } from "react-router-dom";

export const ProjectCard = ({ project }) => {
  return (
    <section>
      {project && project.image_url && (
        <img src={project.image_url} alt={project.title} loading="lazy" />
      )}

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

      <Link to={`/projects/${project.id}`}>Voir plus</Link>
    </section>
  );
};
