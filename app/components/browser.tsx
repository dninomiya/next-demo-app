import React from 'react';

export default function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border shadow max-w-2xl mx-auto overflow-hidden">
      <div className="flex items-center gap-2 border-b h-10 bg-gray-100 px-6">
        <span className="w-3 h-3 rounded-full bg-[#FD4646]"></span>
        <span className="w-3 h-3 rounded-full bg-[#FCB024]"></span>
        <span className="w-3 h-3 rounded-full bg-[#28C131]"></span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
