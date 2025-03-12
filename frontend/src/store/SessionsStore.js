import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();
const sessionsStore = create((set) => ({
  sessionHistory: [],
  loading: true,
  getSessions: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/auth/me");
      console.log("Response:", res);

      if (res?.user?.sessionHistory) {
        const sortedSessionHistory = [...res.user.sessionHistory].sort(
          (a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
        );
        set({ sessionHistory: sortedSessionHistory });
      } else {
        console.error("Session history not found in response:", res);
        set({ sessionHistory: [] });
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      set({ sessionHistory: [] });
    } finally {
      set({ loading: false });
    }
  },
}));

export default sessionsStore;
