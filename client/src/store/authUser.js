import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "https://movidbapi.onrender.com/api/v1/auth/signup",
        credentials
      );

      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      set({ isSigningUp: false, user: null });
    }
  },
  login: async () => {},
  logout: async () => {},
  authCheck: async () => {},
}));
