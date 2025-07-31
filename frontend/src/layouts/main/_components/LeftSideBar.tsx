import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "../_skeletons/PlaylistSkeleton";
import useMusicStore from "@/store/useMusicStore";
import { useEffect } from "react";

const LeftSideBar = () => {
  const { albums, getAllAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    getAllAlbums();
  }, [getAllAlbums]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu */}
      <div className=" rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="size-5 mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="size-5 mr-2" />
              <span className="hidden md:inline">Message</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library Section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-3">
        <div className="flex items-center mb-4">
          <div className="flex items-center text-white px-4">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => {
                return (
                  <Link
                    to={`/album/${album._id}`}
                    key={album._id}
                    className="p-2 rounded-md flex items-center gap-3 group cursor-pointer group-hover:bg-zinc-800"
                  >
                    <img
                      src={album.imageUrl}
                      alt="Playlist"
                      className="size-12 rounded-md flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="font-medium truncate">{album.title}</p>
                      <p className="text-sm text-zinc-400 truncate">
                        Album &bull; {album.artist}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
