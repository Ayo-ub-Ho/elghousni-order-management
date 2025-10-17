// src/components/OrderSummary.jsx
import React from "react";
import { toTwoDecimals } from "../utils";

export default function OrderSummary({ products, lines, total }) {
  return (
    <div style={{ marginTop: 12 }}>
      <h4>Résumé de la commande</h4>
      {lines.length === 0 ? (
        <div className="small-muted">Aucun produit sélectionné</div>
      ) : (
        <div>
          {lines.map((l) => {
            const prod = products.find((p) => p.id === l.productId);
            const sub = toTwoDecimals(prod.price * l.qty);
            return (
              <div key={l.productId} className="product-line">
                <div>
                  {prod.name}{" "}
                  <span className="small-muted">
                    ({l.qty} × {prod.price} MAD)
                  </span>
                </div>
                <div>{sub} MAD</div>
              </div>
            );
          })}
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700,
            }}
          >
            <div>Total</div>
            <div>{total} MAD</div>
          </div>
        </div>
      )}
    </div>
  );
}
