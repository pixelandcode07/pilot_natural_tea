"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// 6 Category Cards Data with Image Paths and English Text Only
const categories = [
  {
    id: 1,
    title: "Organic Green Tea",
    subtitle: "100% Pure & Fresh",
    link: "#green-tea",
    iconPath: "/icons/category01.png",
  },
  {
    id: 2,
    title: "Premium Black Tea",
    subtitle: "Strong & Energizing",
    link: "#black-tea",
    iconPath: "/icons/category02.png",
  },
  {
    id: 3,
    title: "Detox & Slimming",
    subtitle: "Healthy Lifestyle",
    link: "#detox-tea",
    iconPath: "/icons/category03.png",
  },
  {
    id: 4,
    title: "Herbal & Masala",
    subtitle: "Rich Spice Blend",
    link: "#herbal-tea",
    iconPath: "/icons/category04.png",
  },
  {
    id: 5,
    title: "Exclusive Gift Boxes",
    subtitle: "Perfect for Gifting",
    link: "#gift-box",
    iconPath: "/icons/category05.png",
  },
  {
    id: 6,
    title: "Special Offers",
    subtitle: "Best Deals & Combos",
    link: "#offers",
    iconPath: "/icons/category06.png",
  },
];

export default function CategoryCards() {
  return (
    <section className="w-full py-6 sm:py-2 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও ব্যানারের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* Section Header in English */}
        <div className="text-center mb-2 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E5E3A] tracking-tight">
            Explore Our Tea Collection
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Handpicked organic blends brewed for your daily wellness
          </p>
        </div>

        {/* 6 Cards Grid (gap-5 ও aspect-[1/1.08] দেওয়ার কারণে কার্ডগুলো একদম স্কয়ার সেপে থাকবে) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              /* aspect-[1/1.08] কার্ডটিকে পাশে ছড়াতে দেবে না, একদম Bond কার্ডের মতো সেপ রাখবে */
              className="bg-white rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 flex flex-col items-center justify-center text-center aspect-[1/0.5] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(30,94,58,0.12)] hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 group"
            >
              {/* Custom Image Icon Box (আইকন সাইজ বাড়িয়ে w-20 h-20 করা হয়েছে) */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={item.iconPath}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-w-768px) 64px, 80px"
                />
              </div>

              {/* English Title */}
              <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#1E5E3A] transition-colors leading-tight">
                {item.title}
              </h3>

              {/* English Subtitle */}
              <span className="text-[11px] sm:text-xs text-gray-400 mt-1 font-medium">
                {item.subtitle}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}