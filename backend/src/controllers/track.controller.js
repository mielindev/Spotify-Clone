import Track from "../models/track.model.js";

const trackController = {
  getAllTracks: async (req, res, next) => {
    try {
      const tracks = await Track.find().sort({ createdAt: -1 });
      return res.status(200).json(tracks);
    } catch (error) {
      console.log("Error in getAllTracks", error);
      next(error);
    }
  },

  getFeaturedTracks: async (req, res, next) => {
    try {
      const tracks = await Track.aggregate([
        {
          $sample: {
            size: 6,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);

      return res.status(200).json(tracks);
    } catch (error) {
      console.log("Error in getFeaturedTracks", error);
      next(error);
    }
  },

  getMadeForYouTracks: async (req, res, next) => {
    try {
      const tracks = await Track.aggregate([
        {
          $sample: {
            size: 4,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);

      return res.status(200).json(tracks);
    } catch (error) {
      console.log("Error in getFeaturedTracks", error);
      next(error);
    }
  },

  getTrendingTracks: async (req, res, next) => {
    try {
      const tracks = await Track.aggregate([
        {
          $sample: {
            size: 4,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);

      return res.status(200).json(tracks);
    } catch (error) {
      console.log("Error in getFeaturedTracks", error);
      next(error);
    }
  },
};

export default trackController;
