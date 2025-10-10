
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
function Header() {
  return (
    <header className="bg-light border-bottom shadow-sm py-3 px-4">
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* Logo + Nom Coopérative */}
        <div className="d-flex align-items-center gap-2">
          {/* Logo rond */}
          <img
            src="/assets/images/elghousni-logo.jpg"
            alt="logo"
            className="rounded-circle"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          {/* Nom Coopérative */}
          <h2 className="fs-5 fw-bold text-success m-0">
            Coopérative Elghousni
          </h2>
        </div>

        {/* Titre du système */}
        <div className="text-center flex-grow-1 mx-3">
          <h4 className="fw-semibold m-0 text-dark">
            Système de Gestion des Commandes
          </h4>
        </div>

        {/* Bouton utilisateur + Avatar */}
        <div className="d-flex align-items-center gap-2">
          {/* Bouton utilisateur rond */}
          <button
            className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center p-0"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-person fs-5"></i>
          </button>

          {/* Avatar utilisateur */}
          <img
            src="/assets/images/photo-profile.jpg"
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
