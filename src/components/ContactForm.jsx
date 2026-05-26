import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { toast } from "sonner";
import { useState } from "react";

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

      toast.success(result.message);
      reset();
    } catch (error) {
      setErr(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>"Chargement en cours"</p>;
  if (err) return <p>{"Erreur en cours : " + err}</p>;

  return (
    <form onSubmit={handleSubmit(sendMessage)}>
      <fieldset>
        <label htmlFor="name">Votre nom</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Le champ nom est requis",
            minLength: {
              value: 2,
              message: "Min 2",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </fieldset>
      <fieldset>
        <label htmlFor="email">Votre email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Le champ email est requis",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Le format de l'email saisi n'est pas conforme",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </fieldset>
      <textarea
        id="message"
        rows="5"
        cols="33"
        placeholder="Votre message"
        {...register("message", {
          required: "Le champ message est requis",
          minLength: {
            value: 10,
            message: "Min 10",
          },
        })}
      />

      {errors.message && <p>{errors.message.message}</p>}
      <button type="submit">Envoyer le message</button>
    </form>
  );
};
