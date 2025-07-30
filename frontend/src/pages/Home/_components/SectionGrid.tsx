import type { Track } from "@/types";
import SectionGridSkeleton from "../_skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";

type SectionGridProps = {
  title: string;
  tracks: Track[];
  isLoading: boolean;
};
const SectionGrid = ({ title, tracks, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
        <Button
          variant={"link"}
          className="text-sm text-zinc-400 hover:text-white cursor-pointer"
        >
          See all
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((track) => (
          <div
            key={track._id}
            className="relative bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="size-full object-cover transition-transform duration-300 group hover:scale-105"
                />
              </div>
            </div>
            <h3 className="font-medium mb-2 truncate">{track.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{track.artist}</p>
            <PlayButton track={track} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
