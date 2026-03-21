import React from 'react';
import { Save, ExternalLink } from "lucide-react";

export function BuilderHeader() {
  return (
    <header className="h-[60px] bg-white px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-rose-500 font-bold text-xl tracking-tight">서비스이름</span>
        <span className="text-gray-400 text-sm font-medium ml-2 hidden sm:inline border-l border-gray-200 pl-4">모바일 청첩장 빌더</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          <Save className="w-4 h-4 text-gray-500" />
          <span className="hidden sm:inline">임시저장</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[13px] sm:text-sm font-medium text-white bg-[#FF6B6B] rounded hover:bg-[#ff5252] transition-colors">
          <ExternalLink className="w-4 h-4" />
          초대장 생성
        </button>
      </div>
    </header>
  );
}
