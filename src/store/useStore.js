// src/store/useStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts } from "../data/products";

const STORAGE_KEY = "elghousni_orders_v2";

const useStore = create(
  persist(
    (set, get) => ({
      // État
      orders: [],
      products: initialProducts,

      // Actions pour les commandes
      addOrder: (order) => {
        const newOrder = {
          ...order,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        }));
      },

      getOrderById: (id) => {
        return get().orders.find((o) => o.id === Number(id));
      },

      // Actions pour les produits
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now(),
        };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (id, updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === Number(id));
      },

      // Statistiques
      getStats: () => {
        const orders = get().orders;
        return {
          total: orders.length,
          pending: orders.filter((o) => o.status === "En attente").length,
          prepared: orders.filter((o) => o.status === "Préparée").length,
          delivered: orders.filter((o) => o.status === "Livrée").length,
          totalRevenue: orders
            .filter((o) => o.status === "Livrée")
            .reduce((sum, o) => sum + o.total, 0)
            .toFixed(2),
        };
      },
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useStore;
