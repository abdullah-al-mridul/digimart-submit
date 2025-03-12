import { create } from "zustand";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
const api = useApi();

const authStore = create((set, get) => ({
  user: null,
  loading: true,
  getUser: async () => {
    set({
      loading: true,
    });
    try {
      const res = await api.get("/auth/me");
      if (res.user) {
        set({ user: res.user });
      }
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },
  register: async (credential) => {
    try {
      const res = await toast.promise(api.post("/auth/register", credential), {
        loading: "Registering...",
        success: "Registered successfully!",
        error: "Failed to register.",
      });
      if (res.user) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async (credential) => {
    set({
      loading: true,
    });
    try {
      const res = await api.post("/auth/login", credential);
      console.log(res);
      if (!res.success === false) {
        set({ user: res.user });
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null });
    } catch (err) {
      console.log(err);
    }
  },
  resendVerificationEmail: async () => {
    try {
      const res = await toast.promise(
        api.post("/auth/send-verification-email"),
        {
          loading: "Resending verification email...",
          success: "Verification email resent successfully!",
          error: "Failed to resend verification email.",
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  verifyEmail: async (code) => {
    try {
      const res = await toast.promise(
        api.post("/auth/verify-email", { code }),
        {
          loading: "Verifying email...",
          success: "Email verified successfully!",
          error: "Failed to verify email.",
        }
      );
      set({ user: { ...get().user, isVerified: true } });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default authStore;
