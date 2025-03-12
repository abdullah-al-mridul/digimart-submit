import { create } from "zustand";
import useApi from "../hooks/useApi";

const api = useApi();
const ordersStore = create((set, get) => ({
  orders: [],
  loading: true,
  getOrders: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/orders");
      set({ orders: res.orders });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
export default ordersStore;
