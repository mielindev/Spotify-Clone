import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const { userId: currentUserId } = req.auth();
      const users = await User.find({
        clerkId: { $ne: currentUserId },
      }).sort({ fullName: 1 });

      return res.status(200).json(users);
    } catch (error) {
      console.log("Error in getAllUsers", error);
      next(error);
    }
  },

  getMessages: async (req, res) => {
    try {
      const { userId: senderId } = req.auth();
      const { userId: receiverId } = req.params;

      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).sort({ createdAt: 1 });

      return res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages", error);
      next(error);
    }
  },
};

export default userController;
