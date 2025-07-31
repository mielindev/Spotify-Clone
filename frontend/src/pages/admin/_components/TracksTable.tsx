import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMusicStore from "@/store/useMusicStore";
import { Loader2, Trash2 } from "lucide-react";

const TracksTable = () => {
  const { tracks, isSongLoading, removeTrack } = useMusicStore();

  if (isSongLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-4 animate-spin" />
        <p className="ml-2 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right w-[80px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracks.map((track) => (
          <TableRow key={track._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={track.imageUrl}
                alt={track.title}
                className="size-16 object-cover rounded"
              />
            </TableCell>
            <TableCell>{track.title}</TableCell>
            <TableCell>{track.artist}</TableCell>
            <TableCell>{track.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size={"sm"}
                className="text-red-500 hover:text-red-400 hover:bg-red-400/10 cursor-pointer"
                onClick={() => removeTrack(track._id)}
              >
                <Trash2 className="size-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TracksTable;
