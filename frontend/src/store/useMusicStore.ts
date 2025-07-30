import { axiosInstance } from "@/lib/axios";
import type { Album, Track } from "@/types";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredTracks: Track[];
  madeForYouTracks: Track[];
  trendingTracks: Track[];

  getAllAlbums: () => Promise<void>;
  getAlbumById: (albumId: string) => Promise<void>;
  getFeaturedTracks: () => Promise<void>;
  getMadeForYouTracks: () => Promise<void>;
  getTrendingTracks: () => Promise<void>;
}

const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  tracks: [],
  isLoading: false,
  currentAlbum: null,
  error: null,
  featuredTracks: [],
  madeForYouTracks: [],
  trendingTracks: [],

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
  getFeaturedTracks: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/tracks/featured");
      set({ featuredTracks: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getMadeForYouTracks: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/tracks/made-for-you");
      set({ madeForYouTracks: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getTrendingTracks: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/tracks/trending");
      set({ trendingTracks: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMusicStore;
