import { axiosInstance } from "@/lib/axios";
import type { Album, Track } from "@/types";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  getAllAlbums: () => Promise<void>;
  getAlbumById: (albumId: string) => Promise<void>;
}

const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  tracks: [],
  isLoading: false,
  currentAlbum: null,
  error: null,

  getAllAlbums: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/albums");

      set({ albums: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  getAlbumById: async (albumId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/albums/${albumId}`);
      set({ currentAlbum: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMusicStore;
