import TopBar from "@/components/TopBar";
import useMusicStore from "@/store/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./_components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./_components/SectionGrid";
import usePlayerStore from "@/store/usePlayerStore";

const HomePage = () => {
  const {
    getFeaturedTracks,
    getMadeForYouTracks,
    getTrendingTracks,
    featuredTracks,
    madeForYouTracks,
    trendingTracks,
    isLoading,
    error,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    getFeaturedTracks();
    getMadeForYouTracks();
    getTrendingTracks();
  }, [getFeaturedTracks, getMadeForYouTracks, getTrendingTracks]);

  useEffect(() => {
    const tracks = [...featuredTracks, ...madeForYouTracks, ...trendingTracks];
    initializeQueue(tracks);
  }, [initializeQueue, featuredTracks, madeForYouTracks, trendingTracks]);
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeaturedSection
            isLoading={isLoading}
            featuredTracks={featuredTracks}
            error={error}
          />

          <div className="space-y-8">
            <SectionGrid
              title={"Make For You"}
              tracks={madeForYouTracks}
              isLoading={isLoading}
            />
            <SectionGrid
              title={"Trending"}
              tracks={trendingTracks}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
