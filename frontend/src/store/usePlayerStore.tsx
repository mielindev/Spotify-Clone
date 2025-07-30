import type { Track } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  currentIndex: number;

  initializeQueue: (tracks: Track[]) => void;
  playAlbum: (tracks: Track[], startIndex: number) => void;
  setCurrentTrack: (track: Track | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (tracks: Track[]) => {
    set({
      queue: tracks,
      currentTrack: get().currentTrack || tracks[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (tracks: Track[], startIndex = 0) => {
    if (tracks.length === 0) return;

    const track = tracks[startIndex];

    set({
      queue: tracks,
      currentTrack: track,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentTrack: (track: Track | null) => {
    if (!track) return;

    const trackIndex = get().queue.findIndex((t) => t._id === track._id);

    set({
      currentTrack: track,
      currentIndex: trackIndex !== -1 ? trackIndex : get().currentIndex,
      isPlaying: true,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    // if there are more tracks in the queue
    if (nextIndex < queue.length) {
      const nextTrack = queue[nextIndex];
      set({
        currentTrack: nextTrack,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({
        isPlaying: false,
      });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    // if there are more tracks in the queue
    if (prevIndex >= 0) {
      const prevTrack = queue[prevIndex];
      set({
        currentTrack: prevTrack,
        currentIndex: prevIndex,
        isPlaying: true,
      });
    } else {
      set({
        isPlaying: false,
      });
    }
  },
}));

export default usePlayerStore;
