import { create } from "zustand";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
const api = useApi();
const wishlistStore = create((set) => ({
  wishlist: [],
  loading: true,
  getWishlist: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/wishlist");
      set({ wishlist: res.wishlist });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  addToWishlist: async (productId) => {
    try {
      const res = await toast.promise(api.post(`/wishlist/${productId}`), {
        loading: "Adding to wishlist...",
        success: "Added to wishlist successfully!",
        error: "Failed to add to wishlist.",
      });
      set({ wishlist: res.wishlist });
    } catch (error) {
      console.log(error);
    }
  },
  deleteFromWishlist: async (productId) => {
    try {
      const res = await toast.promise(api.delete(`/wishlist/${productId}`), {
        loading: "Removing from wishlist...",
        success: "Removed from wishlist successfully!",
        error: "Failed to remove from wishlist.",
      });
      set({ wishlist: res.wishlist });
    } catch (error) {
      console.log(error);
    }
  },
}));
export default wishlistStore;
