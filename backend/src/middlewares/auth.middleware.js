import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - You are not logged in" });
  }

  next();
};

export const protectAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;

    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "Unauthorized - You are not an admin" });
    }
    next();
  } catch (error) {
    console.log("Error in protectAdmin", error);
    return res.status(500).json({ message: "Internal Server Error ", error });
  }
};
