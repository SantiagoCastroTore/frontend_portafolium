import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { toast } from "sonner";
import { useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const { apiFetch } = useFetch();

  const sendMessage = async (data) => {
    try {
      setLoading(true);
      const result = await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (result?.validationErrors) {
        result.validationErrors.forEach((validationError) => {
          setError(validationError.path, { message: validationError.msg });
        });
        return;
      }

      toast.success(result.message || "Message envoyé avec succès !");
      reset();
    } catch (error) {
      setErr(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <Loader2 className="w-12 h-12 text-brand-purple animate-spin mb-4" />
      <p className="text-xl font-medium text-slate-500 italic">Envoi en cours...</p>
    </div>
  );

  if (err) return (
    <div className="p-8 text-center bg-red-50 rounded-3xl border-2 border-red-100">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-red-800 mb-2">Une erreur est survenue</h3>
      <p className="text-red-600 mb-6">{err}</p>
      <button 
        onClick={() => setErr(null)}
        className="px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all"
      >
        Réessayer
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(sendMessage)} className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-slate-500 font-medium ml-1">Nom</label>
          <input
            type="text"
            id="name"
            className={`w-full p-4 bg-white border-2 rounded-xl transition-all outline-none text-lg ${
              errors.name 
                ? "border-red-400 focus:border-red-500 bg-red-50/20" 
                : "border-slate-100 focus:border-brand-purple"
            }`}
            {...register("name", {
              required: "Le champ nom est requis",
              minLength: { value: 2, message: "Le nom doit avoir au moins 2 caractères" },
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm font-bold italic ml-1">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-slate-500 font-medium ml-1">Email</label>
          <input
            type="email"
            id="email"
            className={`w-full p-4 bg-white border-2 rounded-xl transition-all outline-none text-lg ${
              errors.email 
                ? "border-red-400 focus:border-red-500 bg-red-50/20" 
                : "border-slate-100 focus:border-brand-purple"
            }`}
            {...register("email", {
              required: "Le champ email est requis",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Format d'email non conforme",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-bold italic ml-1">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* CAMPO: MESSAGE */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="message" className="text-slate-500 font-medium ml-1">Message</label>
        <textarea
          id="message"
          rows="6"
          placeholder="Dites-m'en plus sur votre projet..."
          className={`w-full p-4 bg-white border-2 rounded-xl transition-all outline-none text-lg resize-none ${
            errors.message 
              ? "border-red-400 focus:border-red-500 bg-red-50/20" 
              : "border-slate-100 focus:border-brand-purple"
          }`}
          {...register("message", {
            required: "Le champ message est requis",
            minLength: { value: 10, message: "Le message doit avoir au moins 10 caractères" },
          })}
        />
        {errors.message && (
          <span className="text-red-500 text-sm font-bold italic ml-1">{errors.message.message}</span>
        )}
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center px-12 py-4 font-black text-brand-purple border-2 border-brand-purple rounded-full overflow-hidden transition-all hover:bg-brand-purple hover:text-white active:scale-95"
        >
          <span className="relative flex items-center gap-2 text-xl tracking-tight">
            Soumettre
            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
        </button>
      </div>

    </form>
  );
};