"use client";

import React, { useState, useEffect } from "react";
import { Filter, Eye, Copy, Trash2, Edit, Search, Printer, Loader2 } from "lucide-react";

interface IOrder {
  _id: string;
  orderNo: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  deliveryStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Status Counts
  const [statusCounts, setStatusCounts] = useState({
    Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0
  });

  // 📌 ১. Fetch All Orders (With No-Cache)
  const fetchOrders = async () => {
    try {
      const res = await fetch("/v1/order", { cache: "no-store" });
      const data = await res.json();
      
      if (data.success) {
        setOrders(data.data);
        
        // Calculate status counts
        const counts = { Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
        data.data.forEach((order: IOrder) => {
          if (counts[order.deliveryStatus] !== undefined) {
            counts[order.deliveryStatus]++;
          }
        });
        setStatusCounts(counts);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 📌 ২. Update Order Status
  const updateStatus = async (id: string, type: "delivery" | "payment", newStatus: string) => {
    setUpdatingId(id);
    try {
      const payload = type === "delivery" ? { deliveryStatus: newStatus } : { paymentStatus: newStatus };
      
      const res = await fetch(`/v1/order/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (data.success) {
        fetchOrders(); // Refresh data immediately after update
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // 📌 ৩. Delete Order
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/v1/order/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to delete order");
    }
  };

  return (
    <div className="w-full pb-10">
      
      {/* Top Status Badges */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex flex-wrap gap-4 items-center text-sm font-medium text-gray-700">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex items-center gap-2 cursor-pointer hover:text-[#0B1B42]">
            {status} <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs border border-gray-200">{count}</span>
          </div>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
        <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
          <Filter className="w-4 h-4" /> Advanced Filters for Orders
        </div>
        <span className="text-gray-400">↓</span>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <h2 className="text-lg font-semibold text-gray-800">All Orders</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="bg-[#007BFF] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#0056B3]">Print Orders</button>
            <button className="bg-[#FFC107] text-black text-xs font-medium px-3 py-1.5 rounded hover:bg-[#E0A800]">Assign Delivery Channel</button>
            <button className="bg-[#FF9800] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#E68A00] flex items-center gap-1">+ Create Order</button>
          </div>
        </div>

        {/* Table Filters */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            Show <select className="border border-gray-300 rounded px-2 py-1"><option>20</option></select> entries
          </div>
          <div className="relative">
            <input type="text" placeholder="Search orders..." className="border border-gray-300 rounded-md text-sm pl-3 pr-8 py-1.5 w-64 focus:outline-none focus:border-[#0B1B42]" />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* The Data Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4 w-10"><input type="checkbox" className="rounded" /></th>
                <th className="p-4">Order No</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4 text-center">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {isLoading ? (
                <tr><td colSpan={7} className="p-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0B1B42]" /></td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="p-10 text-center text-gray-500">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="p-4"><input type="checkbox" className="rounded" /></td>
                    
                    <td className="p-4">
                      <span className="text-[#007BFF] font-bold block text-[15px]">{order.orderNo}</span>
                      <div className="flex gap-2 mt-2 text-gray-500">
                        {/* 📌 FIXED: Removed title from Icon, added to button */}
                        <button title="Copy Order ID" className="hover:text-gray-800 transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button title="Print Invoice" className="hover:text-gray-800 transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-xs text-gray-600 space-y-1">
                      <p><span className="font-medium text-gray-800">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-medium text-gray-800">Time:</span> {new Date(order.createdAt).toLocaleTimeString()}</p>
                    </td>

                    <td className="p-4 text-xs">
                      <p className="font-bold text-gray-800 text-sm mb-1">{order.customerName}</p>
                      <p className="text-gray-600 flex items-center gap-1">{order.phone}</p>
                      <p className="text-gray-500 mt-1 max-w-xs whitespace-normal line-clamp-2" title={order.shippingAddress}>{order.shippingAddress}</p>
                    </td>

                    <td className="p-4 text-xs space-y-1 text-center border-l border-gray-100">
                      <p className="font-bold text-gray-800 text-sm">৳{order.totalAmount}</p>
                      
                      {/* Payment Status Dropdown */}
                      <select 
                        value={order.paymentStatus}
                        disabled={updatingId === order._id}
                        onChange={(e) => updateStatus(order._id, "payment", e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded cursor-pointer border mt-1 focus:outline-none ${order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600 border-green-200' : order.paymentStatus === 'Failed' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}
                      >
                        <option value="Pending">Payment Pending</option>
                        <option value="Paid">Payment Paid</option>
                        <option value="Failed">Payment Failed</option>
                      </select>
                    </td>

                    <td className="p-4 text-center border-l border-gray-100">
                      {/* Delivery Status Dropdown */}
                      <select 
                        value={order.deliveryStatus}
                        disabled={updatingId === order._id}
                        onChange={(e) => updateStatus(order._id, "delivery", e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1B42]/20 transition-all ${
                          order.deliveryStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 
                          order.deliveryStatus === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                          order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-1.5">
                        <button className="bg-gray-100 text-gray-600 p-1.5 rounded hover:bg-[#007BFF] hover:text-white transition-colors" title="View Details"><Eye className="w-4 h-4" /></button>
                        <button className="bg-gray-100 text-gray-600 p-1.5 rounded hover:bg-[#FFC107] hover:text-white transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(order._id)} className="bg-gray-100 text-gray-600 p-1.5 rounded hover:bg-[#DC3545] hover:text-white transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}