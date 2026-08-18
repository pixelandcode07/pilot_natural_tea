import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { updateOrderController, deleteOrderController } from "@/modules/order/order.controller";

// 📌 Update Order Status (Admin Panel)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  return updateOrderController(req, id);
}

// 📌 Delete Order (Admin Panel)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  return deleteOrderController(id);
}