import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const CreateProjectPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const { apiFetch } = useFetch();

  const createProject = async (data) => {
    try {
      setLoading(true);
      const response = await apiFetch("/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response?.validationErrors) {
        response.validationErrors.forEach((validationError) => {
          setError(validationError.path, { message: validationError.msg });
        });
        return;
      }

      toast.success("Projet créé");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>"Chargement en cours"</p>;
  if (err) return <p>{"Erreur en cours : " + err}</p>;

  return (
    <>
      <h2>Page de création d'un projet</h2>
      <form onSubmit={handleSubmit(createProject)}>
        <fieldset>
          <label htmlFor="title">Titre du projet</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Le champ Titre est requis",
              minLength: {
                value: 2,
                message: "Minimum 2 caractères",
              },
              maxLength: {
                value: 150,
                message: "Max 150 caractères",
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description du projet</label>

          <textarea
            id="description"
            rows="5"
            cols="33"
            placeholder="Décrivez votre projet"
            {...register("description", {
              maxLength: {
                value: 2000,
                message: "Max 2000 caractères",
              },
            })}
          />

          {errors.description && <p>{errors.description.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="tech_stack">Stack du projet</label>
          <input
            type="text"
            id="tech_stack"
            {...register("tech_stack", {
              maxLength: {
                value: 255,
                message: "Max 255 caractères",
              },
            })}
          />
          {errors.tech_stack && <p>{errors.tech_stack.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="github_url">Lien github du projet</label>
          <input
            type="url"
            id="github_url"
            {...register("github_url", {
              validate: (value) =>
                !value ||
                value.startsWith("https://") ||
                "Mauvais format de l'url",
            })}
          />
          {errors.github_url && <p>{errors.github_url.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="demo_url">Lien demo du projet</label>
          <input
            type="url"
            id="demo_url"
            {...register("demo_url", {
              validate: (value) =>
                !value ||
                value.startsWith("https://") ||
                "Mauvais format de l'url",
            })}
          />
          {errors.demo_url && <p>{errors.demo_url.message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="image_url">Lien image du projet</label>
          <input
            type="url"
            id="image_url"
            {...register("image_url", {
              validate: (value) =>
                !value ||
                value.startsWith("https://") ||
                "Mauvais format de l'url",
            })}
          />
          {errors.image_url && <p>{errors.image_url.message}</p>}
        </fieldset>

        <button type="submit">Créer un projet</button>
      </form>
    </>
  );
};

export default CreateProjectPage;
