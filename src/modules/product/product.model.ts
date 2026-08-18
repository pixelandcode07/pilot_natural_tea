import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    currentPrice: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] }, // 📌 গ্যালারির জন্য Array
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    badge: { type: String, default: "" },
    badgeType: { type: String, enum: ["orange", "green"] },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);