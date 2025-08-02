export const extractPublicId = (url) => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/");
    const fileName = parts.pop();

    if (!fileName) return null;

    const publicId = fileName.split(".")[0];

    return publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};
