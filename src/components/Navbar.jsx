import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, LogOut, LayoutDashboard, Briefcase, Home, User } from "lucide-react";

export const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Función para resaltar el link activo
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                <Briefcase size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-900">
                MI<span className="text-indigo-600">PORTFOLIO</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive("/") ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              <Home size={16} />
              Accueil
            </Link>
            <Link
              to="/projects"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive("/projects") ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              <Briefcase size={16} />
              Projets
            </Link>

            {/* AREA DE AUTENTICACIÓN */}
            <div className="flex items-center gap-4 ml-4 pl-6 border-l border-slate-200">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive("/admin") ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
                    }`}
                  >
                    <LayoutDashboard size={16} />
                    Admin
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 transition-all active:scale-95"
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  <User size={16} />
                  Connexion
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-4 pb-6 pt-4">
            <Link
              to="/"
              onClick={toggleMenu}
              className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                isActive("/") ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/projects"
              onClick={toggleMenu}
              className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                isActive("/projects") ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Projets
            </Link>

            <div className="mt-4 border-t border-slate-100 pt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard Admin
                  </Link>
                  <button
                    onClick={() => { logout(); toggleMenu(); }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={20} />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-base font-bold text-white shadow-xl"
                >
                  <User size={20} />
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};