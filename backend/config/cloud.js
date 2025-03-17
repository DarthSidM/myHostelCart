import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    console.log("file uploaded!");
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
const deleteFile = async (imageUrl) => {
  try {
      if (!imageUrl) throw new Error("No image URL provided");

      const publicId = getPublicIdFromUrl(imageUrl); // Extract public ID
      if (!publicId) throw new Error("Invalid Cloudinary URL format");

      const result = await cloudinary.uploader.destroy(publicId);
      return result;
  } catch (error) {
      console.error("Error deleting file from Cloudinary:", error);
      throw error; // Re-throw to handle in calling function
  }
};
const getPublicIdFromUrl = (url) => {
  try {
      const parts = url.split("/");
      return parts[parts.length - 1].split(".")[0]; // Extracts the public ID
  } catch (error) {
      console.error("Error extracting public ID from URL:", error);
      return null;
  }
};
export { uploadImage,deleteFile }; // ✅ Correct ES Module export
