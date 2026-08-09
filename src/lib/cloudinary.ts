import { v2 as cloudinary } from 'cloudinary';

// Cloudinary কনফিগারেশন
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ফাইল আপলোডের হেল্পার ফাংশন
export const uploadToCloudinary = async (file: File, folder: string = "pilot-natural/categories"): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url as string);
        }
      }
    );
    // বাফার স্ট্রিমটি ক্লাউডিনারিতে পাঠানো হচ্ছে
    uploadStream.end(bytes);
  });
};

export default cloudinary;