"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Green Tea and Black Tea Data based on your requirement
const teaProducts = [
  {
    id: 1,
    name: "Organic Premium Green Tea 250g",
    image: "/products/green-tea1.png", // আপনার ইমেজের পাথ
    currentPrice: 1140,
    oldPrice: 1200,
    discountBadge: "Save 5%",
    isNew: true, // New Arrival badge
  },
  {
    id: 2,
    name: "Sylhet Pure Black Tea 500g",
    image: "/products/black-tea1.png",
    currentPrice: 1500,
    oldPrice: null, // No discount
    discountBadge: null,
    isNew: false,
  },
  {
    id: 3,
    name: "Organic Matcha Green Tea 100g",
    image: "/products/green-tea2.png",
    currentPrice: 600,
    oldPrice: null,
    discountBadge: null,
    isNew: true, // New Arrival badge
  },
  {
    id: 4,
    name: "Classic Black Tea Box 200g",
    image: "/products/black-tea2.png",
    currentPrice: 2030,
    oldPrice: null,
    discountBadge: null,
    isNew: false,
  },
  {
    id: 5,
    name: "Organic Detox Green Tea 50g",
    image: "/products/green-tea3.png",
    currentPrice: 1230,
    oldPrice: null,
    discountBadge: null,
    isNew: false,
  },
];

export default function OrganicTeaSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(1); // ছবির মতো ২য় ডট অ্যাকটিভ

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    if (scrollLeft < 100) setActiveDot(0);
    else if (scrollLeft < 300) setActiveDot(1);
    else if (scrollLeft < 600) setActiveDot(2);
    else if (scrollLeft < 900) setActiveDot(3);
    else setActiveDot(4);
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-4 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও ব্যানারের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* === Header Section (Exactly like the image) === */}
        <div className="flex items-end justify-between border-b border-gray-300 pb-2 mb-6 relative">
          
          {/* Title with Orange Underline */}
          <div className="relative">
            <h2 className="text-xl md:text-[22px] font-bold text-[#1A2B3C]">
              Organic Certified
            </h2>
            {/* The thick orange line under the title */}
            <div className="absolute -bottom-[10px] left-0 w-16 h-[4px] bg-[#F58634]"></div>
          </div>

          {/* View All Items Link */}
          <Link 
            href="#organic-tea" 
            className="text-[#F58634] text-xs md:text-sm font-semibold hover:underline flex items-center gap-1 transition-all"
          >
            VIEW ALL ITEMS 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* === Products Slider / Grid === */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth w-full py-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {teaProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-200 rounded flex flex-col min-w-[240px] sm:min-w-[260px] max-w-[310px] flex-1 group hover:shadow-lg transition-shadow duration-300"
            >
              
              {/* Product Image & Badges */}
              <div className="relative w-full aspect-square p-4 flex items-center justify-center bg-white rounded-t">
                
                {/* Save % Badge (Top Right - Green) */}
                {product.discountBadge && (
                  <span className="absolute top-3 right-3 bg-[#00B853] text-white text-[11px] font-semibold px-2 py-0.5 rounded z-10 shadow-sm">
                    {product.discountBadge}
                  </span>
                )}

                {/* New Arrival Badge (Top Left - Orange) */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-[#F58634] text-white text-[11px] font-semibold px-2 py-0.5 rounded z-10 shadow-sm">
                    New Arrival
                  </span>
                )}

                {/* Image */}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-w-768px) 240px, 260px"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 pt-2 flex flex-col flex-1 border-t border-gray-100">
                
                {/* Title (Line clamped to 2 lines) */}
                <h3 className="text-[#2C3E50] text-[15px] font-medium leading-snug mb-3 line-clamp-2 h-10">
                  {product.name}
                </h3>
                
                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#F58634] font-bold text-[17px]">
                    ৳{product.currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-[13px]">
                      ৳{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Add To Cart Button (Outline Orange) */}
                <button className="mt-auto w-full border border-[#F58634] text-[#F58634] hover:bg-[#F58634] hover:text-white transition-colors duration-300 rounded py-2 flex items-center justify-center gap-2 font-medium text-[14px]">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add To Cart
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* === Slider Dots (Just like the image) === */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => setActiveDot(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeDot === index ? "bg-[#F58634] w-4" : "border border-[#F58634] bg-transparent"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}