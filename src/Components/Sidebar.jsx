import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside
      className="bg-light border-end vh-100 p-3"
      style={{ width: "250px", position: "fixed", top: "90px", left: 0 }}
    >
      <h5 className="text-success mb-4">Menu</h5>
      <ul className="nav flex-column gap-2">
        <li
          className={`nav-item ${
            currentPage === "nouvelle" ? "fw-bold text-success" : "fw-bold text-success"
          }`}
        >
          <button
            className="btn btn-light w-100 text-start"
            onClick={() => onNavigate("nouvelle")}
          >
            <i className="bi bi-plus-circle me-2"></i> Nouvelle commande
          </button>
        </li>
        <li
          className={`nav-item ${
            currentPage === "liste" ? "fw-bold text-success" : ""
          }`}
        >
          <button
            className="btn btn-light w-100 text-start"
            onClick={() => onNavigate("liste")}
          >
            <i className="bi bi-list-ul me-2"></i> Liste des commandes
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
