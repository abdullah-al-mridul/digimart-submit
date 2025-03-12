import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();
const store = create((set) => ({
  categories: [],
  categoriesLoading: true,
  products: [],
  productsLoading: true,
  getCategories: async () => {
    set({
      categoriesLoading: true,
    });
    try {
      const categories = await api.get("/categories");
      set({
        categories: categories.categories,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        categoriesLoading: false,
      });
    }
  },
  getProducts: async () => {
    set({
      productsLoading: true,
    });
    try {
      const products = await api.get("/products");
      set({
        products: products.products,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        productsLoading: false,
      });
    }
  },
}));
export default store;
