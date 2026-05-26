import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

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
    <>
      <h2>Page de connexion</h2>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <fieldset>
          <label htmlFor="email">Email</label>
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
        <fieldset>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Le champ mot de passe est requis",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </fieldset>
        <button type="submit">Me connecter</button>
      </form>
    </>
  );
};

export default LoginPage;
