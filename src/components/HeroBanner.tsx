"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Banner Interface
interface IBanner {
  _id: string;
  title: string;
  link: string;
  image: string;
  position: "Hero" | "Promo";
  status: "Active" | "Inactive";
}

export default function HeroBanner() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 📌 API থেকে Banner ডাটা ফেচ করা
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/v1/banner");
        const data = await res.json();
        
        if (data.success) {
          // 📌 শুধুমাত্র Active এবং Hero পজিশনের ব্যানারগুলো ফিল্টার করা হচ্ছে
          const heroBanners = data.data.filter(
            (banner: IBanner) => banner.position === "Hero" && banner.status === "Active"
          );
          setBanners(heroBanners);
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // অটো-স্লাইডার ইফেক্ট (প্রতি ৪.৫ সেকেন্ড পর পর ব্যানার চেঞ্জ হবে)
  useEffect(() => {
    // যদি ব্যানার ১টি বা তার কম থাকে তবে অটো স্লাইডারের দরকার নেই
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [banners.length]);

  // আগের ব্যানারে যাওয়ার ফাংশন
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // পরের ব্যানারে যাওয়ার ফাংশন
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // 📌 ডাটা লোড হওয়ার সময় একটি লোডিং স্কিলিটন দেখাবে
  if (isLoading) {
    return (
      <section className="w-full bg-[#F9F9F9] py-4 sm:py-6 transition-all duration-300">
        <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
          <div className="relative w-full aspect-[16/6] md:aspect-[16/5.2] rounded-2xl md:rounded-3xl bg-gray-200 animate-pulse flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  // 📌 যদি অ্যাডমিন প্যানেল থেকে কোনো Hero ব্যানার দেওয়া না থাকে
  if (!isLoading && banners.length === 0) {
    return null; // ফাঁকা জায়গা না দেখিয়ে সেকশনটি হাইড করে দেওয়া ভালো
  }

  return (
    <section className="w-full bg-[#F9F9F9] py-4 sm:py-6 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবারের সাথে মিলিয়ে ঠিক ১৫০ পিক্সেল গ্যাপ (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* ============================================================== */}
        {/* ১. TOP RED BOX: Main Large Slider (অটো চেঞ্জ হবে + অ্যারো বাটন) */}
        {/* ============================================================== */}
        <div className="relative w-full aspect-[16/6] md:aspect-[16/5.2] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 group bg-white">
          
          {/* স্লাইডার ইমেজ */}
          <Link href={banners[currentIndex].link || "#"} className="block w-full h-full relative">
            <Image
              src={banners[currentIndex].image}
              alt={banners[currentIndex].title || "Pilot Natural Hero Banner"}
              fill
              priority
              className="object-cover sm:object-fill object-center transition-all duration-700 ease-in-out"
              sizes="(max-w-1920px) 100vw, 1620px"
            />
          </Link>

          {/* যদি ব্যানার ১টির বেশি থাকে তবেই অ্যারো বাটন ও ডটস দেখাবে */}
          {banners.length > 1 && (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                aria-label="Previous Slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                aria-label="Next Slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Bottom Slider Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === index
                        ? "w-7 h-2.5 bg-[#C6FF36] shadow-sm"
                        : "w-2.5 h-2.5 bg-white/70 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}