import { useState } from "react";
import ProductSelector from "./ProductSelector";
import { products } from "../data/products";

export default function OrderForm({ onAddOrder }) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientName || !phone || !selectedProduct) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const product = products.find((p) => p.id === parseInt(selectedProduct));
    const subtotal = product.price * quantity;

    const newOrder = {
      id: Date.now(),
      clientName,
      phone,
      productName: product.name,
      price: product.price,
      quantity,
      subtotal,
    };

    onAddOrder(newOrder);

    // Reset form
    setClientName("");
    setPhone("");
    setSelectedProduct("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <input
        type="text"
        placeholder="Nom du client"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <ProductSelector
        selectedProduct={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      />

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      <button type="submit">Ajouter la commande</button>
    </form>
  );
}
