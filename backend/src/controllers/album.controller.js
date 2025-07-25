import Album from "../models/album.model.js";

const albumController = {
  getAllAlbums: async (req, res, next) => {
    try {
      const albums = await Album.find().populate("tracks");

      return res.status(200).json(albums);
    } catch (error) {
      console.log("Error in getAllAlbums", error);
      next(error);
    }
  },
  getAlbumDetails: async (req, res, next) => {
    try {
      const { albumId } = req.params;

      const album = await Album.findById(albumId).populate("tracks");

      if (!album) {
        return res.status(404).json({ message: "Album not found" });
      }

      return res.status(200).json(album);
    } catch (error) {
      console.log("Error in getAlbumDetails", error);
      next(error);
    }
  },
};

export default albumController;
