import User from "../models/user.model.js";

const authController = {
  authCallback: async (req, res) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;

      const user = await User.findOne({ clerkId: id });

      if (!user) {
        await User.create({
          fullName: `${firstName} ${lastName}`,
          imageUrl,
          clerkId: id,
        });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log("Error in authCallback", error);
      return res.status(500).json({ message: "Internal Server Error ", error });
    }
  },
};

export default authController;
