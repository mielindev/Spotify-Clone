import StatsCard from "@/layouts/main/_components/StatsCard";
import useMusicStore from "@/store/useMusicStore";
import { Library, ListMusic, PlayCircle, User2 } from "lucide-react";

const DashboardStats = () => {
  const { stats } = useMusicStore();
  const statsData = [
    {
      icon: ListMusic,
      label: "Total Tracks",
      value: stats?.totalTracks.toString(),
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: "Total Albums",
      value: stats?.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: User2,
      label: "Total Artists",
      value: stats?.totalArtists.toString(),
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: PlayCircle,
      label: "Total Users",
      value: stats?.totalUsers.toString(),
      bgColor: "bg-sky-500/10",
      iconColor: "text-sky-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stats) => (
        <StatsCard
          key={stats.label}
          icon={stats.icon}
          label={stats.label}
          value={stats.value}
          bgColor={stats.bgColor}
          iconColor={stats.iconColor}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
