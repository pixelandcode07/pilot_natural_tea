import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      trim: true
    },
    icon: { 
      type: String,
      default: "" // ডিফল্টভাবে ফাঁকা থাকবে
    },
    isFeatured: { 
      type: Boolean, 
      default: false // ডিফল্টভাবে Featured হবে না
    },
    status: { 
      type: String, 
      enum: ["Active", "Inactive"], 
      default: "Active" 
    },
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);