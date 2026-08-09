"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  isFeatured: boolean;
  status: "Active" | "Inactive";
}

export default function CategoryCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // 📌 API থেকে ক্যাটাগরি ফেচ করা এবং ফিচার্ড ক্যাটাগরি ফিল্টার করা
  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const res = await fetch("/v1/category");
        const data = await res.json();
        if (data.success) {
          const featured = data.data.filter(
            (cat: ICategory) => cat.isFeatured === true && cat.status === "Active"
          );
          setCategories(featured);
        }
      } catch (error) {
        console.error("Failed to fetch featured categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCategories();
  }, []);

  // Smooth scrolling function for arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll Animation Effect
  useEffect(() => {
    if (isHovered || categories.length === 0) return;

    const autoPlay = setInterval(() => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          current.scrollBy({ left: current.offsetWidth / 2, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(autoPlay);
  }, [isHovered, categories]);

  if (!isLoading && categories.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F9F9F9] py-2 transition-all duration-300">
      
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto relative">
        
        <h2 className="text-center text-[22px] md:text-2xl font-medium text-[#2C3E50] mb-8">
          Featured Categories
        </h2>

        {/* Carousel Container (এখানে থেকে ভুল 'group' ক্লাসটি সরিয়ে দেওয়া হয়েছে) */}
        <div 
          className="relative flex items-center"
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
            {isLoading ? (
              <div className="w-full text-center py-6 text-gray-400 text-sm">Loading categories...</div>
            ) : (
              categories.map((item) => (
                <Link
                  key={item._id}
                  href={`#${item.slug}`}
                  className="flex flex-col items-center gap-3 min-w-[110px] sm:min-w-[130px] md:min-w-[140px] group transition-all"
                >
                  <div className="bg-white rounded-[24px] sm:rounded-[32px] w-full aspect-square flex items-center justify-center p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-50/50 group-hover:-translate-y-1">
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="(max-w-768px) 80px, 100px"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No Icon</span>
                      )}
                    </div>
                  </div>

                  <span className="text-[13px] sm:text-sm font-normal text-gray-800 group-hover:text-[#F58634] transition-colors text-center leading-tight">
                    {item.name}
                  </span>
                </Link>
              ))
            )}
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