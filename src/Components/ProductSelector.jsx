import { useState } from "react";

export default function ProductSelector({
  products,
  onAdd,
  selected,
  onRemove,
}) {
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [qty, setQty] = useState(1);

  return (
    <div style={{ marginTop: 10 }}>
      <h4>Ajouter un produit</h4>
      <div className="row">
        <select
          className="input"
          value={productId}
          onChange={(e) => setProductId(Number(e.target.value))}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.price} MAD
            </option>
          ))}
        </select>
        <input
          className="input"
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            onAdd(Number(productId), Number(qty));
            setQty(1);
          }}
        >
          Ajouter
        </button>
      </div>

      {selected.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <h5>Produits sélectionnés</h5>
          {selected.map((line) => {
            const prod = products.find((p) => p.id === line.productId);
            return (
              <div key={line.productId} className="product-line">
                <div>
                  {prod.name} x {line.qty}
                </div>
                <div>
                  <button
                    className="btn btn-ghost"
                    onClick={() => onRemove(line.productId)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
