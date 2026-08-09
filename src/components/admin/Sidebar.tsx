"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ListTree, 
  Users, 
  UserCheck, 
  CreditCard, 
  BarChart2, 
  FileText,
  ChevronDown,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  
  // Dropdown States
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);

  return (
    <aside className="w-[260px] bg-white border-r border-gray-200 h-screen flex flex-col hidden lg:flex shrink-0 overflow-y-auto custom-scrollbar">
      
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100 shrink-0">
        <Link href="/admin" className="text-2xl font-bold">
          <span className="text-[#0A4D3C]">Pilot</span> <span className="text-[#F58634]">Natural</span>
        </Link>
      </div>

      {/* Menu Search */}
      <div className="p-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search menu items..." 
            className="w-full bg-white border border-gray-200 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-[#0B1B42]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5 pb-6">
        
        <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${pathname === '/admin' ? 'bg-[#0B1B42] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
          <LayoutDashboard className="w-[18px] h-[18px]" />
          Dashboard
        </Link>

        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-2 pt-4 pb-2">
          E-Commerce Operations
        </p>

        <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/orders') ? 'bg-[#0B1B42] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          <ShoppingCart className="w-[18px] h-[18px]" /> Manage Orders
        </Link>

        {/* Manage Products Dropdown */}
        <div>
          <button 
            onClick={() => setIsProductsOpen(!isProductsOpen)} 
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/products') ? 'bg-[#0B1B42] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-[18px] h-[18px]" /> Manage Products
            </div>
            {isProductsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {isProductsOpen && (
            <div className="pl-11 pr-4 py-2 space-y-3">
              <Link href="#add-product" className="block text-[13px] text-gray-600 hover:text-[#0B1B42]">Add New Product</Link>
              <Link href="#view-products" className="block text-[13px] text-gray-600 hover:text-[#0B1B42]">View All Products <span className="text-green-500 font-medium">(905)</span></Link>
            </div>
          )}
        </div>

        <Link href="/admin/categories" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${pathname.includes('/admin/categories') ? 'bg-[#0B1B42] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
          <ListTree className="w-[18px] h-[18px]" /> Category Management
        </Link>

        {/* Manage Customers Dropdown */}
        <div>
          <button 
            onClick={() => setIsCustomersOpen(!isCustomersOpen)} 
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-[18px] h-[18px]" /> Manage Customers
            </div>
            {isCustomersOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <Link href="#subscribers" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <UserCheck className="w-[18px] h-[18px]" /> Subscribed Users
        </Link>

        <Link href="#payments" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <CreditCard className="w-[18px] h-[18px]" /> Payment History
        </Link>

        <Link href="#reports" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <BarChart2 className="w-[18px] h-[18px]" /> Reports
        </Link>

        <Link href="#requisitions" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FileText className="w-[18px] h-[18px]" /> Requisitions
        </Link>

      </nav>
    </aside>
  );
}