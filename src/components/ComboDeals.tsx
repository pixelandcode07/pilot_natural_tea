"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Green Tea & Black Tea Combo Data
const combos = [
  {
    id: 1,
    name: "Premium Green Tea (250g) & Black Tea (250g) Combo",
    image: "/products/combo1.png", // আপনার কম্বো ইমেজের পাথ
    currentPrice: 450,
    oldPrice: 520,
    savePercent: "Save 13.4%",
  },
  {
    id: 2,
    name: "Detox Green Tea & Slimming Tea Sachet Combo",
    image: "/products/combo2.png",
    currentPrice: 850,
    oldPrice: 960,
    savePercent: "Save 11.4%",
  },
  {
    id: 3,
    name: "Sylhet Black Tea (500g) & Organic Green Tea (250g)",
    image: "/products/combo3.png",
    currentPrice: 700,
    oldPrice: 820,
    savePercent: "Save 14.6%",
  },
  {
    id: 4,
    name: "Family Pack Black Tea (1Kg) & Premium Green Tea",
    image: "/products/combo4.png",
    currentPrice: 1200,
    oldPrice: 1350,
    savePercent: "Save 11.1%",
  },
  {
    id: 5,
    name: "Herbal Masala Tea & Pure Green Tea Sachet Combo",
    image: "/products/combo5.png",
    currentPrice: 650,
    oldPrice: 720,
    savePercent: "Save 9.7%",
  },
];

export default function ComboDeals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Scroll function to update dots visually
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    if (scrollLeft < 150) setActiveDot(0);
    else setActiveDot(1);
  };

  return (
    // Background color matching the warm cream/peach theme in your image
    <section className="w-full bg-[#FEF8F4] py-2 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও ব্যানারের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* === Header Section (Exactly like the image) === */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Title with Gift Icon */}
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

          {/* View All Combos Button */}
          <Link 
            href="#all-combos" 
            className="bg-[#F58634] hover:bg-[#e0762a] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
          >
            View All Combos &rarr;
          </Link>
        </div>

        {/* === Products Slider / Grid === */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth w-full py-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {combos.map((combo) => (
            <div 
              key={combo.id} 
              className="bg-white border border-gray-100 rounded-md flex flex-col min-w-[260px] sm:min-w-[280px] max-w-[300px] flex-1 group hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              
              {/* Product Image & Badges */}
              <div className="relative w-full aspect-[4/3] p-4 flex items-center justify-center bg-white rounded-t-md overflow-hidden">
                
                {/* Save % Badge (Top Left - Green) */}
                <span className="absolute top-0 left-0 bg-[#2ecc71] text-white text-[10px] font-bold px-2 py-1 rounded-br z-10 shadow-sm">
                  {combo.savePercent}
                </span>

                {/* Combo Offer Badge (Top Right - Orange) */}
                <span className="absolute top-0 right-0 bg-[#F58634] text-white text-[10px] font-bold px-2 py-1 rounded-bl z-10 shadow-sm">
                  Combo Offer
                </span>

                {/* Image */}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 mt-4">
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    fill
                    className="object-contain"
                    sizes="(max-w-768px) 260px, 280px"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 pt-2 flex flex-col flex-1">
                {/* Title (Line clamped to max 2 lines for uniform height) */}
                <h3 className="text-[#2C3E50] text-[15px] font-medium leading-snug mb-3 line-clamp-2 h-11">
                  {combo.name}
                </h3>
                
                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#F58634] font-bold text-lg">
                    ৳{combo.currentPrice.toLocaleString('en-IN')}.00
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ৳{combo.oldPrice.toLocaleString('en-IN')}.00
                  </span>
                </div>

                {/* View Details Button (Bottom flush) */}
                <button className="mt-auto w-full bg-[#F58634] hover:bg-[#e0762a] text-white transition-colors duration-300 rounded py-2.5 font-medium text-sm shadow-sm">
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* === Slider Dots (Just like the image) === */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setActiveDot(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeDot === index ? "bg-[#F58634]" : "border border-[#F58634] bg-transparent"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}