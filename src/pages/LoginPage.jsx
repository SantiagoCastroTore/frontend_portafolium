import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext);

  const handleSubmitForm = async (data) => {
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        response.validationErrors.forEach((validationError) => {
          setError(validationError.path, { message: validationError.msg });
        });
        return;
      }

      login(response.token);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center bg-white px-4">
      
      <div className="mb-8">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-indigo-100 border border-slate-50 border-t-8 border-t-indigo-600">
        
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Bonjour !</h2>
          <p className="text-slate-500 font-medium mt-2">Accès au tableau de bord</p>
        </header>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <Mail size={14} />
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="votre@email.com"
              className={`w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none transition-all ${
                errors.email 
                  ? "border-red-200 focus:border-red-500 bg-red-50/30" 
                  : "border-transparent focus:border-indigo-500 focus:bg-white"
              }`}
              {...register("email", {
                required: "Le champ email est requis",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Le format de l'email saisi n'est pas conforme",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1 flex items-center gap-1 italic">
                <AlertCircle size={12} /> {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password"  className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
              <Lock size={14} />
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none transition-all ${
                errors.password 
                  ? "border-red-200 focus:border-red-500 bg-red-50/30" 
                  : "border-transparent focus:border-indigo-500 focus:bg-white"
              }`}
              {...register("password", {
                required: "Le champ mot de passe est requis",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-bold mt-1 ml-1 flex items-center gap-1 italic">
                <AlertCircle size={12} /> {errors.password.message}
              </p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] mt-8"
          >
            <LogIn size={20} />
            Me connecter
          </button>

        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm font-medium italic">
            Espace réservé à l'administrateur.
          </p>
        </div>

      </div>

      <footer className="mt-20 text-slate-300 text-sm font-black tracking-tighter uppercase">
        © {new Date().getFullYear()} MI PORTFOLIO
      </footer>

    </main>
  );
};

export default LoginPage;