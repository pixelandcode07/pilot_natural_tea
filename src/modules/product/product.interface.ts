import { Types } from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description?: string;
  currentPrice: number;
  oldPrice?: number;
  category: Types.ObjectId;
  image: string;
  gallery?: string[]; // 📌 Array of image URLs for the gallery
  stock: number;
  isFeatured: boolean;
  badge?: string;
  badgeType?: "orange" | "green" | "combo";
  status: "Active" | "Inactive";
}