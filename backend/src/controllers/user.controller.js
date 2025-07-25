import User from "../models/user.model.js";

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const currentUserId = req.auth.userId;
      const users = await User.find({
        clerkId: { $ne: currentUserId },
      }).sort({ fullName: 1 });

      return res.status(200).json(users);
    } catch (error) {
      console.log("Error in getAllUsers", error);
      next(error);
    }
  },

  //   TODO: get Messages
};

export default userController;
