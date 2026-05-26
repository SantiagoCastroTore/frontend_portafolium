import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/projects">Projets</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        )}
      </ul>
      {isAuthenticated && <button onClick={logout}>Déconnexion</button>}
    </nav>
  );
};
