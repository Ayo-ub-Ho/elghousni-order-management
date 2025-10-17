import StatusBadge from "./StatusBadge";
import { toTwoDecimals } from "../utils";

export default function OrderCard({
  order,
  products,
  onChangeStatus,
  onDelete,
  onView,
}) {
  return (
    <div className="order-card card" style={{ padding: 12 }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{order.customerName}</strong>
            <div className="small-muted">{order.phone || "—"}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <StatusBadge status={order.status} />
            <div className="small-muted" style={{ marginTop: 6 }}>
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          {order.lines.map((l) => {
            const prod = products.find((p) => p.id === l.productId);
            const sub = toTwoDecimals(prod.price * l.qty);
            return (
              <div key={l.productId} className="product-line">
                <div>
                  {prod.name} × {l.qty}
                </div>
                <div>{sub} MAD</div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{ width: 180, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div style={{ fontWeight: 700, fontSize: 16 }}>{order.total} MAD</div>

        <select
          value={order.status}
          onChange={(e) => onChangeStatus(order.id, e.target.value)}
          className="input"
        >
          <option>En attente</option>
          <option>Préparée</option>
          <option>Livrée</option>
        </select>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => onView(order)}>
            Voir
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm("Supprimer la commande ?")) onDelete(order.id);
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
