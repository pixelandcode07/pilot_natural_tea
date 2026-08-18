import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { createProductController, getAllProductsController } from "@/modules/product/product.controller";

export async function POST(req: NextRequest) {
  await connectDB();
  return createProductController(req);
}

export async function GET() {
  await connectDB();
  return getAllProductsController();
}