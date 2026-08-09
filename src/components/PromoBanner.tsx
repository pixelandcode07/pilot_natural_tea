"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    // Background color matching your website's base theme
    <section className="w-full bg-[#F7F2E7] py-6 sm:py-8">
      
      {/* 1920x1080 ডিসপ্লের জন্য ন্যাভবার ও অন্যান্য সেকশনের সাথে হুবহু অ্যালাইমেন্ট (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px] mx-auto">
        
        {/* Banner Link Wrapper */}
        <Link 
          href="#special-offer" 
          className="block relative w-full h-[120px] sm:h-[180px] md:h-[220px] lg:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(30,94,58,0.15)] transition-all duration-300"
        >
          {/* 
            Image Component:
            object-cover বা object-fill ব্যবহার করা হয়েছে যাতে স্ক্রিনের সাইজ অনুযায়ী ব্যানারটি সুন্দরভাবে ফিট হয়ে যায়। 
          */}
          <Image
            src="/promo-banner.png" // আপনার ব্যানার ইমেজের নাম এখানে দিন
            alt="Pilot Natural Tea Special Offer"
            fill
            priority
            className="object-cover sm:object-fill transform group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-w-768px) 100vw, (max-w-1200px) 100vw, 100vw"
          />
          
          {/* হালকা একটি ওভারলে (ঐচ্ছিক), যাতে হোভার করলে সুন্দর একটি প্রিমিয়াম শাইন ইফেক্ট আসে */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none"></div>
        </Link>

      </div>
    </section>
  );
}