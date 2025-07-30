import { Button } from "@/components/ui/button";
import usePlayerStore from "@/store/usePlayerStore";
import type { Track } from "@/types";
import { Pause, Play } from "lucide-react";

type PlayButtonProps = { track: Track };

const PlayButton = ({ track }: PlayButtonProps) => {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlay } =
    usePlayerStore();
  const isCurrentTrack = currentTrack?._id === track._id;

  const handlePlayTrack = () => {
    if (isCurrentTrack) togglePlay();
    else setCurrentTrack(track);
  };
  return (
    <Button
      size={"icon"}
      onClick={handlePlayTrack}
      className={`absolute bottom-6 right-3 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentTrack ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentTrack && isPlaying ? (
        <Pause className="size-3 text-black" />
      ) : (
        <Play className="size-3 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;
