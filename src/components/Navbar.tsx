"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserRound, ChevronDown, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [manualUser, setManualUser] = useState<any>(null);
  
  // Google Login Session
  const { data: session } = useSession();
  const pathname = usePathname();

  // Manual Login Check (Local Storage থেকে ডাটা নিচ্ছে)
  useEffect(() => {
    const storedUser = localStorage.getItem("manual_user");
    if (storedUser) {
      setManualUser(JSON.parse(storedUser));
    }
  }, []);

  // Combined User Data (যে কোনো একভাবে লগইন থাকলেই ইউজার ডাটা পাবে)
  const user = session?.user || manualUser;

  // Logout Function
  const handleLogout = async () => {
    if (session) {
      await signOut(); // Google Logout
    } else {
      localStorage.removeItem("manual_user"); // Manual Logout
      await fetch("/v1/auth/logout", { method: "POST" }).catch(() => {});
      window.location.href = "/login"; // রিডাইরেক্ট করে পেজ রিলোড করবে
    }
  };

  // ✅ অ্যাডমিন প্যানেলে গেলে Navbar হাইড করার লজিক
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300">
      
      <div className="w-full px-4 sm:px-8 lg:px-[150px]">
        {/* Relative পজিশন দেওয়া হয়েছে যাতে Navlink একদম মাঝখানে থাকে */}
        <div className="flex items-center justify-between h-20 relative">
          
          {/* 1. Left Section: Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo2.png"
                  alt="Pilot Natural Logo"
                  width={140}
                  height={50} 
                  className="object-contain h-10 md:h-12 w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* 2. Center Navigation Links (Absolute Centering - ছবির মতো) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center space-x-8 text-[#2C3E50] text-[15px] font-medium">
              <Link href="/" className="hover:text-[#F58634] transition-colors">
                Home
              </Link>
              
              <Link href="#green" className="flex items-center gap-1 hover:text-[#F58634] transition-colors group">
                <span>Green</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58634] transition-colors" />
              </Link>

              <Link href="#black" className="flex items-center gap-1 hover:text-[#F58634] transition-colors group">
                <span>Black</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58634] transition-colors" />
              </Link>

              <Link href="#about" className="hover:text-[#F58634] transition-colors">
                About Us
              </Link>

              <Link href="#contact" className="flex items-center gap-1 hover:text-[#F58634] transition-colors group">
                <span>Contact</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58634] transition-colors" />
              </Link>
            </nav>
          </div>

          {/* 3. Right Section: Search + Cart + User (ছবির মতো) */}
          <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 shrink-0">
            
            {/* Search Box */}
            <div className="hidden xl:flex relative items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#F4F5F7] text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-xl focus:outline-none w-[220px]"
              />
              <button className="absolute right-3 text-gray-500 hover:text-[#F58634]">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Icon */}
            <Link
              href="#cart"
              className="relative w-10 h-10 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-gray-700 hover:text-[#F58634] flex items-center justify-center transition-colors"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F58634] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F58634] border border-white"></span>
              </span>
            </Link>

            {/* User Profile / Auth Logic */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] border border-transparent hover:border-gray-200 flex items-center justify-center transition-colors overflow-hidden focus:outline-none"
                >
                  {user.image || user.avatar ? (
                    <Image
                      src={user.image || user.avatar}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="font-bold text-[#F58634] text-[15px]">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown (Logout) */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    {user.role === "admin" && (
                      <Link href="/admin" className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="w-10 h-10 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-gray-700 hover:text-[#1E5E3A] flex items-center justify-center transition-colors"
              >
                <UserRound className="w-5 h-5" strokeWidth={1.8} />
              </Link>
            )}
          </div>

          {/* 4. Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="#cart"
              className="relative w-9 h-9 rounded-xl bg-[#F4F5F7] text-gray-700 flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F58634]"></span>
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-2 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="relative mb-4 sm:hidden flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#F4F5F7] text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-xl focus:outline-none"
            />
            <button className="absolute right-3 text-gray-600">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <Link href="/" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#green" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>🌿 Green</Link>
          <Link href="#black" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>☕ Black</Link>
          <Link href="#about" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="#contact" className="block py-2 px-3 rounded-xl text-gray-800 font-medium hover:bg-[#F4F5F7]" onClick={() => setIsOpen(false)}>Contact</Link>

          {/* Mobile Auth Logic */}
          {user ? (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center gap-3 py-2 px-3 mb-2">
                {user.image || user.avatar ? (
                  <Image src={user.image || user.avatar} alt="User" width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1E5E3A] text-white flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm text-gray-800 truncate">{user.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              {user.role === "admin" && (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 mb-2">
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-red-500 font-medium bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex justify-center py-2.5 rounded-xl text-white font-medium bg-[#1E5E3A] hover:bg-[#133821] mt-2 transition-colors"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}