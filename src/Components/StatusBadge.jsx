export default function StatusBadge({ status }) {
  const cls =
    status === "En attente"
      ? "status-pending"
      : status === "Préparée"
      ? "status-prepared"
      : "status-delivered";
  return <span className={`status-badge ${cls}`}>{status}</span>;
}
