"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Mixed Product Data (Honey, Green Tea, Black Tea)
const products = [
  {
    id: 1,
    name: "Black Seed Honey 500g",
    image: "/products/honey1.png",
    currentPrice: 750,
    oldPrice: null,
    badge: "Best Selling",
    badgeType: "orange", // orange for Best Selling/New Arrival
  },
  {
    id: 2,
    name: "Organic Premium Green Tea 250g",
    image: "/products/green-tea1.png",
    currentPrice: 1140,
    oldPrice: 1200,
    badge: "Save 5%",
    badgeType: "green", // green for discounts
  },
  {
    id: 3,
    name: "Sylhet Pure Black Tea 500g",
    image: "/products/black-tea1.png",
    currentPrice: 1500,
    oldPrice: null,
    badge: "Best Selling",
    badgeType: "orange",
  },
  {
    id: 4,
    name: "Natural Honeycomb 1kg",
    image: "/products/honey2.png",
    currentPrice: 2250,
    oldPrice: 2500,
    badge: "Save 10%",
    badgeType: "green",
  },
  {
    id: 5,
    name: "Organic Matcha Green Tea 100g",
    image: "/products/green-tea2.png",
    currentPrice: 600,
    oldPrice: null,
    badge: "New Arrival",
    badgeType: "orange",
  },
  {
    id: 6,
    name: "Classic Black Tea Box 200g",
    image: "/products/black-tea2.png",
    currentPrice: 2030,
    oldPrice: null,
    badge: "Best Selling",
    badgeType: "orange",
  },
  {
    id: 7,
    name: "Lychee Flower Honey 500g",
    image: "/products/honey3.png",
    currentPrice: 550,
    oldPrice: 600,
    badge: "Save 8%",
    badgeType: "green",
  },
  {
    id: 8,
    name: "Organic Detox Green Tea 50g",
    image: "/products/green-tea3.png",
    currentPrice: 1230,
    oldPrice: null,
    badge: "New Arrival",
    badgeType: "orange",
  },
  {
    id: 9,
    name: "Kashmiri Sidr Honey 800g",
    image: "/products/honey4.png",
    currentPrice: 1800,
    oldPrice: 2000,
    badge: "Save 10%",
    badgeType: "green",
  },
  {
    id: 10,
    name: "Family Pack Black Tea 1kg",
    image: "/products/combo4.png",
    currentPrice: 1200,
    oldPrice: null,
    badge: null,
    badgeType: null,
  },
];

export default function JustForYou() {
  return (
    <section className="w-full bg-[#F9F9F9] py-4 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও ব্যানারের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* === Header Section (Exactly like the image) === */}
        <div className="flex items-end justify-between border-b border-gray-300 pb-2 mb-6 relative">
          
          {/* Title with Orange Underline */}
          <div className="relative">
            <h2 className="text-xl md:text-[22px] font-bold text-[#1A2B3C]">
              Just For You
            </h2>
            {/* The thick orange line under the title */}
            <div className="absolute -bottom-[10px] left-0 w-16 h-[4px] bg-[#F58634]"></div>
          </div>

          {/* View All Products Link */}
          <Link 
            href="#all-products" 
            className="text-[#F58634] text-xs md:text-sm font-semibold hover:underline flex items-center gap-1 transition-all uppercase"
          >
            VIEW ALL PRODUCTS 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* === Products Grid (5 Columns on Large Screens) === */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-200 rounded flex flex-col group hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300 h-full"
            >
              
              {/* Product Image & Badges */}
              <div className="relative w-full aspect-square p-4 flex items-center justify-center bg-white rounded-t overflow-hidden">
                
                {/* Dynamic Badge (Orange for Top Left, Green for Top Right) */}
                {product.badge && product.badgeType === "orange" && (
                  <span className="absolute top-3 left-3 bg-[#F58634] text-white text-[11px] font-semibold px-2 py-0.5 rounded z-10 shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.badge && product.badgeType === "green" && (
                  <span className="absolute top-3 right-3 bg-[#00B853] text-white text-[11px] font-semibold px-2 py-0.5 rounded z-10 shadow-sm">
                    {product.badge}
                  </span>
                )}

                {/* Image */}
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-w-768px) 50vw, 20vw"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 pt-2 flex flex-col flex-1 border-t border-gray-100">
                
                {/* Title */}
                <h3 className="text-[#2C3E50] text-[14px] sm:text-[15px] font-medium leading-snug mb-2 line-clamp-2 h-10">
                  {product.name}
                </h3>
                
                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#F58634] font-bold text-[16px] sm:text-[17px]">
                    ৳{product.currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-[12px] sm:text-[13px]">
                      ৳{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Add To Cart Button */}
                <button className="mt-auto w-full border border-[#F58634] text-[#F58634] hover:bg-[#F58634] hover:text-white transition-colors duration-300 rounded py-2 flex items-center justify-center gap-2 font-medium text-[13px] sm:text-[14px]">
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add To Cart
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}