import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumTable from "./AlbumTable";
import AddAlbumModal from "./AddAlbumModal";

const AlbumsTabContent = () => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="size-5 text-emerald-500" />
              <p>Albums Library</p>
            </CardTitle>
            <CardDescription>Manage your music catalog</CardDescription>
          </div>

          <AddAlbumModal />
        </div>
      </CardHeader>
      <CardContent>
        <AlbumTable />
      </CardContent>
    </Card>
  );
};

export default AlbumsTabContent;
