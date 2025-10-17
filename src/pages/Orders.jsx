// src/pages/Orders.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";
import OrderForm from "../components/OrderForm";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import "../styles/Orders.css";

export default function Orders() {
  const [filter, setFilter] = useState("Toutes");
  const [showForm, setShowForm] = useState(false);

  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products);
  const addOrder = useStore((state) => state.addOrder);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const deleteOrder = useStore((state) => state.deleteOrder);

  const filteredOrders = orders.filter((o) =>
    filter === "Toutes" ? true : o.status === filter
  );

  const handleCreateOrder = (order) => {
    addOrder(order);
    setShowForm(false);
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Gestion des Commandes</h1>
          <p className="page-subtitle">
            {orders.length} commande{orders.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "❌ Annuler" : "➕ Nouvelle Commande"}
        </button>
      </div>

      {/* Formulaire de création */}
      {showForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2>Créer une Commande</h2>
          <OrderForm products={products} onCreate={handleCreateOrder} />
        </div>
      )}

      {/* Filtres */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3>Filtrer les Commandes</h3>
        <FilterBar filter={filter} setFilter={setFilter} orders={orders} />
      </div>

      {/* Liste des commandes */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <h3>Aucune commande trouvée</h3>
              <p>
                {filter === "Toutes"
                  ? "Commencez par créer votre première commande"
                  : `Aucune commande avec le statut "${filter}"`}
              </p>
            </div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-item card">
              <div className="order-header">
                <div className="order-customer">
                  <strong>{order.customerName}</strong>
                  <span className="small-muted">{order.phone || "—"}</span>
                </div>
                <div className="order-status-date">
                  <StatusBadge status={order.status} />
                  <span className="small-muted">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.lines.map((line) => {
                  const product = products.find((p) => p.id === line.productId);
                  if (!product) return null;
                  return (
                    <div key={line.productId} className="order-item-line">
                      <span>
                        {product.name} × {line.qty}
                      </span>
                      <span>{(product.price * line.qty).toFixed(2)} MAD</span>
                    </div>
                  );
                })}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total:</strong> {order.total} MAD
                </div>

                <div className="order-actions">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="input"
                    style={{ width: "150px" }}
                  >
                    <option>En attente</option>
                    <option>Préparée</option>
                    <option>Livrée</option>
                  </select>

                  <Link to={`/orders/${order.id}`} className="btn btn-ghost">
                    👁️ Voir
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Êtes-vous sûr de vouloir supprimer cette commande ?"
                        )
                      ) {
                        deleteOrder(order.id);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
