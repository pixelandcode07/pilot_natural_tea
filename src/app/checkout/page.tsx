"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CreditCard, Truck, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    shippingAddress: "",
    city: "Dhaka",
    paymentMethod: "Cash on Delivery",
    notes: ""
  });

  // Calculate Prices
  const subTotal = cartItems.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);
  const deliveryFee = formData.city === "Dhaka" ? 60 : 120; // ঢাকার ভেতরে 60, বাইরে 120
  const totalAmount = subTotal + deliveryFee;

  // Load cart from LocalStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("pilot_cart") || "[]");
    if (items.length === 0) {
      router.push("/"); // কার্ট ফাঁকা থাকলে হোমে পাঠিয়ে দেবে
    } else {
      setCartItems(items);
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderPayload = {
        ...formData,
        subTotal,
        deliveryFee,
        totalAmount,
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          price: item.currentPrice,
          quantity: item.quantity
        }))
      };

      const res = await fetch("/v1/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.success) {
        // অর্ডার সফল হলে কার্ট ক্লিয়ার করে সাকসেস পেজে নিয়ে যাবে
        localStorage.removeItem("pilot_cart");
        router.push(`/order-success?orderNo=${data.data.orderNo}`);
      } else {
        alert(data.message || "Failed to place order!");
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#F4F7FC] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#F58634]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Secure Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Shipping Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <MapPin className="w-5 h-5 text-[#F58634]" />
                <h2 className="text-lg font-bold text-gray-800">Delivery Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F58634] focus:outline-none" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F58634] focus:outline-none" placeholder="01XXXXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F58634] focus:outline-none" placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                  <input type="text" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F58634] focus:outline-none" placeholder="House/Road/Area" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <select name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F58634] focus:outline-none">
                    <option value="Dhaka">Inside Dhaka (৳60)</option>
                    <option value="Outside Dhaka">Outside Dhaka (৳120)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#F58634] focus:outline-none" placeholder="Any special instructions..."></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 border-b pb-4">
                <CreditCard className="w-5 h-5 text-[#F58634]" />
                <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
              </div>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'Cash on Delivery' ? 'border-[#F58634] bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleChange} className="w-4 h-4 text-[#F58634]" />
                    <span className="font-semibold text-gray-800">Cash on Delivery (COD)</span>
                  </div>
                  <Truck className="w-5 h-5 text-gray-400" />
                </label>
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'SSLCOMMERZ' ? 'border-[#F58634] bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="paymentMethod" value="SSLCOMMERZ" checked={formData.paymentMethod === 'SSLCOMMERZ'} onChange={handleChange} className="w-4 h-4 text-[#F58634]" />
                    <span className="font-semibold text-gray-800">Online Payment (Cards/Bkash/Nagad)</span>
                  </div>
                  <Image src="/paymentMethod.png" alt="Cards" width={100} height={20} className="object-contain h-5 w-auto" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-1">
                      <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-[#F58634]">৳{(item.currentPrice * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-gray-600 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">৳{subTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-800">৳{deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-extrabold text-[#F58634]">৳{totalAmount.toLocaleString("en-IN")}</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-6 bg-[#0B1B42] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#152756] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                {isSubmitting ? "Processing..." : "Place Order Now"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}