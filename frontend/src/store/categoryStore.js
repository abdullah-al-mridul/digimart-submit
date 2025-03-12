import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();
const categoryStore = create((set) => ({
  data: {},
  loading: true,
  getCategory: async (id) => {
    set({
      loading: true,
    });
    try {
      const category = await api.get(`/categories/${id}`);
      set({
        data: category,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
export default categoryStore;
