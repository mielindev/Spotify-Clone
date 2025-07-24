import cloudinary from "../libs/cloudinary";

export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in handleUploadFile", error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
