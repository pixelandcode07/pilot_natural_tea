"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Exact categories from your reference image
const categories = [
  { id: 1, title: "Honey", link: "#honey", iconPath: "/icons/honey.png" },
  { id: 2, title: "Dates", link: "#dates", iconPath: "/icons/dates.png" },
  { id: 3, title: "Spices", link: "#spices", iconPath: "/icons/spices.png" },
  { id: 4, title: "Nuts & Seeds", link: "#nuts", iconPath: "/icons/nutsandseeds.png" },
  { id: 5, title: "Beverage", link: "#beverage", iconPath: "/icons/beverage.png" },
  { id: 6, title: "Rice", link: "#rice", iconPath: "/icons/rice.png" },
  { id: 7, title: "Flours & Lentils", link: "#flours", iconPath: "/icons/flours.png" },
  { id: 8, title: "Functional Food", link: "#functional", iconPath: "/icons/functional.png" },
  { id: 9, title: "Rice", link: "#rice", iconPath: "/icons/rice.png" },
  { id: 10, title: "Flours & Lentils", link: "#flours", iconPath: "/icons/flours.png" },
  { id: 11, title: "Functional Food", link: "#functional", iconPath: "/icons/functional.png" },
];

export default function CategoryCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // অ্যানিমেশন কন্ট্রোল করার জন্য স্টেট
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle smooth scrolling on arrow click
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll Animation Effect (কার্ডগুলো নিজে নিজে বাম দিকে যাবে)
  useEffect(() => {
    // যদি কাস্টমার মাউস হোভার করে, তবে স্লাইডার থেমে যাবে
    if (isHovered) return;

    const autoPlay = setInterval(() => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        
        // যদি স্লাইডার একদম শেষে পৌঁছে যায়, তবে আবার শুরুতে চলে আসবে
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // নিজে নিজে ডানে স্ক্রল হবে (ফলে কার্ডগুলো বামে যাবে)
          current.scrollBy({ left: current.offsetWidth / 2, behavior: "smooth" });
        }
      }
    }, 3000); // প্রতি ৩ সেকেন্ড (3000ms) পর পর স্লাইড হবে

    return () => clearInterval(autoPlay);
  }, [isHovered]);

  return (
    <section className="w-full bg-[#F9F9F9] py-2 transition-all duration-300">
      
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto relative">
        
        <h2 className="text-center text-[22px] md:text-2xl font-medium text-[#2C3E50] mb-8">
          Featured Categories
        </h2>

        {/* Carousel Container (মাউস রাখলে অ্যানিমেশন থামানোর জন্য onMouseEnter ও onMouseLeave যুক্ত করা হয়েছে) */}
        <div 
          className="relative flex items-center group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 md:-left-6 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F58634] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform focus:outline-none"
            aria-label="Scroll Left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Items Wrapper */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth w-full py-2 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex flex-col items-center gap-3 min-w-[110px] sm:min-w-[130px] md:min-w-[140px] group transition-all"
              >
                <div className="bg-white rounded-[24px] sm:rounded-[32px] w-full aspect-square flex items-center justify-center p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50/50 group-hover:-translate-y-1">
                  <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={item.iconPath}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-w-768px) 80px, 100px"
                    />
                  </div>
                </div>

                <span className="text-[13px] sm:text-sm font-normal text-gray-800 group-hover:text-[#F58634] transition-colors text-center leading-tight">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 md:-right-6 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FCD2B1] text-white flex items-center justify-center shadow-sm hover:bg-[#F58634] hover:scale-105 transition-all focus:outline-none"
            aria-label="Scroll Right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}