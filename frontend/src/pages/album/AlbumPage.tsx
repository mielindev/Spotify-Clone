import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMusicStore from "@/store/useMusicStore";
import usePlayerStore from "@/store/usePlayerStore";
import { formatDuration } from "@/utils";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { getAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentTrack, isPlaying, playAlbum, togglePlay } = usePlayerStore();
  useEffect(() => {
    if (albumId) getAlbumById(albumId);
  }, [albumId, getAlbumById]);

  if (isLoading) return <div>Loading...</div>;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentTrackPlaying = currentAlbum?.tracks.some(
      (t) => t._id === currentTrack?._id
    );

    if (isCurrentTrackPlaying) togglePlay();
    else {
      playAlbum(currentAlbum?.tracks, 0);
    }
  };

  const handlePlayTrack = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.tracks, index);
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-screen">
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="size-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h2 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>&bull; {currentAlbum?.tracks.length} songs</span>
                  <span>&bull; {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size={"icon"}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.tracks.some(
                  (t) => t._id === currentTrack?._id
                ) ? (
                  <Pause className="w-7 h-7 text-black" />
                ) : (
                  <Play className="w-7 h-7 text-black" />
                )}
              </Button>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm mx-2 rounded-md">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              {/* songs list */}
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.tracks.map((track, idx) => {
                    const isCurrentTrack = currentTrack?._id === track._id;
                    return (
                      <div
                        onClick={() => handlePlayTrack(idx)}
                        key={track._id}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-white/5 rounded-md group cursor-pointer hover:bg-zinc-900/70"
                      >
                        <div className="flex items-center justify-start">
                          {isCurrentTrack && isPlaying ? (
                            <div className="text-md text-green-500">
                              &#9835;
                            </div>
                          ) : (
                            <>
                              <span className="group-hover:hidden">
                                {idx + 1}
                              </span>
                              <Play className="w-4 h-4 hidden group-hover:block" />
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={track.imageUrl}
                            alt={track.title}
                            className="size-10"
                          />

                          <div>
                            <div className="font-medium text-white">
                              {track.title}
                            </div>
                            <div>{track.artist}</div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {track.createdAt.split("T")[0]}
                        </div>

                        <div className="flex items-center">
                          {formatDuration(track.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
