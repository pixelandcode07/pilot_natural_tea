import mongoose, { Schema } from "mongoose";
import { IBanner } from "./banner.interface";

const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, trim: true },
    link: { type: String, trim: true },
    image: { type: String, required: true },
    position: { 
      type: String, 
      enum: ["Hero", "Promo"], 
      default: "Hero" 
    },
    status: { 
      type: String, 
      enum: ["Active", "Inactive"], 
      default: "Active" 
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.models.Banner || mongoose.model<IBanner>("Banner", bannerSchema);