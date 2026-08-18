import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "./product.service";
import { ProductValidation } from "./product.validation";

export const createProductController = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;
    const galleryFiles = formData.getAll("gallery") as File[]; 

    console.log(`Received Gallery Images Count: ${galleryFiles.length}`); // 📌 Debug Log

    if (!imageFile || imageFile.size === 0) {
      throw new Error("Main Product image is required");
    }

    const rawData = {
      name: formData.get("name") as string,
      slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, '-'),
      description: formData.get("description") as string || "",
      currentPrice: Number(formData.get("currentPrice")),
      oldPrice: formData.get("oldPrice") ? Number(formData.get("oldPrice")) : undefined,
      category: formData.get("category") as string,
      stock: Number(formData.get("stock")) || 0,
      isFeatured: formData.get("isFeatured") === "true",
      badge: formData.get("badge") as string || "",
      badgeType: formData.get("badgeType") as string || undefined,
      status: formData.get("status") as string || "Active",
    };

    const validatedData = ProductValidation.createProductSchema.parse(rawData);
    
    // সার্ভিস ফাংশনে পাঠানো হচ্ছে
    const newProduct = await ProductService.createProduct(validatedData, imageFile, galleryFiles);

    return NextResponse.json({ success: true, message: "Product created successfully", data: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("Create Product Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

export const getAllProductsController = async () => {
  try {
    const products = await ProductService.getAllProducts();
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const updateProductController = async (req: NextRequest, id: string) => {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;
    
    const galleryFiles = formData.getAll("gallery") as File[]; 
    const existingGalleryRaw = formData.getAll("existingGallery");
    
    let existingGallery = existingGalleryRaw.map(String).filter(Boolean);
    if (existingGallery.length === 1 && existingGallery[0] === "EMPTY_GALLERY_FLAG") {
      existingGallery = [];
    }

    const rawData: any = {};
    if (formData.has("name")) rawData.name = formData.get("name");
    if (formData.has("slug")) rawData.slug = (formData.get("slug") as string).toLowerCase().replace(/\s+/g, '-');
    if (formData.has("description")) rawData.description = formData.get("description");
    if (formData.has("currentPrice")) rawData.currentPrice = Number(formData.get("currentPrice"));
    if (formData.has("oldPrice")) rawData.oldPrice = Number(formData.get("oldPrice"));
    if (formData.has("category")) rawData.category = formData.get("category");
    if (formData.has("stock")) rawData.stock = Number(formData.get("stock"));
    if (formData.has("isFeatured")) rawData.isFeatured = formData.get("isFeatured") === "true";
    if (formData.has("badge")) rawData.badge = formData.get("badge");
    if (formData.has("badgeType")) rawData.badgeType = formData.get("badgeType");
    if (formData.has("status")) rawData.status = formData.get("status");
    
    rawData.existingGallery = existingGallery;

    const validatedData = ProductValidation.updateProductSchema.parse(rawData);
    const updatedProduct = await ProductService.updateProduct(id, validatedData, imageFile, galleryFiles);

    return NextResponse.json({ success: true, message: "Product updated successfully", data: updatedProduct }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};

export const deleteProductController = async (id: string) => {
  try {
    await ProductService.deleteProduct(id);
    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
};