import useAuthStore from "@/store/useAuthStore";
import AdminHeader from "./_components/AdminHeader";
import DashboardStats from "./_components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import TracksTabContent from "./_components/TracksTabContent";
import AlbumsTabContent from "./_components/AlbumsTabContent";
import useMusicStore from "@/store/useMusicStore";
import { useEffect } from "react";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  const { getStats, getAllTracks, getAllAlbums } = useMusicStore();

  useEffect(() => {
    getStats();
    getAllTracks();
    getAllAlbums();
  }, [getStats, getAllTracks, getAllAlbums]);

  if (!isLoading && !isAdmin) return <div>Unauthorized Access</div>;
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <AdminHeader />

      <DashboardStats />

      <Tabs defaultValue="tracks" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          <TabsTrigger
            value="tracks"
            className="data-[state=active]:!bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Tracks
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:!bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tracks">
          <TracksTabContent />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
