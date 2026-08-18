"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight } from "lucide-react";

interface ICartItem {
  _id: string;
  name: string;
  slug: string;
  currentPrice: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 📌 ১. LocalStorage থেকে কার্টের ডাটা লোড করা
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("pilot_cart") || "[]");
    setCartItems(items);
    setIsLoaded(true);
  }, []);

  // 📌 ২. Quantity আপডেট করার ফাংশন
  const updateQuantity = (id: string, action: "inc" | "dec") => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        const newQuantity = action === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQuantity) }; // Quantity ১ এর নিচে নামবে না
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("pilot_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // Navbar আপডেট করার জন্য
  };

  // 📌 ৩. কার্ট থেকে আইটেম রিমুভ করার ফাংশন
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("pilot_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 📌 Total Calculation
  const subTotal = cartItems.reduce((total, item) => total + item.currentPrice * item.quantity, 0);

  // Hydration Error এড়ানোর জন্য পেজ পুরোপুরি লোড হওয়ার আগে কিছু রেন্ডার না করা
  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#F4F7FC] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#F58634] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Shopping Cart <span className="text-sm font-medium text-gray-500 bg-gray-200 px-2.5 py-0.5 rounded-full">{cartItems.length} items</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          // 📌 Empty Cart State
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-[#F58634]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our top categories and find something you love!</p>
            <Link 
              href="/#shop" 
              className="bg-[#0B1B42] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#152756] transition-colors flex items-center gap-2 shadow-md"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          // 📌 Cart Items & Summary Grid
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative group">
                  
                  {/* Remove Button (Mobile: top right, Desktop: hover right) */}
                  <button 
                    onClick={() => removeItem(item._id)}
                    className="absolute top-4 right-4 sm:top-1/2 sm:-translate-y-1/2 sm:right-6 text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {/* Product Image */}
                  <Link href={`/product/${item.slug}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2">
                    <Image src={item.image} alt={item.name} width={90} height={90} className="object-contain" />
                  </Link>

                  {/* Product Details & Controls */}
                  <div className="flex-1 w-full pr-10">
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="text-lg font-bold text-gray-800 leading-snug mb-1 hover:text-[#F58634] transition-colors line-clamp-2 pr-4">{item.name}</h3>
                    </Link>
                    <p className="text-[#F58634] font-extrabold text-lg mb-4">৳{item.currentPrice.toLocaleString("en-IN")}</p>
                    
                    <div className="flex items-center gap-6">
                      {/* Quantity Controller */}
                      <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1.5 w-28 bg-gray-50">
                        <button onClick={() => updateQuantity(item._id, "dec")} className="text-gray-500 hover:text-[#F58634] p-1"><Minus className="w-4 h-4" /></button>
                        <span className="font-bold text-gray-800 select-none">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, "inc")} className="text-gray-500 hover:text-[#F58634] p-1"><Plus className="w-4 h-4" /></button>
                      </div>
                      
                      {/* Subtotal for this item */}
                      <span className="text-sm font-semibold text-gray-600 hidden sm:block">
                        Total: <span className="text-gray-900">৳{(item.currentPrice * item.quantity).toLocaleString("en-IN")}</span>
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                
                <div className="space-y-4 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-gray-800">৳{subTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-[#F58634]">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-5 mb-8">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-extrabold text-[#1A2B3C]">৳{subTotal.toLocaleString("en-IN")}</span>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-[#F58634] text-white py-4 rounded-xl font-bold text-[16px] hover:bg-[#e0762a] transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link href="/#shop" className="block text-center mt-4 text-sm font-medium text-gray-500 hover:text-[#0B1B42] transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        )}
        
      </div>
    </div>
  );
}