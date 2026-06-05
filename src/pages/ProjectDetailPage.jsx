import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import {
  ExternalLink,
  ArrowLeft,
  Code2,
  Loader2,
  AlertCircle,
} from "lucide-react";

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
  }, [id, apiFetch]);

  // --- ESTADOS DE CARGA Y ERROR ESTILIZADOS ---
  if (loading)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-xl font-medium text-slate-400 italic">
          Chargement du projet...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto my-20 p-10 text-center bg-red-50 rounded-[2.5rem] border-2 border-red-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-red-800 mb-2">Erreur</h2>
        <p className="text-red-600 mb-8">{error}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold"
        >
          <ArrowLeft size={18} /> Retour aux projets
        </Link>
      </div>
    );

  return (
    <main className="min-h-screen bg-white pb-24 animate-in fade-in duration-700">
      {/* BARRA DE NAVEGACIÓN SUPERIOR SUTIL */}
      <div className="max-w-5xl mx-auto px-6 pt-12 mb-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Retour aux projets
        </Link>
      </div>

      <article className="max-w-5xl mx-auto px-6">
        {/* CABECERA: Título y Badges */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            {project.title}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {project.tech_stack?.split(",").map((tech, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-16 shadow-2xl rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-100">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[600px]"
              loading="lazy"
            />
          ) : (
            <div className="h-96 flex items-center justify-center text-slate-300">
              <Code2 size={80} strokeWidth={1} />
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 italic underline decoration-indigo-600 underline-offset-8 decoration-4">
              À propos du projet
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 sticky top-32">
              <h3 className="text-xl font-black text-slate-900 mb-8">
                Liens du projet
              </h3>

              <ul className="space-y-4 list-none p-0">
                {project.github_url && (
                  <li>
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                      Code Source
                    </a>
                  </li>
                )}
              
              </ul>

              <p className="mt-8 text-center text-slate-400 text-sm font-medium">

                Découvrez comment ce projet a été construit.
              </p>
            </div>
          </div>
        </section>
      </article>

      <footer className="max-w-5xl mx-auto px-6 mt-24 pt-12 border-t border-slate-100 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-indigo-600 font-black text-lg hover:underline"
        >
          <ArrowLeft size={20} /> Explorar d'autres projets
        </Link>
      </footer>
    </main>
  );
};

export default ProjectDetailPage;
