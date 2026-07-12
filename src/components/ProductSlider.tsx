"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Product Data based on your reference image
const products = [
  {
    id: 1,
    name: "Black Seed Honey 500g",
    image: "/products/honey1.png", // আপনার ইমেজের পাথ এখানে বসাবেন
    currentPrice: 750,
    oldPrice: 800,
    discountBadge: "Save 6%",
    isNew: false,
  },
  {
    id: 2,
    name: "Natural Honeycomb- 1kg",
    image: "/products/honey2.png",
    currentPrice: 2250,
    oldPrice: 2500,
    discountBadge: "Save 10%",
    isNew: false,
  },
  {
    id: 3,
    name: "Lychee Flower Honey 500g",
    image: "/products/honey3.png",
    currentPrice: 550,
    oldPrice: 600,
    discountBadge: "Save 8%",
    isNew: false,
  },
  {
    id: 4,
    name: "Kashmiri Sidr Honey 800g",
    image: "/products/honey4.png",
    currentPrice: 1800,
    oldPrice: 2000,
    discountBadge: "Save 10%",
    isNew: true, // New Arrival badge
  },
  {
    id: 5,
    name: "Lychee Flower Honey 1kg",
    image: "/products/honey5.png",
    currentPrice: 1100,
    oldPrice: 1200,
    discountBadge: "Save 8%",
    isNew: false,
  },
];

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(2); // Just for visual representation like the image

  // Scroll function for slider
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    // Simple logic to change dots based on scroll position (optional)
    if (scrollLeft < 100) setActiveDot(0);
    else if (scrollLeft < 300) setActiveDot(1);
    else if (scrollLeft < 600) setActiveDot(2);
    else setActiveDot(3);
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-10 transition-all duration-300">
      
      {/* Alignment matching your Navbar and Hero Banner (150px gap on large screens) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* === Header Section === */}
        <div className="flex items-end justify-between border-b border-gray-300 pb-2 mb-6 relative">
          
          {/* Title with Orange Underline */}
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A2B3C]">
              All Natural Honey
            </h2>
            {/* The thick orange line under the title */}
            <div className="absolute -bottom-[10px] left-0 w-16 h-[4px] bg-[#F58634]"></div>
          </div>

          {/* View All Items Link */}
          <Link 
            href="#all-products" 
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
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-200 rounded flex flex-col min-w-[240px] sm:min-w-[260px] max-w-[310px] flex-1 group hover:shadow-lg transition-shadow duration-300"
            >
              
              {/* Product Image & Badges */}
              <div className="relative w-full aspect-square p-4 flex items-center justify-center bg-white rounded-t">
                
                {/* Save % Badge (Top Right) */}
                {product.discountBadge && (
                  <span className="absolute top-3 right-3 bg-[#2ecc71] text-white text-[11px] font-bold px-2 py-0.5 rounded z-10">
                    {product.discountBadge}
                  </span>
                )}

                {/* New Arrival Badge (Top Left) */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-[#F58634] text-white text-[11px] font-bold px-2 py-0.5 rounded z-10">
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
                {/* Title */}
                <h3 className="text-[#2C3E50] text-[15px] font-medium leading-tight mb-2 truncate">
                  {product.name}
                </h3>
                
                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#F58634] font-bold text-lg">
                    ৳{product.currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ৳{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Add To Cart Button */}
                <button className="mt-auto w-full border border-[#F58634] text-[#F58634] hover:bg-[#F58634] hover:text-white transition-colors duration-300 rounded py-2 flex items-center justify-center gap-2 font-medium text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add To Cart
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* === Slider Dots (Visual representation matching image) === */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => setActiveDot(index)}
              className={`w-2.5 h-2.5 rounded-full border border-[#F58634] transition-all duration-300 ${
                activeDot === index ? "bg-[#F58634]" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}