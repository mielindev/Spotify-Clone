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
import { Calendar, Loader2, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumTable = () => {
  const { albums, getAllAlbums, isLoading, removeAlbum } = useMusicStore();

  useEffect(() => {
    getAllAlbums();
  }, [getAllAlbums]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin size-5" />
        Loading...
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableCell>Songs</TableCell>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id}>
            <TableCell>
              <img
                src={album.imageUrl}
                alt={album.title}
                className="size-16 object-cover rounded"
              />
            </TableCell>
            <TableCell className="font-medium">{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <div className="inline-flex items-center gap-2  text-zinc-400">
                <Calendar className="size-4" />
                {album.releaseYear}
              </div>
            </TableCell>
            <TableCell>
              <div className="inline-flex items-center gap-2 text-zinc-400">
                <Music className="size-4" />
                <p> {album.tracks.length} songs</p>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => removeAlbum(album._id)}
                variant={"ghost"}
                size={"sm"}
                className="text-red-500 hover:text-red-400 hover:bg-zinc-400/50 cursor-pointer"
              >
                <Trash2 className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumTable;
