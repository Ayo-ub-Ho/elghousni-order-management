import { useState } from "react";
import ProductSelector from "./ProductSelector.jsx";
import OrderSummary from "./OrderSummary";
import { toTwoDecimals } from "../utils";

export default function OrderForm({ products, onCreate }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState([]); // {productId, qty}

  function handleAddProduct(productId, qty) {
    qty = Number(qty);
    if (!qty || qty <= 0) return;
    setSelected((prev) => {
      const exist = prev.find((p) => p.productId === productId);
      if (exist) {
        return prev.map((p) =>
          p.productId === productId ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { productId, qty }];
    });
  }

  function handleRemove(productId) {
    setSelected((prev) => prev.filter((p) => p.productId !== productId));
  }

  function computeTotal() {
    // calculer produit par produit, arrondir chaque sous-total puis somme
    let total = 0;
    for (const line of selected) {
      const prod = products.find((p) => p.id === line.productId);
      const sub = prod.price * line.qty;
      total += toTwoDecimals(sub);
    }
    return toTwoDecimals(total);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!customerName.trim()) return alert("Nom du client requis");
    if (!selected.length) return alert("Sélectionnez au moins un produit");
    const order = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      lines: selected,
      total: computeTotal(),
      status: "En attente",
    };
    onCreate(order);
    // reset
    setCustomerName("");
    setPhone("");
    setSelected([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <input
          className="input"
          placeholder="Nom du client"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <ProductSelector
        products={products}
        onAdd={handleAddProduct}
        selected={selected}
        onRemove={handleRemove}
      />

      <OrderSummary
        products={products}
        lines={selected}
        total={computeTotal()}
      />

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button type="submit" className="btn btn-primary">
          Valider la commande
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setSelected([]);
          }}
        >
          Réinitialiser
        </button>
      </div>
    </form>
  );
}
