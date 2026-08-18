import { NextRequest, NextResponse } from "next/server";
import { BannerService } from "./banner.service";
import { BannerValidation } from "./banner.validation";

export const createBannerController = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || imageFile.size === 0) {
      throw new Error("Banner image is required");
    }

    const rawData = {
      title: formData.get("title") || "",
      link: formData.get("link") || "",
      position: formData.get("position") || "Hero",
      status: formData.get("status") || "Active",
    };

    const validatedData = BannerValidation.createBannerSchema.parse(rawData);
    const newBanner = await BannerService.createBanner(validatedData, imageFile);

    return NextResponse.json({ success: true, message: "Banner created successfully", data: newBanner }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

export const getAllBannersController = async () => {
  try {
    const banners = await BannerService.getAllBanners();
    return NextResponse.json({ success: true, data: banners }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const updateBannerController = async (req: NextRequest, id: string) => {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    const rawData: any = {};
    if (formData.has("title")) rawData.title = formData.get("title");
    if (formData.has("link")) rawData.link = formData.get("link");
    if (formData.has("position")) rawData.position = formData.get("position");
    if (formData.has("status")) rawData.status = formData.get("status");

    const validatedData = BannerValidation.updateBannerSchema.parse(rawData);
    const updatedBanner = await BannerService.updateBanner(id, validatedData, imageFile);

    return NextResponse.json({ success: true, message: "Banner updated successfully", data: updatedBanner }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

export const deleteBannerController = async (id: string) => {
  try {
    await BannerService.deleteBanner(id);
    return NextResponse.json({ success: true, message: "Banner deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};