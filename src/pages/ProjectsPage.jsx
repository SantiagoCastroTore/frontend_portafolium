import { useEffect, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useFetch } from "../hooks/useFetch";
import { Loader2, AlertCircle } from "lucide-react";

const ProjectsPage = () => {
  // --- TU LÓGICA ORIGINAL ---
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

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-purple animate-spin mb-4" />
      <p className="text-xl font-medium text-slate-400 italic">Chargement en cours...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto my-20 p-8 text-center bg-red-50 rounded-[2rem] border-2 border-red-100">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-600 font-bold text-lg">{"Erreur en cours : " + error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors">
        Réessayer
      </button>
    </div>
  );

  return (
    <main className="animate-in fade-in duration-700">
      
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight">
            Liste de mes projets
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Voici une sélection de mes travaux récents. Chaque projet est une nouvelle occasion 
            d'apprendre et de repousser les limites du développement.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="bg-brand-purple py-24 px-4 text-center text-white">
        <h2 className="text-3xl font-black mb-6 italic">Intéressé par une collaboration ?</h2>
        <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto font-medium">
          Je suis toujours prêt à discuter de nouveaux défis et d'idées innovantes.
        </p>
        <a 
          href="/contact" 
          className="inline-block border-2 border-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-brand-purple transition-all active:scale-95 shadow-xl"
        >
          Discutons !
        </a>
      </section>

    </main>
  );
};

export default ProjectsPage;