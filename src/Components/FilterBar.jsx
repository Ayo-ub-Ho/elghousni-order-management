export default function FilterBar({ filter, setFilter, orders }) {
  const counts = {
    Toutes: orders.length,
    "En attente": orders.filter((o) => o.status === "En attente").length,
    Préparée: orders.filter((o) => o.status === "Préparée").length,
    Livrée: orders.filter((o) => o.status === "Livrée").length,
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {["Toutes", "En attente", "Préparée", "Livrée"].map((f) => (
        <button
          key={f}
          className={`btn ${filter === f ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setFilter(f)}
        >
          {f} ({counts[f]})
        </button>
      ))}
    </div>
  );
}
