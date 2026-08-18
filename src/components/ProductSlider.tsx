"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShoppingCart } from "lucide-react";

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  currentPrice: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  badgeType?: "orange" | "green";
  isFeatured: boolean;
  status: string;
}

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 📌 Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/v1/product");
        const data = await res.json();
        if (data.success) {
          const activeProducts = data.data.filter((p: IProduct) => p.status === "Active");
          setProducts(activeProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    if (scrollLeft < 100) setActiveDot(0);
    else if (scrollLeft < 300) setActiveDot(1);
    else if (scrollLeft < 600) setActiveDot(2);
    else setActiveDot(3);
  };

  // 📌 Add to Cart Function
  const handleAddToCart = (e: React.MouseEvent, product: IProduct) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("pilot_cart") || "[]");
    const existingItem = cart.find((item: any) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("pilot_cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (isLoading) {
    return (
      <div className="w-full bg-[#F9F9F9] py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F58634]" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-[#F9F9F9] py-10 transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* Header Section */}
        <div className="flex items-end justify-between border-b border-gray-300 pb-2 mb-6 relative">
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A2B3C]">
              All Natural Products
            </h2>
            <div className="absolute -bottom-[10px] left-0 w-16 h-[4px] bg-[#F58634]"></div>
          </div>
          <Link href="#all-products" className="text-[#F58634] text-xs md:text-sm font-semibold hover:underline flex items-center gap-1 transition-all">
            VIEW ALL ITEMS 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Products Slider / Grid */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth w-full py-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {products.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded flex flex-col min-w-[240px] sm:min-w-[260px] max-w-[310px] flex-1 group hover:shadow-lg transition-shadow duration-300">
              
              <Link href={`/product/${product.slug}`} className="relative w-full aspect-square p-4 flex items-center justify-center bg-white rounded-t block cursor-pointer">
                {product.badge && product.badgeType === "green" && (
                  <span className="absolute top-3 right-3 bg-[#2ecc71] text-white text-[11px] font-bold px-2 py-0.5 rounded z-10 shadow-sm">{product.badge}</span>
                )}
                {product.badge && product.badgeType === "orange" && (
                  <span className="absolute top-3 left-3 bg-[#F58634] text-white text-[11px] font-bold px-2 py-0.5 rounded z-10 shadow-sm">{product.badge}</span>
                )}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  <Image src={product.image} alt={product.name} fill className="object-contain" sizes="(max-w-768px) 240px, 260px" />
                </div>
              </Link>

              <div className="p-4 pt-2 flex flex-col flex-1 border-t border-gray-100">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-[#2C3E50] text-[15px] font-medium leading-tight mb-2 truncate hover:text-[#F58634] transition-colors cursor-pointer">{product.name}</h3>
                </Link>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#F58634] font-bold text-lg">৳{product.currentPrice.toLocaleString('en-IN')}</span>
                  {product.oldPrice && product.oldPrice > 0 && (
                    <span className="text-gray-400 line-through text-sm">৳{product.oldPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* 📌 Real Add To Cart Button */}
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="mt-auto w-full border border-[#F58634] text-[#F58634] hover:bg-[#F58634] hover:text-white transition-colors duration-300 rounded py-2 flex items-center justify-center gap-2 font-medium text-sm"
                >
                  <ShoppingCart className="w-[18px] h-[18px]" />
                  Add To Cart
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Slider Dots */}
        {products.length > 4 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setActiveDot(index)}
                className={`w-2.5 h-2.5 rounded-full border border-[#F58634] transition-all duration-300 ${activeDot === index ? "bg-[#F58634]" : "bg-transparent"}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}