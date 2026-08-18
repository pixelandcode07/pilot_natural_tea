import { z } from "zod";

export const ProductValidation = {
  createProductSchema: z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
    currentPrice: z.number().positive("Current price must be positive"),
    oldPrice: z.number().optional(),
    category: z.string().min(1, "Category ID is required"),
    stock: z.number().int().nonnegative().default(0),
    isFeatured: z.boolean().default(false),
    badge: z.string().optional(),
    badgeType: z.enum(["orange", "green"]).optional(),
    status: z.enum(["Active", "Inactive"]).default("Active"),
    gallery: z.array(z.string()).optional(), // 📌
    existingGallery: z.array(z.string()).optional(),
  }),

  updateProductSchema: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    currentPrice: z.number().positive().optional(),
    oldPrice: z.number().optional(),
    category: z.string().optional(),
    stock: z.number().int().nonnegative().optional(),
    isFeatured: z.boolean().optional(),
    badge: z.string().optional(),
    badgeType: z.enum(["orange", "green"]).optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
    gallery: z.array(z.string()).optional(), // 📌
    existingGallery: z.array(z.string()).optional(), 
  }),
};