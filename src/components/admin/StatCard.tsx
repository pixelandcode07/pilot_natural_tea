import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subText?: string;
  iconSrc?: string; // আপনি চাইলে পরে ইমেজ আইকন বসাতে পারেন
  Icon?: React.ElementType; // Lucide React আইকন সাপোর্ট
  iconBgColor?: string;
}

export default function StatCard({ title, value, subText, Icon, iconBgColor = "bg-blue-100" }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {subText && <p className="text-xs text-gray-400 mt-1">{subText}</p>}
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
        {Icon && <Icon className="w-6 h-6 text-gray-700" />}
      </div>
    </div>
  );
}