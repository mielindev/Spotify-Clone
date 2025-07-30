import usePlayerStore from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevTrackRef = useRef<string | null>(null);

  const { currentTrack, isPlaying, playNext } = usePlayerStore();

  // Handle play and pause of the audio element

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // Handle the track ends
  useEffect(() => {
    const audio = audioRef.current;
    const handleEndedTrack = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEndedTrack);

    return () => audio?.removeEventListener("ended", handleEndedTrack);
  }, [playNext]);

  // Handle the track changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    const audio = audioRef.current;

    // Check if the track has changed
    const isTrackChanged = prevTrackRef.current !== currentTrack?.audioUrl;

    if (isTrackChanged) {
      audio.src = currentTrack?.audioUrl;

      // Reset the audio element
      audio.currentTime = 0;

      prevTrackRef.current = currentTrack?.audioUrl;

      if (isPlaying) audio.play();
    }
  }, [currentTrack, isPlaying]);
  return <audio ref={audioRef} />;
};

export default AudioPlayer;
