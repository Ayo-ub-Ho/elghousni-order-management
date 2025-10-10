import { products } from "../data/products";

export default function ProductSelector({ selectedProduct, onChange }) {
  return (
    <select value={selectedProduct} onChange={onChange}>
      <option value="">-- Sélectionner un produit --</option>
      {products.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name} – {p.price} DH / {p.unit}
        </option>
      ))}
    </select>
  );
}
