import { format } from 'date-fns';
import React, { Suspense } from 'react';

export default function Browser({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <time className="block mb-2 text-xs italic text-gray-400 text-right max-w-2xl mx-auto">
        {format(Date.now(), 'yyyy-MM-dd HH:mm:ss')}
      </time>
      <div className="rounded-xl border shadow max-w-2xl mx-auto overflow-hidden">
        <div className="flex items-center gap-2 border-b h-10 bg-gray-100 px-6">
          <span className="w-3 h-3 rounded-full bg-[#FD4646]"></span>
          <span className="w-3 h-3 rounded-full bg-[#FCB024]"></span>
          <span className="w-3 h-3 rounded-full bg-[#28C131]"></span>
        </div>
        <div className="bg-white">{children}</div>
      </div>
    </div>
  );
}
