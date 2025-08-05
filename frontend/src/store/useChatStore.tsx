import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types";
import { create } from "zustand";
import { io } from "socket.io-client";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  selectedUser: User | null;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];

  getAllUsers: () => Promise<void>;
  initializeSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User) => void;
}

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "/";

const socket = io(baseUrl, {
  autoConnect: false, // only connect when user is logged in
  withCredentials: true,
});

const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  error: null,
  isLoading: false,
  socket: socket,
  selectedUser: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],

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
  initializeSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.emit("user_connected", userId);

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on(
        "activities",
        (activities: [userId: string, activity: string][]) => {
          set({ userActivities: new Map(activities) });
        }
      );

      socket.on("user_connected", (userId: string) => {
        set({
          onlineUsers: new Set([...get().onlineUsers, userId]),
        });
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activities_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnected: true });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },
  sendMessage: (senderId, receiverId, content) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { senderId, receiverId, content });
  },

  getMessages: async (userId: string) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/users/message/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));

export default useChatStore;
