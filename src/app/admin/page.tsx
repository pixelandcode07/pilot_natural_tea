import React from "react";
import StatCard from "@/components/admin/StatCard";
import QuickBtn from "@/components/admin/QuickBtn";
import { 
  TrendingUp, 
  BarChart, 
  PackageCheck, 
  DollarSign, 
  Box, 
  Users, 
  ShoppingBag, 
  ClipboardList, 
  Store 
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      
      {/* Grid Layout for Stats and Quick Access */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Side: Stats Grid (9 columns on large screens) */}
        <div className="xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard 
            title="Today's Orders" 
            value="৳ 0" 
            subText="0 Orders" 
            Icon={TrendingUp} 
            iconBgColor="bg-green-100 text-green-600" 
          />
          <StatCard 
            title="Lifetime Sales" 
            value="৳ 107,920" 
            subText="10 Orders" 
            Icon={BarChart} 
            iconBgColor="bg-blue-100 text-blue-600" 
          />
          <StatCard 
            title="Completed Orders" 
            value="৳ 5,415" 
            subText="4 Orders" 
            Icon={PackageCheck} 
            iconBgColor="bg-yellow-100 text-yellow-600" 
          />
          
          <StatCard 
            title="Total Revenue" 
            value="৳ 5,765" 
            Icon={DollarSign} 
            iconBgColor="bg-indigo-100 text-indigo-600" 
          />
          <StatCard 
            title="Total Products" 
            value="905" 
            Icon={Box} 
            iconBgColor="bg-orange-100 text-orange-600" 
          />
          <StatCard 
            title="Total Customer" 
            value="218" 
            Icon={Users} 
            iconBgColor="bg-teal-100 text-teal-600" 
          />

          <StatCard 
            title="Avg Order Value" 
            value="৳ 10,792" 
            Icon={ShoppingBag} 
            iconBgColor="bg-purple-100 text-purple-600" 
          />
          <StatCard 
            title="Pending Orders" 
            value="৳ 101,605" 
            subText="NaN Orders" 
            Icon={ClipboardList} 
            iconBgColor="bg-red-100 text-red-600" 
          />
          <StatCard 
            title="Total Vendors" 
            value="38,343" 
            Icon={Store} 
            iconBgColor="bg-rose-100 text-rose-600" 
          />
        </div>

        {/* Right Side: Quick Access Panel (3 columns on large screens) */}
        <div className="xl:col-span-3 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-[15px] font-bold text-gray-800 mb-4">Quick Access</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <QuickBtn title="Create Order" bgGradient="bg-gradient-to-br from-blue-400 to-blue-600" />
            <QuickBtn title="All Products" bgGradient="bg-gradient-to-br from-red-400 to-red-600" />
            
            <QuickBtn title="All Customers" bgGradient="bg-gradient-to-br from-orange-400 to-orange-500" />
            <QuickBtn title="Add Membership" bgGradient="bg-gradient-to-br from-teal-400 to-teal-600" />
            
            <QuickBtn title="Create Ticket" bgGradient="bg-gradient-to-br from-indigo-400 to-indigo-600" />
            <QuickBtn title="Order Status" bgGradient="bg-gradient-to-br from-gray-700 to-gray-900" />
            
            <QuickBtn title="QC" bgGradient="bg-gradient-to-br from-blue-500 to-blue-600" />
            <QuickBtn title="Requisition" bgGradient="bg-gradient-to-br from-blue-400 to-blue-600" />
          </div>
        </div>

      </div>
    </div>
  );
}