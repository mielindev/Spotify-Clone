import User from "../models/user.model.js";

const authController = {
  authCallback: async (req, res, next) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;

      const user = await User.findOne({ clerkId: id });

      if (!user) {
        await User.create({
          fullName: `${firstName || ""} ${lastName || ""}`,
          imageUrl,
          clerkId: id,
        });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log("Error in authCallback", error);
      next(error);
    }
  },
};

export default authController;
