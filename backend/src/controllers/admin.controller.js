import { uploadToCloudinary } from "../helpers/uploadToCloudinary.js";
import Album from "../models/album.model.js";
import Track from "../models/track.model.js";

const adminController = {
  checkAdmin: async (req, res, next) => {
    return res.status(200).json({ admin: true });
  },
  addTrack: async (req, res, next) => {
    try {
      if (!req.files || !req.files.audioUrl || !req.files.imageUrl) {
        return res
          .status(400)
          .json({ message: "Please upload both audio and image files" });
      }

      const { title, artist, album, duration } = req.body;
      const audioFile = req.files.audioUrl;
      const imageFile = req.files.imageUrl;

      const audioUrl = await uploadToCloudinary(audioFile);
      const imageUrl = await uploadToCloudinary(imageFile);

      const track = new Track({
        title,
        artist,
        imageUrl,
        audioUrl,
        duration,
        album: album || null,
      });

      await track.save();

      if (album) {
        await Album.findByIdAndUpdate(album, {
          $push: { tracks: track._id },
        });
      }
      return res.status(201).json({
        message: "Track added successfully",
        track,
      });
    } catch (error) {
      console.log("Error in addTrack", error);
      next(error);
    }
  },

  deleteTrack: async (req, res, next) => {
    try {
      const { trackId } = req.params;

      const track = await Track.findById(trackId);

      if (track.album) {
        await Album.findByIdAndUpdate(track.album, {
          $push: { tracks: track._id },
        });
      }

      await Track.findByIdAndDelete(trackId);

      return res.status(200).json({ message: "Track deleted successfully" });
    } catch (error) {
      console.log("Error in deleteTrack", error);
      next(error);
    }
  },

  createAlbum: async (req, res, next) => {
    try {
      const { title, artist, releaseYear } = req.body;
      const imageFile = req.files.imageFile;

      const imageUrl = await uploadToCloudinary(imageFile);

      const album = new Album({
        title,
        artist,
        imageUrl,
        releaseYear,
      });

      await album.save();

      return res.status(201).json({
        message: "Album created successfully",
        album,
      });
    } catch (error) {
      console.log("Error in createAlbum", error);
      next(error);
    }
  },

  deleteAlbum: async (req, res, next) => {
    try {
      const { albumId } = req.params;
      await Track.deleteMany({ album: albumId });
      await Album.findByIdAndDelete(albumId);
      return res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
      console.log("Error in deleteAlbum", error);
      next(error);
    }
  },
};

export default adminController;
