// src/app/v1/order/route.ts

export const dynamic = 'force-dynamic'; // 📌 Next.js এর ক্যাশ বন্ধ করার ম্যাজিক লাইন

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { createOrderController, getAllOrdersController } from "@/modules/order/order.controller";

// 📌 Create Order (Checkout Page)
export async function POST(req: NextRequest) {
  await connectDB();
  return createOrderController(req);
}

// 📌 Get All Orders (Admin Panel)
export async function GET() {
  await connectDB();
  return getAllOrdersController();
}