import { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import FilterBar from "./FilterBar";
import "../styles/App.css";
import products from "../data/products";

const STORAGE_KEY = "elghousni_orders_v1";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Toutes");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  function addOrder(order) {
    // ajoute id et date
    const newOrder = {
      ...order,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  function deleteOrder(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="container">
      <div>
        <div className="card order-form">
          <h2>Nouvelle commande</h2>
          <OrderForm products={products} onCreate={addOrder} />
        </div>

        <div style={{ marginTop: 16 }} className="card">
          <h3>Filtre & Statistiques</h3>
          <FilterBar filter={filter} setFilter={setFilter} orders={orders} />
        </div>
      </div>

      <div className="card">
        <h2>Toutes les commandes</h2>
        <OrderList
          orders={orders}
          filter={filter}
          onChangeStatus={updateOrderStatus}
          onDelete={deleteOrder}
        />
      </div>
    </div>
  );
}
