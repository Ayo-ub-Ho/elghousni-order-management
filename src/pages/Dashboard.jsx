import { Link } from "react-router-dom";
import useStore from "../store/useStore";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const getStats = useStore((state) => state.getStats);
  const orders = useStore((state) => state.orders);
  const stats = getStats(); // ← ينفذ مرة واحدة فقط لكل render
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <p className="dashboard-subtitle">Vue d'ensemble de votre activité</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-label">Total Commandes</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-label">En Attente</div>
            <div className="stat-value">{stats.pending}</div>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">👨‍🍳</div>
          <div className="stat-content">
            <div className="stat-label">Préparées</div>
            <div className="stat-value">{stats.prepared}</div>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Livrées</div>
            <div className="stat-value">{stats.delivered}</div>
          </div>
        </div>

        <div className="stat-card stat-primary">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Revenu Total</div>
            <div className="stat-value">{stats.totalRevenue} MAD</div>
          </div>
        </div>
      </div>

      {/* Commandes récentes */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Commandes Récentes</h2>
          <Link to="/orders" className="btn btn-ghost">
            Voir tout →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <h3>Aucune commande</h3>
              <p>Commencez par créer votre première commande</p>
              <Link to="/orders" className="btn btn-primary">
                Créer une commande
              </Link>
            </div>
          </div>
        ) : (
          <div className="recent-orders">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="recent-order-card"
              >
                <div className="order-info">
                  <strong>{order.customerName}</strong>
                  <span className="small-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="order-meta">
                  <span
                    className={`status-badge status-${order.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {order.status}
                  </span>
                  <span className="order-total">{order.total} MAD</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Actions rapides */}
      <div className="dashboard-section">
        <h2>Actions Rapides</h2>
        <div className="quick-actions">
          <Link to="/orders" className="quick-action-card">
            <div className="quick-action-icon">➕</div>
            <h3>Nouvelle Commande</h3>
            <p>Créer une commande client</p>
          </Link>

          <Link to="/products" className="quick-action-card">
            <div className="quick-action-icon">🏷️</div>
            <h3>Gérer Produits</h3>
            <p>Ajouter ou modifier des produits</p>
          </Link>

          <Link to="/orders" className="quick-action-card">
            <div className="quick-action-icon">📋</div>
            <h3>Voir Commandes</h3>
            <p>Consulter toutes les commandes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
