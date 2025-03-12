import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (file, folder = "products") => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      resource_type: "auto",
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image");
  }
};
