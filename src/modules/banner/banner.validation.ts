import { z } from "zod";

export const BannerValidation = {
  createBannerSchema: z.object({
    title: z.string().optional(),
    link: z.string().optional(),
    position: z.enum(["Hero", "Promo"]).default("Hero"),
    status: z.enum(["Active", "Inactive"]).default("Active"),
  }),

  updateBannerSchema: z.object({
    title: z.string().optional(),
    link: z.string().optional(),
    position: z.enum(["Hero", "Promo"]).optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
  }),
};