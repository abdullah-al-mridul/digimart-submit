import { create } from "zustand";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
const api = useApi();
const cartStore = create((set, get) => ({
  cart: [],
  loading: true,
  getCart: async () => {
    set({
      loading: true,
    });
    try {
      const cart = await api.get("/cart");
      set({
        cart: cart.cart,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
  addToCart: async (productId, quantity) => {
    try {
      const res = await toast.promise(
        api.post("/cart", { productId, quantity }),
        {
          loading: "Adding product...",
          success: "Product added successfully!",
          error: "Failed to add product.",
        }
      );
      set({
        cart: [...get().cart, res.product],
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateCart: async (itemId, quantity) => {
    try {
      const res = await toast.promise(
        api.put(`/cart/${itemId}`, { quantity }),
        {
          loading: "Updating product...",
          success: "Product updated successfully!",
          error: "Failed to update product.",
        }
      );

      set({
        cart: res.cart,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteCart: async (itemId) => {
    try {
      const res = await toast.promise(api.delete(`/cart/${itemId}`), {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Failed to delete product.",
      });
      set({
        cart: res.cart,
      });
    } catch (error) {
      console.log(error);
    }
  },
  placeOrder: async (checkoutData) => {
    try {
      const res = await toast.promise(api.post("/orders", checkoutData), {
        loading: "Placing order...",
        success: "Order placed successfully!",
        error: "Failed to place order.",
      });
      set({
        cart: [],
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
export default cartStore;
