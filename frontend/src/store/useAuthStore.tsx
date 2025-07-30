import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkIsAdmin: () => Promise<void>;
  reset: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  checkIsAdmin: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/check");
      set({ isAdmin: res.data.admin });
    } catch (error: any) {
      set({ isAdmin: false, error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));

export default useAuthStore;
