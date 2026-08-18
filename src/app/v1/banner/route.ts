import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { createBannerController, getAllBannersController } from "@/modules/banner/banner.controller";

export async function POST(req: NextRequest) {
  await connectDB();
  return createBannerController(req);
}

export async function GET() {
  await connectDB();
  return getAllBannersController();
}