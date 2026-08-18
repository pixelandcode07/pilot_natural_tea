import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { updateProductController, deleteProductController } from "@/modules/product/product.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  return updateProductController(req, id);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  return deleteProductController(id);
}