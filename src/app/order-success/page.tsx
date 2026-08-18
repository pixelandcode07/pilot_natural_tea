"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNo = searchParams.get("orderNo");

  return (
    <div className="bg-white max-w-lg w-full mx-auto rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 text-center transform transition-all">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Order Successful!</h1>
      <p className="text-gray-500 mb-8">Thank you for your purchase. We have received your order and will begin processing it right away.</p>

      {orderNo && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8 flex flex-col items-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Your Order Number</span>
          <span className="text-2xl font-bold text-[#0B1B42]">{orderNo}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="w-full sm:w-auto px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
          <Home className="w-4 h-4" /> Go to Home
        </Link>
        <Link href="#shop" className="w-full sm:w-auto px-8 py-3.5 bg-[#F58634] hover:bg-[#e0762a] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
          <Package className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[80vh] bg-[#F4F7FC] flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="text-gray-500 animate-pulse font-medium">Loading details...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}