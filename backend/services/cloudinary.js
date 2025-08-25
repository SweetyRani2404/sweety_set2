import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image, folder = 'blogs') {
  // image can be a temp file path or base64 data URI
  return cloudinary.uploader.upload(image, {
    folder,
    resource_type: 'image',
  });
}

export default cloudinary;
