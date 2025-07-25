import Track from "../models/track.model.js";
import User from "../models/user.model.js";
import Album from "./../models/album.model.js";

const statController = {
  getStats: async (req, res, next) => {
    try {
      const [totalTracks, totalUsers, totalAlbums, totalArtists] =
        await Promise.all([
          Track.countDocuments(),
          User.countDocuments(),
          Album.countDocuments(),
          Track.aggregate([
            {
              $unionWith: {
                coll: "Album",
                pipeline: [],
              },
            },
            {
              $group: {
                _id: "$artist",
              },
            },
            {
              $count: "totalArtists",
            },
          ]),
        ]);
      return res
        .status(200)
        .json({
          totalTracks,
          totalUsers,
          totalAlbums,
          totalArtists: totalArtists[0]?.totalArtists || 0,
        });
    } catch (error) {
      console.log("Error in getStats", error);
      next(error);
    }
  },
};

export default statController;
