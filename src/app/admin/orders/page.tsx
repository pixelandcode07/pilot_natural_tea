import React from "react";
// ✅ এখানে ListTree এবং X ইম্পোর্ট করা হয়েছে
import { Filter, Eye, Copy, Trash2, Edit, Check, Search, Printer, Box, ListTree, X } from "lucide-react";

export default function OrdersPage() {
  const statuses = [
    { name: "Pending", count: 5 }, { name: "Approved", count: 0 }, { name: "Hold", count: 0 },
    { name: "Flagged", count: 0 }, { name: "Ready to Ship", count: 0 }, { name: "Courier Assigned", count: 1 },
    { name: "Packed", count: 0 }, { name: "InTransit", count: 0 }, { name: "Delivered", count: 4 },
    { name: "Return Request", count: 0 }, { name: "Partial Return", count: 0 }, { name: "Returned", count: 0 },
  ];

  return (
    <div className="w-full">
      {/* Top Status Badges */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex flex-wrap gap-4 items-center text-sm font-medium text-gray-700">
        {statuses.map((s, i) => (
          <div key={i} className="flex items-center gap-2 cursor-pointer hover:text-[#0B1B42]">
            {s.name} <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs border border-gray-200">{s.count}</span>
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
            <select className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none">
              <option>Select Status</option>
            </select>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="bg-[#17A2B8] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#138496]">Change Status</button>
            <button className="bg-[#007BFF] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#0056B3]">Print Orders</button>
            <button className="bg-[#FFC107] text-black text-xs font-medium px-3 py-1.5 rounded hover:bg-[#E0A800]">Assign Delivery Channel</button>
            <button className="bg-[#17A2B8] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#138496]">Courier Status</button>
            <button className="bg-[#20C997] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#1AA179]">Bulk Courier Entry</button>
            <button className="bg-[#FF9800] text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-[#E68A00] flex items-center gap-1">+ Create Order</button>
          </div>
        </div>

        {/* Table Filters */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            Show 
            <select className="border border-gray-300 rounded px-2 py-1"><option>20</option></select>
            entries
          </div>
          <div className="relative">
            <input type="text" placeholder="Search orders, customers..." className="border border-gray-300 rounded-md text-sm pl-3 pr-8 py-1.5 w-64 focus:outline-none focus:border-[#0B1B42]" />
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* The Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4 w-10"><input type="checkbox" className="rounded" /></th>
                <th className="p-4">Order No</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Warehouse</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Delivery</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" className="rounded" /></td>
                <td className="p-4">
                  <span className="text-[#007BFF] font-semibold block">2607211</span>
                  <div className="flex gap-2 mt-2 text-gray-500">
                    <Copy className="w-4 h-4 cursor-pointer hover:text-gray-800" />
                    <Box className="w-4 h-4 cursor-pointer hover:text-gray-800" />
                    <Printer className="w-4 h-4 cursor-pointer hover:text-gray-800" />
                  </div>
                </td>
                <td className="p-4 text-xs text-gray-600 space-y-1">
                  <p><span className="font-medium text-gray-800">Created:</span> 21st Jul, 26 3:46 PM</p>
                  <p><span className="font-medium text-gray-800">Shipping:</span> 28th Jul, 26 6:00 AM</p>
                </td>
                <td className="p-4 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">4wq5tr3yry5</span>
                    <span className="bg-[#007BFF] text-white text-[10px] px-1.5 py-0.5 rounded">New</span>
                    <Eye className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                  <p className="text-gray-600 flex items-center gap-1">01719335216 <Copy className="w-3 h-3 cursor-pointer" /></p>
                  <p className="text-gray-500 mt-1 max-w-xs whitespace-normal">Palong, Shariatpur Sadar., Naria, Shariatpur - 8000, Bangladesh</p>
                </td>
                <td className="p-4 text-gray-500">-</td>
                <td className="p-4 text-xs space-y-0.5">
                  <p className="font-bold text-gray-800">Total: ৳32060</p>
                  <p className="text-emerald-500">Paid: ৳0</p>
                  <p className="text-red-500">Due: ৳32060</p>
                  <p className="text-sky-500">Delivery Fee: ৳80</p>
                </td>
                <td className="p-4 text-xs space-y-2">
                  <div className="flex items-center gap-1">Order: <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">Pending</span></div>
                  <div className="flex items-center gap-1">Payment: <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded border border-red-200">Failed</span></div>
                </td>
                <td className="p-4">
                  <span className="bg-[#17A2B8] text-white text-[11px] px-2 py-1 rounded font-medium">Home Delivery</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap justify-center gap-1.5 w-24">
                    <button className="bg-[#17A2B8] text-white p-1.5 rounded hover:bg-[#138496]"><ListTree className="w-3.5 h-3.5" /></button>
                    <button className="bg-[#FFC107] text-white p-1.5 rounded hover:bg-[#E0A800]"><Edit className="w-3.5 h-3.5" /></button>
                    <button className="bg-[#DC3545] text-white p-1.5 rounded hover:bg-[#C82333]"><X className="w-3.5 h-3.5" /></button>
                    <button className="bg-[#28A745] text-white p-1.5 rounded hover:bg-[#218838]"><Check className="w-3.5 h-3.5" /></button>
                    <button className="bg-[#DC3545] text-white p-1.5 rounded hover:bg-[#C82333]"><Trash2 className="w-3.5 h-3.5" /></button>
                    <button className="bg-[#007BFF] text-white p-1.5 rounded hover:bg-[#0056B3]"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}