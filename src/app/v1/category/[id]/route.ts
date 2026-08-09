import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/modules/category/category.model";
import { uploadToCloudinary } from "@/lib/cloudinary";

// 📌 ১. ক্যাটাগরি আপডেট করা (PATCH) - ইমেজ আপলোডসহ
export async function PATCH(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // ✅ Next.js 15+ নিয়মে params এখন Promise, তাই await করতে হবে
    const { id } = await params;

    // FormData রিসিভ করা হচ্ছে
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const status = formData.get("status") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    const iconFile = formData.get("icon") as File | null;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: "Name and Slug are required!" }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found!" }, { status: 404 });
    }

    let iconUrl = category.icon; // আগের ছবি ডিফল্ট থাকবে

    // নতুন ছবি আপলোড করলে ক্লাউডিনারিতে আপডেট হবে
    if (iconFile && iconFile.size > 0) {
      iconUrl = await uploadToCloudinary(iconFile, "pilot-natural/categories");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        icon: iconUrl,
        isFeatured,
        status: status || "Active"
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: "Category updated successfully!", data: updatedCategory },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Category Update Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// 📌 ২. ক্যাটাগরি ডিলিট করা (DELETE)
export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // ✅ এখানেও await করা হয়েছে
    const { id } = await params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ success: false, message: "Category not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Category deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Category Delete Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}