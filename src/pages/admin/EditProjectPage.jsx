import { useNavigate, useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Type,
  AlignLeft,
  Layers,
  Globe,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";


const EditProjectPage = () => {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const { id } = useParams();
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiFetch("/projects/" + id);
        reset({
          title: data.title,
          description: data.description,
          tech_stack: data.tech_stack,
          github_url: data.github_url,
          demo_url: data.demo_url,
          image_url: data.image_url,
        });
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, apiFetch, reset]);


const updateProject = async (formData) => { 
  try {
    const result = await apiFetch("/projects/" + id, {
      method: "PUT",
      body: JSON.stringify(formData),
    });

    if (result?.validationErrors) {
      result.validationErrors.forEach((validationError) => {
        setError(validationError.path, { message: validationError.msg });
      });
      return;
    }

    toast.success("Le projet a été mis à jour");
    navigate("/admin");
  } catch (error) {
    setErr(error.message);
    toast.error(error.message);
  }
};
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 italic font-medium">
          Récupération des données du projet...
        </p>
      </div>
    );

  if (err)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-xl w-full p-10 text-center bg-white rounded-[2.5rem] shadow-xl border border-red-100">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-red-600 mb-8 font-medium">{err}</p>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold"
          >
            <ArrowLeft size={18} /> Retour au Dashboard
          </Link>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-slate-50/50 pb-24 animate-in fade-in duration-700">
      <header className="bg-white border-b border-slate-100 py-10 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-4 transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Retour au Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Modifier le projet{" "}
            <span className="text-indigo-600">#{id.slice(-4)}</span>
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl shadow-slate-200/40 border border-slate-100">
          <form onSubmit={handleSubmit(updateProject)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"
                >
                  <Type size={14} /> Titre du projet
                </label>
                <input
                  type="text"
                  id="title"
                  className={`w-full p-4 bg-slate-50 rounded-2xl border-2 transition-all outline-none ${errors.title ? "border-red-200 focus:border-red-500" : "border-transparent focus:border-indigo-500 focus:bg-white"}`}
                  {...register("title", {
                    required: "Le champ Titre est requis",
                    minLength: { value: 2, message: "Minimum 2 caractères" },
                    maxLength: { value: 150, message: "Max 150 caractères" },
                  })}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs font-bold mt-1 ml-1 italic">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="tech_stack"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"
                >
                  <Layers size={14} /> Stack technologique
                </label>
                <input
                  type="text"
                  id="tech_stack"
                  placeholder="React, Node, Tailwind..."
                  className={`w-full p-4 bg-slate-50 rounded-2xl border-2 transition-all outline-none ${errors.tech_stack ? "border-red-200 focus:border-red-500" : "border-transparent focus:border-indigo-500 focus:bg-white"}`}
                  {...register("tech_stack", {
                    maxLength: { value: 255, message: "Max 255 caractères" },
                  })}
                />
                {errors.tech_stack && (
                  <p className="text-red-500 text-xs font-bold mt-1 ml-1 italic">
                    {errors.tech_stack.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"
              >
                <AlignLeft size={14} /> Description détaillée
              </label>
              <textarea
                id="description"
                rows="6"
                className={`w-full p-4 bg-slate-50 rounded-2xl border-2 transition-all outline-none resize-none ${errors.description ? "border-red-200 focus:border-red-500" : "border-transparent focus:border-indigo-500 focus:bg-white"}`}
                {...register("description", {
                  maxLength: { value: 2000, message: "Max 2000 caractères" },
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1 italic">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="github_url"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"
                >
                  Lien GitHub
                </label>
                <input
                  type="url"
                  id="github_url"
                  placeholder="https://github.com/..."
                  className={`w-full p-4 bg-slate-50 rounded-2xl border-2 transition-all outline-none ${errors.github_url ? "border-red-200 focus:border-red-500" : "border-transparent focus:border-indigo-500 focus:bg-white"}`}
                  {...register("github_url", {
                    validate: (value) =>
                      !value ||
                      value.startsWith("https://") ||
                      "L'URL doit commencer par https://",
                  })}
                />
                {errors.github_url && (
                  <p className="text-red-500 text-xs font-bold mt-1 ml-1 italic">
                    {errors.github_url.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="demo_url"
                  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"
                >
                  <Globe size={14} /> Lien Démo (Live)
                </label>
                <input
                  type="url"
                  id="demo_url"
                  placeholder="https://proyecto.com"
                  className={`w-full p-4 bg-slate-50 rounded-2xl border-2 transition-all outline-none ${errors.demo_url ? "border-red-200 focus:border-red-500" : "border-transparent focus:border-indigo-500 focus:bg-white"}`}
                  {...register("demo_url", {
                    validate: (value) =>
                      !value ||
                      value.startsWith("https://") ||
                      "L'URL doit comenzar por https://",
                  })}
                />
                {errors.demo_url && (
                  <p className="text-red-500 text-xs font-bold mt-1 ml-1 italic">
                    {errors.demo_url.message}
                  </p>
                )}
              </div>
            </div>

            {/* Imagen URL */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="image_url"
                className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"
              >
                <ImageIcon size={14} /> URL de l'image de couverture
              </label>
              <input
                type="url"
                id="image_url"
                className={`w-full p-4 bg-slate-50 rounded-2xl border-2 transition-all outline-none ${errors.image_url ? "border-red-200 focus:border-red-500" : "border-transparent focus:border-indigo-500 focus:bg-white"}`}
                {...register("image_url", {
                  validate: (value) =>
                    !value ||
                    value.startsWith("https://") ||
                    "L'URL doit comenzar por https://",
                })}
              />
              {errors.image_url && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1 italic">
                  {errors.image_url.message}
                </p>
              )}
            </div>

            {/* Botón de envío */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full md:w-fit flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                <Save size={20} />
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProjectPage;
