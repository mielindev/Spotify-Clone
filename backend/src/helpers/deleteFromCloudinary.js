import cloudinary from "../libs/cloudinary.js";
import { extractPublicId } from "./extractPublicId.js";

export const deleteFromCloudinary = async (url, resourceType) => {
  try {
    if (!url) {
      throw new Error("No url provided");
    }
    const publicId = extractPublicId(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
    }
  } catch (error) {
    console.log("Error in deleteFromCloudinary", error);
    throw new Error("Error deleting file from Cloudinary");
  }
};
