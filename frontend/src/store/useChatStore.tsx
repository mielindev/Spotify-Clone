import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types";
import { create } from "zustand";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  getAllUsers: () => Promise<void>;
}

const useChatStore = create<ChatStore>((set) => ({
  users: [],
  error: null,
  isLoading: false,
  getAllUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useChatStore;
