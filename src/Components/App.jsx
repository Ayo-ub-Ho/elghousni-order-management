import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { useState } from "react";
import Header from "./Components/Heder";
import Sidebar from "./Components/Sidebar";
import OrderForm from "./Components/OrderForm";
import OrderSummary from "./Components/OrderSummary";

function App() {
  const [currentPage, setCurrentPage] = useState("nouvelle");
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddOrder = (order) => {
    setOrders([...orders, order]);
    setTotal(total + order.subtotal);
  };

  return (
    <div className="App">
      <div className="header-sidebar">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>

      {/* Contenu principal */}
      <main
        className="p-4"
        style={{ marginLeft: "260px", marginTop: "90px", minHeight: "100vh" }}
      >
        {currentPage === "nouvelle" && (
          <>
            <h3 className="mb-3 text-success"> Nouvelle commande</h3>
            <OrderForm onAddOrder={handleAddOrder} />
            <OrderSummary total={total} />
          </>
        )}

        {currentPage === "liste" && (
          <>
            <h3 className="mb-3 text-success">📋 Liste des commandes</h3>
            <ul className="list-group">
              {orders.map((order) => (
                <li key={order.id} className="list-group-item">
                  <strong>{order.clientName}</strong> — {order.productName} x{" "}
                  {order.quantity} = {order.subtotal} DH
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
