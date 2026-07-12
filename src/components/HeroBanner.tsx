"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// আপনার public/banners/ ফোল্ডারে থাকা ৪টি ব্যানারের ডাটা
const bannerData = [
  {
    id: 1,
    src: "/banners/banner01.jpeg",
    title: "100% Natural Green Tea & Black Tea",
    link: "#shop",
  },
  {
    id: 2,
    src: "/banners/banner02.png", // আপনার ২য় ছবি (যদি সবগুলোতে banner01.png থাকে তবে সেটাই দিয়ে টেস্ট করতে পারেন)
    title: "প্রতিদিনের সুস্থতার জন্য Premium Natural Tea",
    link: "#green-tea",
  },
  {
    id: 3,
    src: "/banners/banner01.jpeg",
    title: "Special Tea of Sylhet Collection",
    link: "#black-tea",
  },
  {
    id: 4,
    src: "/banners/banner02.png",
    title: "Exclusive Gift Boxes & Offers",
    link: "#offer",
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // অটো-স্লাইডার ইফেক্ট (প্রতি ৪.৫ সেকেন্ড পর পর ব্যানার চেঞ্জ হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // আগের ব্যানারে যাওয়ার ফাংশন
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
    );
  };

  // পরের ব্যানারে যাওয়ার ফাংশন
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-4 sm:py-6 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবারের সাথে মিলিয়ে ঠিক ১৫০ পিক্সেল গ্যাপ (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* ============================================================== */}
        {/* ১. TOP RED BOX: Main Large Slider (অটো চেঞ্জ হবে + অ্যারো বাটন) */}
        {/* ============================================================== */}
        <div className="relative w-full aspect-[16/6] md:aspect-[16/5.2] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 group bg-white">
          
          {/* স্লাইডার ইমেজ */}
          <Link href={bannerData[currentIndex].link} className="block w-full h-full relative">
            <Image
              src={bannerData[currentIndex].src}
              alt={bannerData[currentIndex].title}
              fill
              priority
              className="object-cover sm:object-fill object-center transition-all duration-700 ease-in-out"
              sizes="(max-w-1920px) 100vw, 1620px"
            />
          </Link>

          {/* Left Arrow Button (হোভার করলে ভাসবে) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous Slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button (হোভার করলে ভাসবে) */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next Slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bottom Slider Dots (ডট ইন্ডিকেটর) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
            {bannerData.map((_, index) => (
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

        </div>



      </div>
    </section>
  );
}