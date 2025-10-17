// src/pages/OrderDetail.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useStore from "../store/useStore";
import StatusBadge from "../components/StatusBadge";
import "../styles/OrderDetail.css";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = useStore((state) => state.getOrderById(id));
  const products = useStore((state) => state.products);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const deleteOrder = useStore((state) => state.deleteOrder);

  if (!order) {
    return (
      <div className="order-detail-page">
        <div className="card">
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❌</div>
            <h2>Commande introuvable</h2>
            <p>La commande #{id} n'existe pas ou a été supprimée</p>
            <Link to="/orders" className="btn btn-primary">
              ← Retour aux commandes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      deleteOrder(order.id);
      navigate("/orders");
    }
  };

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <div className="order-detail-page">
      {/* Header avec bouton retour */}
      <div className="detail-header">
        <Link to="/orders" className="btn btn-ghost">
          ← Retour aux commandes
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          🗑️ Supprimer
        </button>
      </div>

      {/* Informations principales */}
      <div className="card">
        <div className="detail-section">
          <div className="detail-title-row">
            <h1>Commande #{order.id}</h1>
            <StatusBadge status={order.status} />
          </div>

          <div className="detail-info-grid">
            <div className="info-item">
              <span className="info-label">Client</span>
              <span className="info-value">{order.customerName}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Téléphone</span>
              <span className="info-value">{order.phone || "—"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Date de création</span>
              <span className="info-value">
                {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">Statut</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="input status-select"
              >
                <option>En attente</option>
                <option>Préparée</option>
                <option>Livrée</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Produits commandés */}
      <div className="card">
        <h2>Produits Commandés</h2>

        <div className="products-table">
          <div className="table-header">
            <div>Produit</div>
            <div>Prix unitaire</div>
            <div>Quantité</div>
            <div>Sous-total</div>
          </div>

          {order.lines.map((line) => {
            const product = products.find((p) => p.id === line.productId);
            if (!product) {
              return (
                <div key={line.productId} className="table-row">
                  <div className="product-cell">
                    <span className="small-muted">Produit supprimé</span>
                  </div>
                  <div>—</div>
                  <div>{line.qty}</div>
                  <div>—</div>
                </div>
              );
            }

            const subtotal = (product.price * line.qty).toFixed(2);

            return (
              <div key={line.productId} className="table-row">
                <div className="product-cell">
                  <strong>{product.name}</strong>
                  <span className="small-muted">{product.category}</span>
                </div>
                <div>{product.price} MAD</div>
                <div className="quantity-badge">×{line.qty}</div>
                <div className="subtotal">{subtotal} MAD</div>
              </div>
            );
          })}

          <div className="table-footer">
            <div></div>
            <div></div>
            <div>
              <strong>Total</strong>
            </div>
            <div className="total-amount">{order.total} MAD</div>
          </div>
        </div>
      </div>

      {/* Timeline de statut */}
      <div className="card">
        <h2>Historique</h2>
        <div className="timeline">
          <div
            className={`timeline-item ${
              order.status === "En attente" ||
              order.status === "Préparée" ||
              order.status === "Livrée"
                ? "completed"
                : ""
            }`}
          >
            <div className="timeline-icon">📝</div>
            <div className="timeline-content">
              <strong>Commande créée</strong>
              <span className="small-muted">
                {new Date(order.createdAt).toLocaleString("fr-FR")}
              </span>
            </div>
          </div>

          <div
            className={`timeline-item ${
              order.status === "Préparée" || order.status === "Livrée"
                ? "completed"
                : ""
            }`}
          >
            <div className="timeline-icon">👨‍🍳</div>
            <div className="timeline-content">
              <strong>Commande préparée</strong>
              <span className="small-muted">
                {order.status === "Préparée" || order.status === "Livrée"
                  ? "Terminé"
                  : "En attente"}
              </span>
            </div>
          </div>

          <div
            className={`timeline-item ${
              order.status === "Livrée" ? "completed" : ""
            }`}
          >
            <div className="timeline-icon">✅</div>
            <div className="timeline-content">
              <strong>Commande livrée</strong>
              <span className="small-muted">
                {order.status === "Livrée" ? "Terminé" : "En attente"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
