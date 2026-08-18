"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserRound, LogOut, Menu, X, ChevronDown, ListTree } from "lucide-react";

// Category Interface
interface ICategory {
  _id: string;
  name: string;
  slug: string;
  status: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [manualUser, setManualUser] = useState<any>(null);
  
  // 📌 Categories & Cart State
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Google Login Session
  const { data: session } = useSession();
  const pathname = usePathname();

  // 📌 ১. Fetch Categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/v1/category");
        const data = await res.json();
        if (data.success) {
          // শুধু Active ক্যাটাগরিগুলো মেনুতে দেখাবে
          setCategories(data.data.filter((cat: ICategory) => cat.status === "Active"));
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  // 📌 ২. Load Cart Data & Listen for Updates
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("pilot_cart") || "[]");
      setCartCount(cart.length); // কার্টে কতগুলো আইটেম আছে তা সেট করা
    };

    // Initial Load
    updateCartCount();

    // Listen to custom event fired from Add to Cart buttons
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Manual Login Check (Local Storage থেকে ডাটা নিচ্ছে)
  useEffect(() => {
    const storedUser = localStorage.getItem("manual_user");
    if (storedUser) {
      setManualUser(JSON.parse(storedUser));
    }
  }, []);

  // Combined User Data
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

  // 📌 Category Split Logic (First 5 vs Rest)
  const visibleCategories = categories.slice(0, 5);
  const moreCategories = categories.slice(5);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300 shadow-sm">
      
      <div className="w-full px-4 sm:px-8 lg:px-[50px] xl:px-[150px]">
        <div className="flex items-center justify-between h-20 gap-4">
          
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

          {/* 2. Center Navigation Links (5 Categories + More Dropdown) */}
          <div className="hidden lg:flex flex-1 justify-center px-4 h-full">
            <nav className="flex items-center gap-5 xl:gap-7 text-[#2C3E50] text-[14px] xl:text-[15px] font-medium h-full">
              
              {/* Show First 5 Categories */}
              {visibleCategories.length > 0 ? (
                visibleCategories.map((cat) => (
                  <Link 
                    key={cat._id} 
                    href={`#${cat.slug}`} 
                    className="hover:text-[#F58634] transition-colors py-8 whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <span className="text-sm text-gray-400">Loading...</span>
              )}

              {/* Show "More" Dropdown if there are more than 5 categories */}
              {moreCategories.length > 0 && (
                <div className="relative group h-full flex items-center">
                  <div className="flex items-center gap-1 hover:text-[#F58634] transition-colors cursor-pointer py-8">
                    <span>More</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#F58634] transition-colors" />
                  </div>
                  
                  {/* Dropdown Menu (Hover) */}
                  <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {moreCategories.map((cat) => (
                      <Link 
                        key={cat._id} 
                        href={`#${cat.slug}`} 
                        className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#F58634] hover:pl-6 transition-all duration-300"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </nav>
          </div>

          {/* 3. Right Section: Search + Cart + User */}
          <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 shrink-0">
            
            {/* Search Box */}
            <div className="hidden xl:flex relative items-center">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#F4F5F7] text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-xl focus:outline-none w-[180px] 2xl:w-[220px] transition-all border border-transparent focus:border-gray-200"
              />
              <button className="absolute right-3 text-gray-500 hover:text-[#F58634] transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* 📌 Real Dynamic Cart Icon (Desktop) */}
            <Link
              href="/cart"
              className="relative w-10 h-10 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-gray-700 hover:text-[#F58634] flex items-center justify-center transition-colors"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-5 w-5 rounded-full bg-[#F58634] text-white text-[11px] font-bold border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
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

          {/* 4. Mobile Menu Toggle & Cart */}
          <div className="lg:hidden flex items-center gap-3">
            
            {/* 📌 Real Dynamic Cart Icon (Mobile) */}
            <Link
              href="/cart"
              className="relative w-9 h-9 rounded-xl bg-[#F4F5F7] text-gray-700 flex items-center justify-center hover:bg-[#EAECEF]"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-[#F58634] text-white text-[10px] font-bold border-[1.5px] border-white shadow-sm">
                  {cartCount}
                </span>
              )}
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 shadow-xl h-[calc(100vh-80px)] overflow-y-auto">
          
          <div className="relative mb-6 sm:hidden flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-[#F4F5F7] text-gray-800 text-sm pl-4 pr-10 py-3 rounded-xl focus:outline-none"
            />
            <button className="absolute right-3 text-gray-600">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* 📌 Mobile Category List (Shows all categories on mobile vertically) */}
          <div className="py-2">
            <div className="flex items-center gap-2 mb-3 text-[#F58634]">
              <ListTree className="w-4 h-4" />
              <p className="text-sm font-bold uppercase tracking-wider">All Categories</p>
            </div>
            
            <div className="space-y-1 pl-6 border-l-2 border-gray-100 ml-2">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link 
                    key={cat._id} 
                    href={`#${cat.slug}`} 
                    className="block py-2 px-3 rounded-lg text-gray-600 text-sm font-medium hover:bg-[#F4F5F7] hover:text-[#F58634] transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))
              ) : (
                <p className="py-2 px-4 text-sm text-gray-400">Loading...</p>
              )}
            </div>
          </div>

          {/* Mobile Auth Logic */}
          {user ? (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 py-2 px-3 mb-4">
                {user.image || user.avatar ? (
                  <Image src={user.image || user.avatar} alt="User" width={40} height={40} className="rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1E5E3A] text-white flex items-center justify-center font-bold text-lg">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="font-bold text-sm text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              {user.role === "admin" && (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 mb-3 transition-colors">
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-600 font-medium bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full flex justify-center py-3 rounded-xl text-white font-medium bg-[#1E5E3A] hover:bg-[#133821] mt-6 transition-colors shadow-sm"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}