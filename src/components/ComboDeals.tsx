"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShoppingCart } from "lucide-react";

// Product Interface
interface IProduct {
  _id: string;
  name: string;
  slug: string;
  currentPrice: number;
  oldPrice?: number;
  image: string;
  category?: { _id: string; name: string };
  badge?: string;
  status: string;
}

export default function ComboDeals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  
  const [combos, setCombos] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 📌 Fetch Combo Products from API
  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await fetch("/v1/product");
        const data = await res.json();
        
        if (data.success && data.data) {
          const comboProducts = data.data.filter((p: IProduct) => {
            const nameMatch = p.name?.toLowerCase().includes("combo");
            const catMatch = p.category?.name?.toLowerCase().includes("combo");
            const badgeMatch = p.badge?.toLowerCase().includes("combo");
            
            return p.status === "Active" && (nameMatch || catMatch || badgeMatch);
          });
          
          setCombos(comboProducts);
        }
      } catch (error) {
        console.error("Failed to fetch combo products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    if (scrollLeft < 150) setActiveDot(0);
    else setActiveDot(1);
  };

  const getSavePercentage = (currentPrice: number, oldPrice?: number) => {
    if (!oldPrice || oldPrice <= currentPrice) return null;
    const percent = ((oldPrice - currentPrice) / oldPrice) * 100;
    return `Save ${percent.toFixed(1)}%`;
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
      <div className="w-full bg-[#FEF8F4] py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F58634]" />
      </div>
    );
  }

  if (combos.length === 0) return null;

  return (
    <section className="w-full bg-[#FEF8F4] py-10 transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* === Header Section === */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#F58634] p-1.5 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A2B3C]">
              Exclusive Combo Deals
            </h2>
          </div>

          <Link href="#all-combos" className="bg-[#F58634] hover:bg-[#e0762a] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm">
            View All Combos &rarr;
          </Link>
        </div>

        {/* === Products Slider / Grid === */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth w-full py-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {combos.map((combo) => {
            const savePercent = getSavePercentage(combo.currentPrice, combo.oldPrice);

            return (
              <div key={combo._id} className="bg-white border border-gray-100 rounded-md flex flex-col min-w-[260px] sm:min-w-[280px] max-w-[300px] flex-1 group hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300">
                
                <Link href={`/product/${combo.slug}`} className="relative w-full aspect-[4/3] p-4 flex items-center justify-center bg-white rounded-t-md overflow-hidden block cursor-pointer">
                  {savePercent && <span className="absolute top-0 left-0 bg-[#2ecc71] text-white text-[10px] font-bold px-2 py-1 rounded-br z-10 shadow-sm">{savePercent}</span>}
                  <span className="absolute top-0 right-0 bg-[#F58634] text-white text-[10px] font-bold px-2 py-1 rounded-bl z-10 shadow-sm">Combo Offer</span>
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 mt-4">
                    <Image src={combo.image} alt={combo.name} fill className="object-contain" sizes="(max-w-768px) 260px, 280px" />
                  </div>
                </Link>

                <div className="p-4 pt-2 flex flex-col flex-1">
                  <Link href={`/product/${combo.slug}`}>
                    <h3 className="text-[#2C3E50] text-[15px] font-medium leading-snug mb-3 line-clamp-2 h-11 hover:text-[#F58634] transition-colors cursor-pointer">{combo.name}</h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    <span className="text-[#F58634] font-bold text-lg">৳{combo.currentPrice.toLocaleString('en-IN')}</span>
                    {combo.oldPrice && combo.oldPrice > combo.currentPrice && (
                      <span className="text-gray-400 line-through text-sm">৳{combo.oldPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  {/* 📌 Real Add To Cart Button */}
                  <button 
                    onClick={(e) => handleAddToCart(e, combo)}
                    className="mt-auto w-full bg-[#F58634] hover:bg-[#e0762a] text-white transition-colors duration-300 rounded py-2.5 font-medium text-sm shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-[18px] h-[18px]" />
                    Add To Cart
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* === Slider Dots === */}
        {combos.length > 4 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setActiveDot(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeDot === index ? "bg-[#F58634]" : "border border-[#F58634] bg-transparent"}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}