import React from "react";
import { Plus } from "lucide-react";

interface QuickBtnProps {
  title: string;
  bgGradient: string;
}

export default function QuickBtn({ title, bgGradient }: QuickBtnProps) {
  return (
    <button className={`w-full ${bgGradient} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm h-24`}>
      <Plus className="w-5 h-5" />
      <span className="text-sm font-medium text-center leading-tight">{title}</span>
    </button>
  );
}