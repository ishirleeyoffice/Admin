import React from 'react';
import { InvitationData } from '../../types/invitation';
import { InvitationView } from './InvitationView';

export function MobilePreview({ data }: { data: InvitationData }) {
  return (
    <div className="flex-1 bg-gray-100/80 flex flex-col items-center p-6 sm:p-10 overflow-y-auto relative z-0">
      <div className="mb-4 text-sm font-medium text-gray-500 bg-white px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        실시간 미리보기
      </div>

      {/* Phone Mockup Wrapper */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border-[14px] border-gray-900 overflow-hidden shrink-0 ring-1 ring-black/5">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-3xl w-32 mx-auto z-50 flex justify-center items-center">
          <div className="w-16 h-1 bg-gray-800 rounded-full mt-1"></div>
        </div>
        
        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto w-full h-full custom-scrollbar relative bg-[#FAF9F7]" id="preview-screen">
           <InvitationView data={data} />
        </div>

      </div>
      
      <div className="h-10 shrink-0"></div>
    </div>
  );
}
