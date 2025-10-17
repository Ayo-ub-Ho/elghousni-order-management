// src/components/OrderList.jsx
import React, { useState } from "react";
import OrderCard from "./OrderCard";
import products from "../data/products";

export default function OrderList({
  orders,
  filter,
  onChangeStatus,
  onDelete,
}) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const visible = orders.filter((o) =>
    filter === "Toutes" ? true : o.status === filter
  );

  return (
    <div>
      <div className="orders-grid">
        {visible.length === 0 && (
          <div className="small-muted">Aucune commande</div>
        )}
        {visible.map((o) => (
          <OrderCard
            key={o.id}
            order={o}
            products={products}
            onChangeStatus={onChangeStatus}
            onDelete={onDelete}
            onView={(order) => setSelectedOrder(order)}
          />
        ))}
      </div>

      {/* Modal simple pour détails si besoin */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.4)",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="card"
            style={{ width: 520 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Détails commande</h3>
            <div>
              <strong>{selectedOrder.customerName}</strong> —{" "}
              {selectedOrder.phone}
            </div>
            <div style={{ marginTop: 8 }}>
              {selectedOrder.lines.map((l) => {
                const prod = products.find((p) => p.id === l.productId);
                return (
                  <div key={l.productId} className="product-line">
                    {prod.name} × {l.qty}{" "}
                    <div>{(prod.price * l.qty).toFixed(2)} MAD</div>
                  </div>
                );
              })}
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
              }}
            >
              <div>Total</div>
              <div>{selectedOrder.total} MAD</div>
            </div>
            <div style={{ marginTop: 12, textAlign: "right" }}>
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedOrder(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
