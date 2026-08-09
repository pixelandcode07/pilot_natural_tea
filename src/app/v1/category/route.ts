import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/modules/category/category.model";
import { uploadToCloudinary } from "@/lib/cloudinary";

// 📌 ১. নতুন ক্যাটাগরি তৈরি (POST)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // ✅ JSON এর বদলে FormData রিসিভ করা হচ্ছে (এরর ফিক্স)
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const status = formData.get("status") as string;
    const isFeatured = formData.get("isFeatured") === "true"; 
    const iconFile = formData.get("icon") as File | null;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: "Name and Slug are required!" }, { status: 400 });
    }

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json({ success: false, message: "Category with this slug already exists!" }, { status: 400 });
    }

    let iconUrl = "";
    // Cloudinary তে ছবি আপলোড
    if (iconFile && iconFile.size > 0) {
      iconUrl = await uploadToCloudinary(iconFile, "pilot-natural/categories");
    }

    const newCategory = await Category.create({
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      icon: iconUrl,
      isFeatured,
      status: status || "Active"
    });

    return NextResponse.json(
      { success: true, message: "Category created successfully!", data: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Category Create Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// 📌 ২. সব ক্যাটাগরি পড়া (GET)
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}