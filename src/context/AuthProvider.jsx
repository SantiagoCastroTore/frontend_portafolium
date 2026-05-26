import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { isTokenValid } from "../utils/jwt.utils";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  if (storedToken && !isTokenValid(storedToken)) {
    localStorage.removeItem("token");
  }

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storedToken && isTokenValid(storedToken),
  );

  function login(token) {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/admin");
  }

  function logout() {
    navigate("/");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
