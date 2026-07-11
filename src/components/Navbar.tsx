"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
      
      {/* এখানে w-full এবং lg:px-[150px] দেওয়া হয়েছে, ফলে ডেস্কটপে দুই পাশে ঠিক ১৫০ পিক্সেল গ্যাপ থাকবে */}
      <div className="w-full px-4 sm:px-8 lg:px-[150px]">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Left Section: Logo + Pill Selector */}
          <div className="flex items-center gap-6">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Pilot Natural Tea Logo"
                  width={50}
                  height={50}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              
            </Link>

            {/* Pill Dropdown Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShopDropdown(!shopDropdown)}
                className="flex items-center gap-2 bg-[#F4F5F7] hover:bg-[#EAECEF] text-gray-800 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <span>Shop Tea</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${shopDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu for Tea Types */}
              {shopDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  <Link href="#green-tea" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1E5E3A] font-medium" onClick={() => setShopDropdown(false)}>
                    🌿 Green Tea
                  </Link>
                  <Link href="#black-tea" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1E5E3A] font-medium" onClick={() => setShopDropdown(false)}>
                    ☕ Black Tea
                  </Link>
                  <Link href="#gift-boxes" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1E5E3A] font-medium" onClick={() => setShopDropdown(false)}>
                    🎁 Gift Boxes
                  </Link>
                </div>
              )}
            </div>

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

          {/* 3. Right Section: Search + Language + User Icon */}
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

            {/* Language Selector */}
            <button className="flex items-center gap-1.5 text-gray-800 hover:text-[#1E5E3A] text-sm font-medium px-2 py-1 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              <span>বাংলা</span>
            </button>

            {/* Rounded Gray User Icon Box */}
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

          {/* 4. Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="#login"
              className="w-9 h-9 rounded-xl bg-[#F4F5F7] text-gray-700 flex items-center justify-center sm:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-2 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        </div>
      )}
    </header>
  );
}