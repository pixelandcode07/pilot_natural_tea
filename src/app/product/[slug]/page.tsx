"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Star, Home, ChevronRight, Loader2, Minus, Plus, Zap } from "lucide-react";

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  currentPrice: number;
  oldPrice?: number;
  category: { _id: string; name: string };
  image: string;
  gallery: string[];
  stock: number;
  badge?: string;
  badgeType?: "orange" | "green";
}

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/v1/product/slug/${slug}`);
        const data = await res.json();
        
        if (data.success && data.data) {
          setProduct(data.data);
          setSelectedImage(data.data.image);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // 📌 Add to Cart Function
  const addToCart = () => {
    if (!product) return;
    
    // লোকাল স্টোরেজ থেকে আগের কার্ট ডাটা নেওয়া
    const cart = JSON.parse(localStorage.getItem("pilot_cart") || "[]");
    
    // চেক করা এই প্রোডাক্ট আগে থেকেই কার্টে আছে কি না
    const existingItem = cart.find((item: any) => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem("pilot_cart", JSON.stringify(cart));
    alert("Product added to cart successfully!");
    // Optional: Dispatch a custom event to update Navbar cart counter dynamically
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 📌 Buy Now Function (Add to cart & redirect to checkout)
  const buyNow = () => {
    if (!product) return;
    addToCart();
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-[#F9F9F9]">
        <Loader2 className="w-10 h-10 animate-spin text-[#F58634]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-[#F9F9F9]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <Link href="/" className="bg-[#1E5E3A] text-white px-6 py-2 rounded-lg font-medium mt-4">Go Back Home</Link>
      </div>
    );
  }

  const allImages = [product.image, ...(product.gallery || [])];

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto py-4">
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#F58634] flex items-center gap-1"><Home className="w-4 h-4" /> Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href={`#${product.category?.name}`} className="hover:text-[#F58634] transition-colors">{product.category?.name}</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-800 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square bg-[#F4F7FC] rounded-xl border border-gray-100 flex items-center justify-center p-6">
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-md z-10 shadow-sm ${product.badgeType === "green" ? "bg-[#00B853]" : "bg-[#F58634]"}`}>
                    {product.badge}
                  </span>
                )}
                <Image src={selectedImage} alt={product.name} fill className="object-contain p-4" priority />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {allImages.map((imgUrl, index) => (
                    <button key={index} onClick={() => setSelectedImage(imgUrl)} className={`relative w-20 h-20 shrink-0 rounded-lg border-2 overflow-hidden flex items-center justify-center bg-gray-50 transition-all ${selectedImage === imgUrl ? "border-[#F58634] opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <Image src={imgUrl} alt={`Thumbnail ${index}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[#F58634]">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 fill-current ${i === 4 ? "text-gray-300" : ""}`} />)}
                </div>
                <span className="text-sm text-gray-500 font-medium">| {product.stock > 0 ? <span className="text-green-600">In Stock ({product.stock})</span> : <span className="text-red-500">Out of Stock</span>}</span>
              </div>

              <div className="flex items-end gap-3 mb-8 pb-6 border-b border-gray-100">
                <span className="text-4xl font-extrabold text-[#1A2B3C]">৳{product.currentPrice.toLocaleString("en-IN")}</span>
                {product.oldPrice && product.oldPrice > product.currentPrice && (
                  <span className="text-xl text-gray-400 font-medium line-through mb-1">৳{product.oldPrice.toLocaleString("en-IN")}</span>
                )}
              </div>

              {/* Quantity and Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 w-full sm:w-36 bg-gray-50">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-[#F58634]"><Minus className="w-5 h-5" /></button>
                  <span className="font-bold text-gray-800 text-lg select-none">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="text-gray-500 hover:text-[#F58634]"><Plus className="w-5 h-5" /></button>
                </div>
                
                <div className="flex-1 flex gap-3">
                  <button 
                    onClick={addToCart}
                    disabled={product.stock <= 0}
                    className="flex-1 bg-white border-2 border-[#F58634] text-[#F58634] rounded-xl py-3.5 font-bold text-[15px] hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={buyNow}
                    disabled={product.stock <= 0}
                    className="flex-1 bg-[#F58634] text-white rounded-xl py-3.5 font-bold text-[15px] hover:bg-[#e0762a] transition-colors flex items-center justify-center gap-2 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Zap className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Product Description</h3>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 p-5 rounded-xl border border-gray-100">
                  {product.description || "No description provided for this product."}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}