"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
      
      {/* 1920x1080 ডিসপ্লের জন্য দুই পাশে ১৫০ পিক্সেল গ্যাপ (lg:px-[150px]) */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px]">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Left Section: Logo */}
          <div className="flex items-center gap-6">
            
            {/* Logo (Size Increased) */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo2.png"
                  alt="Pilot Natural Tea Logo"
                  width={150} // লোগোর সাইজ বাড়ানো হয়েছে
                  height={60} 
                  className="object-contain h-10 md:h-14 w-auto" // রেসপন্সিভ হাইট
                  priority
                />
              </div>
            </Link>
          </div>

          {/* 2. Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-gray-800 text-sm font-medium">
            <Link href="/" className="hover:text-[#1E5E3A] transition-colors">
              Home
            </Link>
            
            <Link href="#green-tea" className="flex items-center gap-1 hover:text-[#1E5E3A] transition-colors group">
              <span>Green Tea</span>
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E5E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <Link href="#black-tea" className="flex items-center gap-1 hover:text-[#1E5E3A] transition-colors group">
              <span>Black Tea</span>
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E5E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <Link href="#about" className="hover:text-[#1E5E3A] transition-colors">
              About Us
            </Link>

            <Link href="#contact" className="flex items-center gap-1 hover:text-[#1E5E3A] transition-colors group">
              <span>Contact</span>
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1E5E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </nav>

          {/* 3. Right Section: Search + Cart + User Icon */}
          <div className="hidden sm:flex items-center space-x-4 shrink-0">
            
            {/* Pill Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#F4F5F7] text-gray-800 text-sm pl-4 pr-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E5E3A]/20 focus:bg-white border border-transparent focus:border-gray-200 transition-all w-36 lg:w-48"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#1E5E3A]" aria-label="Search">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Cart Icon (New) */}
            <Link
              href="#cart"
              className="relative w-10 h-10 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-gray-700 hover:text-[#F58634] flex items-center justify-center transition-colors shadow-sm"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Notification Dot */}
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F58634] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F58634] border border-white"></span>
              </span>
            </Link>

            {/* User Icon */}
            <Link
              href="#login"
              className="w-10 h-10 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-gray-700 hover:text-[#1E5E3A] flex items-center justify-center transition-colors shadow-sm"
              aria-label="User Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

          </div>

          {/* 4. Mobile Menu & Icons */}
          <div className="lg:hidden flex items-center gap-2">
            
            {/* Mobile Cart Icon */}
            <Link
              href="#cart"
              className="relative w-9 h-9 rounded-xl bg-[#F4F5F7] text-gray-700 flex items-center justify-center sm:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F58634]"></span>
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-2 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="relative mb-4 sm:hidden">
            <input
              type="text"
              placeholder="Search tea..."
              className="w-full bg-[#F4F5F7] text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-xl focus:outline-none border border-transparent"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <Link href="/" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="#green-tea" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>
            🌿 Green Tea
          </Link>
          <Link href="#black-tea" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>
            ☕ Black Tea
          </Link>
          <Link href="#about" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="#contact" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="#login" className="block py-2 px-3 rounded-xl text-[#1E5E3A] font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>
            👤 Login / Register
          </Link>
        </div>
      )}
    </header>
  );
}