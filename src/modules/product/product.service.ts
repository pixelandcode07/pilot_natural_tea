import { Product } from "./product.model";
import { uploadToCloudinary } from "@/lib/cloudinary";

const createProduct = async (payload: any, imageFile: File, galleryFiles: File[]) => {
  const existingProduct = await Product.findOne({ slug: payload.slug });
  if (existingProduct) throw new Error("Slug already exists!");

  // মেইন ইমেজ আপলোড
  const imageUrl = await uploadToCloudinary(imageFile, "pilot-natural/products");
  payload.image = imageUrl;

  // 📌 গ্যালারি ইমেজ আপলোড
  let galleryUrls: string[] = [];
  if (galleryFiles && galleryFiles.length > 0) {
    galleryUrls = await Promise.all(
      galleryFiles.map((file) => uploadToCloudinary(file, "pilot-natural/products/gallery"))
    );
  }
  payload.gallery = galleryUrls; // গ্যালারির URL গুলো পে-লোডে যোগ করা হলো
  
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find({}).populate("category", "name slug").sort({ createdAt: -1 });
  return result;
};

const updateProduct = async (id: string, payload: any, imageFile: File | null, galleryFiles: File[]) => {
  if (payload.slug) {
    const existingProduct = await Product.findOne({ slug: payload.slug, _id: { $ne: id } });
    if (existingProduct) throw new Error("Slug already in use by another product!");
  }

  if (imageFile && imageFile.size > 0) {
    const imageUrl = await uploadToCloudinary(imageFile, "pilot-natural/products");
    payload.image = imageUrl;
  }

  // 📌 গ্যালারি আপডেট
  let finalGallery = payload.existingGallery || [];
  if (galleryFiles && galleryFiles.length > 0) {
    const newUrls = await Promise.all(
      galleryFiles.map((file) => uploadToCloudinary(file, "pilot-natural/products/gallery"))
    );
    finalGallery = [...finalGallery, ...newUrls];
  }
  payload.gallery = finalGallery;

  const result = await Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  if (!result) throw new Error("Product not found");
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) throw new Error("Product not found");
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};