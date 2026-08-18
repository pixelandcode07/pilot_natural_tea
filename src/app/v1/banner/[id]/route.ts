import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { updateBannerController, deleteBannerController } from "@/modules/banner/banner.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  return updateBannerController(req, id);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  return deleteBannerController(id);
}