"use client";

import React, { useEffect, useState } from "react";
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
  Store,
  Loader2
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/v1/dashboard/stats", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#0B1B42]" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pb-10">
      
      {/* Grid Layout for Stats and Quick Access */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Side: Stats Grid */}
        <div className="xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard 
            title="Today's Orders" 
            value={`৳ ${stats?.todaysOrders?.amount?.toLocaleString('en-IN') || 0}`} 
            subText={`${stats?.todaysOrders?.count || 0} Orders`} 
            Icon={TrendingUp} 
            iconBgColor="bg-green-100 text-green-600" 
          />
          <StatCard 
            title="Lifetime Sales" 
            value={`৳ ${stats?.lifetimeSales?.amount?.toLocaleString('en-IN') || 0}`} 
            subText={`${stats?.lifetimeSales?.count || 0} Orders`} 
            Icon={BarChart} 
            iconBgColor="bg-blue-100 text-blue-600" 
          />
          <StatCard 
            title="Completed Orders" 
            value={`৳ ${stats?.completedOrders?.amount?.toLocaleString('en-IN') || 0}`} 
            subText={`${stats?.completedOrders?.count || 0} Delivered`} 
            Icon={PackageCheck} 
            iconBgColor="bg-emerald-100 text-emerald-600" 
          />
          
          <StatCard 
            title="Total Revenue" 
            value={`৳ ${stats?.totalRevenue?.toLocaleString('en-IN') || 0}`} 
            subText="From Delivered Orders"
            Icon={DollarSign} 
            iconBgColor="bg-indigo-100 text-indigo-600" 
          />
          <StatCard 
            title="Pending Orders" 
            value={`৳ ${stats?.pendingOrders?.amount?.toLocaleString('en-IN') || 0}`} 
            subText={`${stats?.pendingOrders?.count || 0} Needs Processing`} 
            Icon={ClipboardList} 
            iconBgColor="bg-orange-100 text-orange-600" 
          />
          <StatCard 
            title="Avg Order Value" 
            value={`৳ ${stats?.avgOrderValue?.toLocaleString('en-IN') || 0}`} 
            subText="Per Customer"
            Icon={ShoppingBag} 
            iconBgColor="bg-purple-100 text-purple-600" 
          />

          <StatCard 
            title="Total Customers" 
            value={`${stats?.totalCustomers || 0}`} 
            subText="Unique Buyers"
            Icon={Users} 
            iconBgColor="bg-teal-100 text-teal-600" 
          />
          <StatCard 
            title="Active Products" 
            value={`${stats?.totalProducts || 0}`} 
            subText="In Storefront"
            Icon={Box} 
            iconBgColor="bg-rose-100 text-rose-600" 
          />
          <StatCard 
            title="Store Status" 
            value="Active" 
            subText="Accepting Orders"
            Icon={Store} 
            iconBgColor="bg-cyan-100 text-cyan-600" 
          />
        </div>

        {/* Right Side: Quick Access Panel */}
        <div className="xl:col-span-3 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-[15px] font-bold text-gray-800 mb-4">Quick Access</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <QuickBtn title="Create Order" bgGradient="bg-gradient-to-br from-blue-400 to-blue-600" />
            <QuickBtn title="All Products" bgGradient="bg-gradient-to-br from-red-400 to-red-600" />
            
            <QuickBtn title="All Customers" bgGradient="bg-gradient-to-br from-orange-400 to-orange-500" />
            <QuickBtn title="Add Banner" bgGradient="bg-gradient-to-br from-teal-400 to-teal-600" />
            
            <QuickBtn title="Manage Categories" bgGradient="bg-gradient-to-br from-indigo-400 to-indigo-600" />
            <QuickBtn title="Order Status" bgGradient="bg-gradient-to-br from-gray-700 to-gray-900" />
            
            <QuickBtn title="Analytics" bgGradient="bg-gradient-to-br from-blue-500 to-blue-600" />
            <QuickBtn title="Store Settings" bgGradient="bg-gradient-to-br from-purple-400 to-purple-600" />
          </div>
        </div>

      </div>
    </div>
  );
}