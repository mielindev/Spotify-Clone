import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import useMusicStore from "@/store/useMusicStore";
import { formatDuration, getAudioDuration } from "@/utils";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewTrack {
  title: string;
  artist: string;
  album: string;
  duration: string;
}

const AddTrackModal = () => {
  const { albums } = useMusicStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newTrack, setNewTrack] = useState<NewTrack>({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  });

  const [fileTrack, setFileTrack] = useState<{
    audioUrl: File | null;
    imageUrl: File | null;
  }>({
    audioUrl: null,
    imageUrl: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", newTrack.title);
      formData.append("artist", newTrack.artist);
      if (newTrack.album !== "") formData.append("album", newTrack.album);
      formData.append("duration", newTrack.duration);
      formData.append("audioUrl", fileTrack.audioUrl!);
      formData.append("imageUrl", fileTrack.imageUrl!);

      await axiosInstance.post("/admin/tracks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewTrack({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      });

      setFileTrack({
        audioUrl: null,
        imageUrl: null,
      });

      toast.success("Track added successfully");
    } catch (error: any) {
      toast.error("Failed to add track" + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <Plus className="size-4" />
        <p className="text-md font-bold">Add Track</p>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto ">
        <DialogHeader>
          <DialogTitle>Add New Track</DialogTitle>
          <DialogDescription>
            Add a new track to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const duration = await getAudioDuration(file);

              setFileTrack((prev) => ({
                ...prev,
                audioUrl: file,
              }));

              setNewTrack((prev) => ({
                ...prev,
                duration: duration.toString(),
              }));
            }}
          />

          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageInputRef}
            onChange={(e) =>
              setFileTrack((prev) => ({
                ...prev,
                imageUrl: e.target.files![0],
              }))
            }
          />

          {/* Upload Image Area */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {fileTrack.imageUrl ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500 font-bold">
                    Image selected:{" "}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {fileTrack.imageUrl.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-600 rounded-full inline-block mb-2">
                    <Upload className={"size-6 text-zinc-400"} />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload Artwork
                  </div>
                  <Button className="text-xs" variant={"outline"} size={"sm"}>
                    Choose a file
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Upload Audio Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio Track</label>
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => audioInputRef.current?.click()}
              >
                {fileTrack.audioUrl
                  ? fileTrack.audioUrl.name.slice(0, 20)
                  : "Choose a file"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              type="text"
              placeholder="Enter track title"
              value={newTrack.title}
              onChange={(e) =>
                setNewTrack({ ...newTrack, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              className="bg-zinc-800 border-zinc-700"
              type="text"
              placeholder="Enter artist name"
              value={newTrack.artist}
              onChange={(e) =>
                setNewTrack({ ...newTrack, artist: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <Input
              disabled
              className="bg-zinc-800 border-zinc-700"
              type="text"
              placeholder="Duration in seconds"
              value={
                newTrack.duration
                  ? formatDuration(parseInt(newTrack.duration))
                  : 0
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              value={newTrack.album}
              onValueChange={(value) =>
                setNewTrack((prev) => ({ ...prev, album: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an album" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Album</SelectLabel>
                  {albums.map((album) => (
                    <SelectItem key={album._id} value={album._id}>
                      {album.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </DialogClose>
          <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTrackModal;
