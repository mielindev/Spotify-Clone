import { axiosInstance } from "@/lib/axios";
import type { Album, Stats, Track } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  tracks: Track[];
  isLoading: boolean;
  isSongLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredTracks: Track[];
  madeForYouTracks: Track[];
  trendingTracks: Track[];
  stats: Stats;

  getAllAlbums: () => Promise<void>;
  getAlbumById: (albumId: string) => Promise<void>;
  getFeaturedTracks: () => Promise<void>;
  getMadeForYouTracks: () => Promise<void>;
  getTrendingTracks: () => Promise<void>;
  getStats: () => Promise<void>;
  getAllTracks: () => Promise<void>;
  removeTrack: (trackId: string) => Promise<void>;
  removeAlbum: (albumId: string) => Promise<void>;
}

const useMusicStore = create<MusicStore>((set, get) => ({
  albums: [],
  tracks: [],
  isLoading: false,
  isSongLoading: false,
  currentAlbum: null,
  error: null,
  featuredTracks: [],
  madeForYouTracks: [],
  trendingTracks: [],
  stats: {
    totalTracks: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalUsers: 0,
  },

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
  getStats: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/stats");

      set({ stats: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  getAllTracks: async () => {
    set({ isSongLoading: true });
    try {
      const res = await axiosInstance.get("/tracks");

      set({ tracks: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isSongLoading: false });
    }
  },

  removeTrack: async (trackId) => {
    set({ isSongLoading: true });
    try {
      const res = await axiosInstance.delete(`/admin/tracks/${trackId}`);

      // get stats after removing track
      get().getStats();
      set((state) => ({
        tracks: state.tracks.filter((track) => track._id !== trackId),
      }));
      toast.success(res.data.message || "Track removed successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to remove track");
    } finally {
      set({ isSongLoading: false });
    }
  },

  removeAlbum: async (albumId) => {
    set({ isSongLoading: true });
    try {
      const res = await axiosInstance.delete(`/albums/${albumId}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== albumId),
        tracks: state.tracks.map((track) =>
          track.album === state.albums.find((a) => a._id === albumId)?._id
            ? { ...track, album: null }
            : track
        ),
      }));
      toast.success(res.data.message || "Album removed successfully");
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed to remove album");
    } finally {
      set({ isSongLoading: false });
    }
  },
}));

export default useMusicStore;
