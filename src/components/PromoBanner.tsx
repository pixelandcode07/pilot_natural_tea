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

export default function PromoBanner() {
  const [promoBanner, setPromoBanner] = useState<IBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 📌 API থেকে Promo Banner ডাটা ফেচ করা
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("/v1/banner");
        const data = await res.json();
        
        if (data.success) {
          // 📌 শুধুমাত্র Active এবং Promo পজিশনের ব্যানার ফিল্টার করা হচ্ছে
          const banners = data.data.filter(
            (b: IBanner) => b.position === "Promo" && b.status === "Active"
          );
          
          if (banners.length > 0) {
            setPromoBanner(banners[0]); // প্রথম প্রোমো ব্যানারটি সেট করা হচ্ছে
          }
        }
      } catch (error) {
        console.error("Failed to fetch promo banner", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // 📌 ডাটা লোড হওয়ার সময় একটি লোডিং স্কিলিটন দেখাবে
  if (isLoading) {
    return (
      <section className="w-full bg-[#F7F2E7] py-6 sm:py-8">
        <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
          <div className="w-full h-[120px] sm:h-[180px] md:h-[220px] lg:h-[260px] rounded-xl sm:rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center shadow-sm">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  // 📌 যদি অ্যাডমিন প্যানেল থেকে কোনো Promo ব্যানার দেওয়া না থাকে
  if (!isLoading && !promoBanner) {
    return null; // ফাঁকা জায়গা না দেখিয়ে সেকশনটি হাইড করে দেওয়া ভালো
  }

  return (
    // Background color matching your website's base theme
    <section className="w-full bg-[#F7F2E7] py-6 sm:py-8 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও অন্যান্য সেকশনের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* Banner Link Wrapper */}
        <Link 
          href={promoBanner?.link || "#"} 
          className="block relative w-full h-[120px] sm:h-[180px] md:h-[220px] lg:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(30,94,58,0.15)] transition-all duration-300 bg-white"
        >
          {/* Image Component */}
          <Image
            src={promoBanner!.image} 
            alt={promoBanner?.title || "Pilot Natural Tea Special Offer"}
            fill
            priority
            className="object-cover sm:object-fill transform group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-w-768px) 100vw, (max-w-1200px) 100vw, 100vw"
          />
          
          {/* হালকা একটি ওভারলে (ঐচ্ছিক), যাতে হোভার করলে সুন্দর একটি প্রিমিয়াম শাইন ইফেক্ট আসে */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none"></div>
        </Link>

      </div>
    </section>
  );
}