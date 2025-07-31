import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import usePlayerStore from "@/store/usePlayerStore";
import { formatDuration } from "@/utils";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PlaybackControls = () => {
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { currentTrack, isPlaying, playNext, playPrevious, togglePlay } =
    usePlayerStore();
  console.log("👉 ~ PlaybackControls ~ currentTrack:", currentTrack);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const hanleEndedTrack = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", hanleEndedTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", hanleEndedTrack);
    };
  }, [currentTrack]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Current playing track */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentTrack && (
            <>
              <img
                src={currentTrack.imageUrl}
                alt={currentTrack.title}
                className="size-14"
              />

              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentTrack.title}
                </div>

                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentTrack.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Controls and progress bar */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="size-4" />
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentTrack}
            >
              <SkipBack className="size-4" />
            </Button>
            <Button
              size={"icon"}
              className="bg-white hover:bg-white/80 text-black rounded-full size-8"
              onClick={togglePlay}
              disabled={!currentTrack}
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!currentTrack}
            >
              <SkipForward className="size-4" />
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Repeat className="size-4" />
            </Button>
          </div>
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatDuration(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
              step={1}
            />
            <div className="text-xs text-zinc-400">
              {formatDuration(currentTrack?.duration || 0)}
            </div>
          </div>
        </div>

        {/* Volumn control */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="size-4" />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="size-4" />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:text-white text-zinc-400"
            >
              <Volume1 className="size-4" />
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing bg-green-500"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
