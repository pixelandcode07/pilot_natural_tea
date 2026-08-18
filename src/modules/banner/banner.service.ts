import { Banner } from "./banner.model";
import { uploadToCloudinary } from "@/lib/cloudinary";

// ক্রিয়েট ব্যানার
const createBanner = async (payload: any, imageFile: File) => {
  const imageUrl = await uploadToCloudinary(imageFile, "pilot-natural/banners");
  payload.image = imageUrl;
  const result = await Banner.create(payload);
  return result;
};

// সব ব্যানার ফেচ
const getAllBanners = async () => {
  const result = await Banner.find({}).sort({ createdAt: -1 });
  return result;
};

// আপডেট ব্যানার
const updateBanner = async (id: string, payload: any, imageFile: File | null) => {
  if (imageFile && imageFile.size > 0) {
    const imageUrl = await uploadToCloudinary(imageFile, "pilot-natural/banners");
    payload.image = imageUrl;
  }

  const result = await Banner.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!result) throw new Error("Banner not found");
  return result;
};

// ডিলিট ব্যানার
const deleteBanner = async (id: string) => {
  const result = await Banner.findByIdAndDelete(id);
  if (!result) throw new Error("Banner not found");
  return result;
};

export const BannerService = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};