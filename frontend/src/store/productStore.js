import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();

const productStore = create((set) => ({
  product: null,
  loading: true,
  products: [],
  getProduct: async (prodId) => {
    set({ loading: true });
    try {
      const res = await api.get(`/products/${prodId}`);
      const products = await api.get("/products");
      set({
        product: res.product,
        products: products.products,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },
  getProducts: async () => {
    set({ loading: true });
    set({ products: res.products, loading: false });
  },
}));

export default productStore;
