import React from "react";
import { Menu, Search, RefreshCw, Globe, Bell } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
      
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600 hover:text-gray-900">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <div className="text-[10px] font-semibold text-[#1E88E5] uppercase flex items-center gap-1">
            <span>Pages</span> <span className="text-gray-400">→</span> <span>Dashboard</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">Overview</h2>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
        <input 
          type="text" 
          placeholder="Search by order number..." 
          className="w-full bg-white border border-gray-300 text-sm rounded-l-md pl-3 pr-4 py-1.5 focus:outline-none focus:border-[#1E88E5]"
        />
        <button className="bg-[#1E88E5] text-white px-3 py-1.5 rounded-r-md hover:bg-blue-600 transition-colors border border-[#1E88E5]">
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded bg-[#1C2536] text-white flex items-center justify-center hover:opacity-90">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded bg-[#1C2536] text-white flex items-center justify-center hover:opacity-90">
          <Globe className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded bg-[#00BFA5] text-white flex items-center justify-center hover:opacity-90 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full ml-2 overflow-hidden border border-gray-200">
          <Image 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
            alt="Admin" 
            width={32} 
            height={32} 
            className="w-full h-full object-cover bg-gray-100" 
          />
        </div>
      </div>

    </header>
  );
}