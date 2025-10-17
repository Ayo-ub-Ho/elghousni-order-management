import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/Layout.css";

export default function Layout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      <header className="app-header shadow-sm py-3 px-4">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Gauche : Logo + Nom */}
          <div className="d-flex align-items-center gap-2">
            <img
              src="/assets/images/elghousni-logo.jpg"
              alt="logo"
              className="rounded-circle border border-success"
              style={{ width: "55px", height: "55px", objectFit: "cover" }}
            />
            <h2 className="fs-5 fw-bold text-success m-0">
              Coopérative Elghousni
            </h2>
          </div>

          {/* Centre : Liens de navigation */}
          <nav className="navbar-links d-flex align-items-center gap-2">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/orders"
              className={`nav-link ${isActive("/orders") ? "active" : ""}`}
            >
              📦 Commandes
            </Link>
            <Link
              to="/products"
              className={`nav-link ${isActive("/products") ? "active" : ""}`}
            >
              🏷️ Produits
            </Link>
          </nav>

          {/* Droite : Utilisateur */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center p-0"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="bi bi-person fs-5"></i>
            </button>

            <img
              src="/assets/images/photo-profile.jpg"
              alt="User Avatar"
              className="rounded-circle border border-success"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </div>
        </div>
      </header>

      {/* Titre global du système */}
      <div className="text-center py-3 bg-light border-bottom">
        <h4 className="fw-semibold text-dark m-0">
          Système de Gestion des Commandes
        </h4>
      </div>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
