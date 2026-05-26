import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  }, []);

  const updateProject = async (data) => {
    try {
      await apiFetch("/projects/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (data?.validationErrors) {
        data.validationErrors.forEach((validationError) => {
          setError(validationError.path, { message: validationError.msg });
        });
        return;
      }
      toast.success("Le projet avec l'id " + id + " a été mis à jour");
      navigate("/admin");
    } catch (error) {
      setErr(error.message);
      toast.error(error.message);
    }
  };

  if (loading) return <p>"Chargement en cours"</p>;
  if (err) return <p>{"Erreur en cours : " + err}</p>;
  return (
    <>
      <h2>Page de mise à jour d'un projet</h2>
      <form onSubmit={handleSubmit(updateProject)}>
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

        <button type="submit">Modifier le projet</button>
      </form>
    </>
  );
};

export default EditProjectPage;
