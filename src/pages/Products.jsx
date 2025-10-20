import { useState } from "react";
import useStore from "../store/useStore";
import "../styles/Products.css";

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const handleSubmit = (product) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, product);
      setEditingProduct(null);
    } else {
      addProduct(product);
    }
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Gestion des Produits</h1>
          <p className="page-subtitle">
            {products.length} produit{products.length !== 1 ? "s" : ""}{" "}
            disponible{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "❌ Annuler" : "➕ Ajouter un Produit"}
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2>{editingProduct ? "Modifier le Produit" : "Nouveau Produit"}</h2>
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Grille de produits */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card card">
            {/* Image du produit */}
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x300/667eea/ffffff?text=Image";
                }}
              />
            </div>

            <div className="product-header">
              <h3>{product.name}</h3>
              <span className="product-category">{product.category}</span>
            </div>

            <div className="product-details">
              <div className="product-price">{product.price} MAD</div>
              <div className="product-unit">par {product.unit}</div>
            </div>

            <div className="product-actions">
              <button
                className="btn btn-ghost"
                onClick={() => handleEdit(product)}
              >
                ✏️ Modifier
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(product.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
            <h3>Aucun produit</h3>
            <p>Commencez par ajouter votre premier produit</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant formulaire de produit
function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "Huiles",
    price: product?.price || "",
    unit: product?.unit || "bouteille",
    image: product?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Le nom du produit est requis");
      return;
    }

    if (!formData.price || formData.price <= 0) {
      alert("Le prix doit être supérieur à 0");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nom du produit *</label>
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Huile d'olive extra vierge"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            name="category"
            className="input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Huiles">Huiles</option>
            <option value="Olives">Olives</option>
            <option value="Tapenade">Tapenade</option>
            <option value="Miel">Miel</option>
            <option value="Produits dérivés">Produits dérivés</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix (MAD) *</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="input"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unité</label>
          <select
            id="unit"
            name="unit"
            className="input"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="bouteille">bouteille</option>
            <option value="bocal">bocal</option>
            <option value="pot">pot</option>
            <option value="pièce">pièce</option>
            <option value="kg">kg</option>
            <option value="litre">litre</option>
          </select>
        </div>

        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="image">URL de l'image</label>
          <input
            id="image"
            name="image"
            type="text"
            className="input"
            value={formData.image}
            onChange={handleChange}
            placeholder="/assets/images/produit.jpg"
          />
          <small
            style={{
              color: "#666",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
              display: "block",
            }}
          >
            Chemin de l'image (ex: /assets/images/huile.jpg)
          </small>
        </div>
      </div>

      {/* Aperçu de l'image */}
      {formData.image && (
        <div className="image-preview">
          <label>Aperçu :</label>
          <img
            src={formData.image}
            alt="Aperçu"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              marginTop: "0.5rem",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {product ? "💾 Enregistrer" : "➕ Ajouter"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}
