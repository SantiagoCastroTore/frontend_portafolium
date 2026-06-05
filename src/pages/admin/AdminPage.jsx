import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  LayoutDashboard, 
  Loader2, 
  AlertCircle,
  ExternalLink
} from "lucide-react";

const AdminPage = () => {
  // --- TU LÓGICA ORIGINAL ---
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
        setProjects(projects.filter((project) => (project.id || project._id) !== projectId));
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
  }, [apiFetch]);

  // --- RENDERS CONDICIONALES ---
  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
      <p className="text-slate-500 italic font-medium">Chargement du tableau de bord...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto my-20 p-8 text-center bg-red-50 rounded-[2rem] border-2 border-red-100">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-700 font-bold">{"Erreur : " + error}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50/50 pb-24 animate-in fade-in duration-700">
      
      {/* HEADER DEL DASHBOARD */}
      <header className="bg-white border-b border-slate-100 py-12 mb-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Admin</h1>
              <p className="text-slate-500 font-medium text-sm italic">Gérez vos réalisations avec élégance.</p>
            </div>
          </div>

          <Link 
            to={"/admin/projects/new"}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            <Plus size={20} />
            Créer un projet
          </Link>
        </div>
      </header>

      {/* LISTA DE PROYECTOS */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Projet</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 hidden md:table-cell">ID</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((project) => (
                  <tr key={project.id || project._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        {/* Miniatura si existe image_url */}
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                          <img 
                            src={project.image_url || "https://via.placeholder.com/100"} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-8 py-6 hidden md:table-cell">
                      <code className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded-md font-mono">
                        {project.id || project._id}
                      </code>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex justify-end items-center gap-2">
                        {/* BOTÓN EDITAR (Tu navigate original) */}
                        <button
                          onClick={() => navigate("/admin/projects/" + (project.id || project._id) + "/edit")}
                          className="p-3 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                          title="Modifier le projet"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* BOTÓN ELIMINAR (Tu handleDelete original) */}
                        <button 
                          onClick={() => handleDelete(project.id || project._id, project.title)}
                          className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                          title="Supprimer le projet"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Estado vacío */}
          {projects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400 italic">Vous n'avez pas encore de projets.</p>
              <Link to="/admin/projects/new" className="text-indigo-600 font-bold hover:underline mt-2 inline-block text-sm">
                Commencez par en créer un !
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER DASHBOARD */}
      <footer className="max-w-6xl mx-auto px-6 mt-12 flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-tighter">
         <span>© {new Date().getFullYear()} MI PORTFOLIO ADMIN</span>
         <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
           Voir le site public <ExternalLink size={12} />
         </Link>
      </footer>

    </main>
  );
};

export default AdminPage;