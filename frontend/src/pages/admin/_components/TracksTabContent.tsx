import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import TracksTable from "./TracksTable";
import AddTrackModal from "./AddTrackModal";

const TracksTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              <p>Track Library</p>
            </CardTitle>
            <CardDescription>Manage your music catalog</CardDescription>
          </div>

          <AddTrackModal />
        </div>
      </CardHeader>

      <CardContent>
        <TracksTable />
      </CardContent>
    </Card>
  );
};

export default TracksTabContent;
