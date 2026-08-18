import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/modules/product/product.model";

// 📌 Get Single Product By Slug (GET)
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    // ক্যাটাগরি পপুলেট করে প্রোডাক্ট ফেচ করা হচ্ছে
    const product = await Product.findOne({ slug, status: "Active" }).populate("category", "name slug");
    
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found!" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}