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
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import useMusicStore from "@/store/useMusicStore";
import { Loader2, Plus, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddAlbumModal = () => {
  const { getAllAlbums } = useMusicStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
    }
  };

  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile!);

      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await getAllAlbums();

      toast.success("Album added successfully");
    } catch (error: any) {
      console.log("Error in handleSubmit", error);
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-400 text-white">
          <Plus className="size-4" />
          <p className="text-md font-semibold">Add Album</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Album</DialogTitle>
          <DialogDescription>Add a new album to the library</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={handleSelectedImage}
            hidden
          />

          <div
            className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg border-zinc-700 cursor-pointer"
            onClick={() => imageRef.current?.click()}
          >
            <div className="text-center">
              {imageFile ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500 font-bold">
                    <p>Image Selected: {""}</p>
                  </div>
                  <div className="text-xs text-zinc-400">
                    {imageFile.name.slice(0, 15)}...
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-600 rounded-full inline-block mb-2">
                    <Upload className="size-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload Artwork
                  </div>
                  <Button className="text-xs" variant={"outline"} size={"sm"}>
                    Choose a File
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              type="text"
              placeholder="Enter artist name"
              className="bg-zinc-800 border-zinc-700"
              value={newAlbum.artist}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              type="text"
              placeholder="Enter album title"
              className="bg-zinc-800 border-zinc-700"
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Release Year</label>
            <Input
              type="number"
              placeholder="Enter release year"
              className="bg-zinc-800 border-zinc-700"
              min={1900}
              max={new Date().getFullYear()}
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-violet-500 hover:bg-violet-400 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin size-4" />
                Save
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlbumModal;
